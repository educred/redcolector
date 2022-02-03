/**
 * Funcție de paginare a rezultatelor obținute din MongoDB
 * @param {Object} req 
 * @param {Object} model 
 * @returns 
 */
exports.pagination = async function pagination (req, model) {
    try {
        // req trebuie să fie un obiect care să aibă următoarea semnătură
        /*
        {
            query: {
                projection: {
                    discipline: ['Biologie'],
                    etichete: ['bio5']
                },
                select: <string>,
                exclude: <array>,
                sortby: <array>,    
                sortDefaultField: <string>
            },
            pageNr: <number>,
            limitNr: <number>,
            skipNr: <number>
        }
        */

        console.log(`Am primit următoarea cerere: `, JSON.stringify(req, null, 2));

        let query; // construiește obiectul de interogare pentru Mongoose
        // serializează obiectul cerere

        let queryStr = JSON.stringify(req.query.projection);
        // creează operatorii dacă aceștia apar în obiectul cerere -> `$gt`, `$gte`, etc.
        // queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)/g, op => `$${op}`);

        // reatribuirea obiectului după prelucrare
        req.query.projection = JSON.parse(queryStr);

        // https://stackoverflow.com/questions/18148166/find-document-with-array-that-contains-a-specific-value FRACK $all!!!
        // https://docs.mongodb.com/manual/tutorial/query-arrays/
        // https://stackoverflow.com/a/8145558/1271340 Cum se face căutare într-un singur array
        // https://stackoverflow.com/questions/22998765/mongoose-query-to-find-matching-elements-in-multiple-arrays Căutare în array-uri multiple
        // https://www.codegrepper.com/code-examples/whatever/mongoose+find+multiple

        // pentru fiecare cheie valoare din projection, adaugă într-un find
        let k, v, obi = req.query.projection ?? {};
        // console.log('[pagination.ctrl] obiectul criteriilor de selectie ptr Mongoose ', JSON.stringify(obi, null, 2));

        // CĂUTAREA datelor
        query = model.find(obi);        // https://mongoosejs.com/docs/tutorials/query_casting.html -> Implicit $in

        let total = await model.where(obi).countDocuments();
        console.log("[pagination.ctrl] Numarul datelor este: ", total); 

        query.select(req.query.select); // Adu-mi doar următorul subset al câmpurilor care sunt necesare în client

        // Șterge câmpurile care nu vrei să aterizeze în obiectul `Query`
        if (req.query.exclude) {
            req.query.exclude.forEach(field => delete query[field]);
        }
        
        /* === PAGINAREA === */
        let pagination = {};  // rezultatul paginării
        let page       = parseInt(req.pageNr, 10)  === 0 ? 1  : parseInt(req.pageNr, 10);     // pagina 1 va fi din oficiu, dacă nu avem valoare precizată pentru pagină
        let limit      = parseInt(req.limitNr, 10) === 0 ? 10 : parseInt(req.limitNr, 10);    // dacă nu este precizat numărul de rezultate afișat de pagină, trimite din oficiu 10
        let startIdx   = (page - 1) * limit;  // calculează câte rezultate trebuie sărite pentru a ajunge la fereastra de date necesare
        let endIdx     = page * limit;

        // let allDocs  = await model.countDocuments();
        // console.log(`Numărul tuturor documentelor găsite este: `, allDocs);
        // console.log("[pagination] indexul de start este ", startIdx, " iar limita este ", limit);

        // Setează indexul de la care culegi setul de date și care este limita de înregistrări
        query.skip(startIdx).limit(limit);

        // execută interogarea bazei și adu rezultatele (se creează și cursorul cu această ocazie)
        let date = await query.exec();
    
        // dacă ești pe prima pagină, nu vrei să apară `previous`, iar dacă ești pe ultima, nu vrei să apară `next`.
        /* === NEXT page === */
        if (endIdx < total) {
            pagination['next'] = {
                page: page + 1,
                limit
            };
        }
        /* === PREVIOUS page === */
        if (startIdx > 0) {
            pagination['prev'] = {
                page: page - 1,
                limit
            };
        }

        // datele necesare clientului
        return {date, total, pagination}; 
    } catch (error) {
        console.log(error);
    }
};