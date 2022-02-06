/**
 * Funcție de paginare a rezultatelor obținute din MongoDB
 * @param {Object} req 
 * @param {Object} model 
 * @returns 
 */
 exports.pagination_cursor = async function pagination_cursor (req, model) {
    try {
        // https://cloudnweb.dev/2021/04/pagination-nodejs-mongoose/
        // req trebuie să fie un obiect care să aibă următoarea semnătură

        // console.log(`Am primit următoarea cerere: `, JSON.stringify(req, null, 2));

        let query;                                              // construiește obiectul de interogare pentru Mongoose
        let queryStr = JSON.stringify(req.query.projection);    // serializează obiectul cerere
        req.query.projection = JSON.parse(queryStr);            // reatribuirea obiectului după prelucrare
        let obi = req.query.projection ?? {};                   // pentru fiecare cheie valoare din projection, adaugă într-un find
        // console.log('[pagination.ctrl] obiectul criteriilor de selectie ptr Mongoose ', JSON.stringify(obi, null, 2));
        
        /* === NUMARUL TOTAL DE ÎNREGISTRĂRI GĂSITE === */
        let total = await model.where(obi).countDocuments();

        /* === CURSOR === */
        let limit  = Math.max(0, req.limitNr) === 0 ? 10 : Math.max(0, req.limitNr);   // dacă nu este precizat numărul de rezultate afișat de pagină, trimite din oficiu 10
        
        // CAZUL ÎN CARE A VENIT CURSOR DIN CLIENT
        let cursor = req.pagination.nextCursor;
        if(cursor){
            let datacal = new Date(cursor * 1000); // setezi data de lucru pentru noul calup de date
            obi['date'] = {'$lt': new Date(datacal)}; // completezi obiectul query cu un criteriu nou legat de data înregistrărilor  
        }

        if (req.query.exclude.length > 0) {
            req.query.exclude.forEach(field => delete query[field]);    // Șterge câmpurile menționate de client din obiectul `Query`
        }
        let segmentdata = await model.find(obi).select(req.query.select).limit(limit + 1).exec(); // execută și obține datele din segmentul de 10 + 1 (`segmentdata` va avea o lungime de 11)

        let moredata = segmentdata.length === limit + 1; // verifică dimensiunea să fie 11
        let nextCursor = null;

        if (moredata) {
            let nextcursorrec = segmentdata[limit]; // fă o referință la ultimul document care va juca rol de cursor, adică al 11-lea document
            nextCursor = Math.floor(nextcursorrec.date.getTime() / 1000);
            segmentdata.pop();
        }

        // datele necesare clientului
        return {segmentdata, total, pagination: {moredata, nextCursor}}; 
    } catch (error) {
        console.log(error);
    }
};