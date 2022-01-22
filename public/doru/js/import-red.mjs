import {pubComm} from './main.mjs';

// var csrfToken = '';

// if(document.getElementsByName('_csrf')[0].value) {
//     csrfToken = document.getElementsByName('_csrf')[0].value;
// }

// var pubComm = io('/redcol', {
//     query: {['_csrf']: csrfToken}
// });


// TESTAREA CONEXIUNII
// setInterval(() => {
//     console.log("Conectat: ", pubComm.connected, " cu id-ul: ", pubComm.id);
//     pubComm.emit('testconn', 'test');
// }, 2000);

var resVisuals = document.querySelector('#visuals');
resVisuals.innerHTML = ''; // reset!

// Resurse afișate tabelar
var TblTmpl = document.querySelector('#redClaimTbl'); // ref către template-ul resurselor în format tabelar
var cloneTbl = TblTmpl.content.cloneNode(true);    // clonarea template-ului pentru afișare tabelară

var redClaimTbl = cloneTbl.querySelector('#redClaimTab');       // ref către div-ul gazdă al tabelului 
let divCompetsTabelare = document.createElement('table');       // creează tabel
divCompetsTabelare.classList.add('redClaimTbl', 'display', 'table', 'table-striped', 'table-bordered'); // adaugă clasă la tabel
redClaimTbl.appendChild(divCompetsTabelare);                    // append tabel la div-ul gazdă

/* === AFIȘAREA TABELARĂ A RESURSELOR === */
pubComm.emit('allUnclaimedReds'); // adu-mi resursele care au valoarea `false` la claimed. Valoarea `false` apare doar dacă userul nu a fost găsit în sistem [pubComm.emit('allComps');]
pubComm.on('allUnclaimedReds', (unclaimed) => {
    // console.log('[comps-visuals.js] competențele aduse sunt ', compets);
    let newResultArr = []; // noul array al obiectelor red care nu au fost revendicate

    //_ WORKING: Verifici dacă fiecare obiect are toate proprietățile. 
    let arrPropsNeeded = ['_id', 'emailContrib', 'uuid', 'title', 'claimed', 'generalPublic']; // _id emailContrib uuid title claimed generalPublic
    unclaimed.map(function clbkMapResult (obi) {
        let keys = Object.keys(obi),
            diff = arrPropsNeeded.filter(k => !keys.includes(k)),
            k;
        for (k of diff){
            if (obi[k] === undefined) {
                console.log('Nu am proprietatea: ', k);
                obi[k] = 0;
            }
        }
        newResultArr.push(obi);
    });
    // RANDEAZĂ TABELUL resurse
    // https://datatables.net/manual/data/orthogonal-data
    $('.redClaimTbl').DataTable({
        processing: true,
        info: true,
        responsive: true,
        data: newResultArr,
        order: [[2, 'desc']],
        ordering: true,
        info: true,
        lengthChange: true,
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        columns: [
            {
                title: 'ID',
                data: '_id',
                render: function clbkId (data, type, row) {
                    data = `<a href="${window.location.origin}/administrator/${data}" class="btn btn-primary btn-sm active" role="button" aria-pressed="true">${data.slice(0,5)}...</a>`;
                    return data;
                }
            },
            {
                title: 'email',
                data: 'emailContrib'
            },
            {
                title: 'uuid',
                data: 'uuid'
            },
            {
                title: 'title',
                data: 'title'
            },
            {
                title: 'Cod',
                data: 'cod',
            },
            {
                title: 'claimed',
                data: 'claimed'
            },
            {
                title: 'public',
                data: 'generalPublic'
            }
        ],
        language: {
            info: "Afișez pagina _PAGE_ din _PAGES_",
            sProcessing:   "Procesează...",
            sLengthMenu:   "Afișează _MENU_ înregistrări pe pagină",
            sZeroRecords:  "Nu am găsit nimic - ne pare rău",
            sInfo:         "Afișate de la _START_ la _END_ din _TOTAL_ înregistrări",
            sInfoEmpty:    "Afișate de la 0 la 0 din 0 înregistrări",
            sInfoFiltered: "(filtrate dintr-un total de _MAX_ înregistrări)",
            sInfoPostFix:  "",
            sSearch:       "Caută:",
            sUrl:          "",
            oPaginate: {
                sFirst:    "Prima",
                sPrevious: "Precedenta",
                sNext:     "Următoarea",
                sLast:     "Ultima"
            }
        }
    });
});
resVisuals.appendChild(redClaimTbl); // injectează tabelul resurselor tabelare

/**
 * Funcția este apelată pentru fiecare fișier din array-ul `FileList`
 *
 */
function fileSender (file) {
    pubComm.emit('loadCompSet', file);
}
pubComm.on('loadCompSet', (r) => {
    if (r == false) {
        alert("Nu am încărcat setul. Are erori!");
    }
    alert(`Am încărcat ${r} competențe specifice cu activitățile lor`);
    location.reload();
});

/* === TRIMITE CSV LA SERVER === */
/**
 * Funcția joacă rol de listener pentru butonul de trimitere a fișierului către server
 * Apelează `fileSender()` pentru fiecare file din `FileList`
 */
function sendRedCsv () {
    let files = document.getElementById('fileloadercs').files;
    Array.from(files).forEach(fileSender);
}

globalThis.sendCsv = sendCsv;