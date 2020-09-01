// Funcție de paginare

exports.pagination = async function pagination (req, model) {
    try {
        // req trebuie să fie un obiect care să aibă următoarea semnătură
        /*
        {
            query: {
                select: {<nume_camp>: <array>},
                exclude: <array>,
                sortby: <array>,    
                sortDefaultField: <string>
            },
            pageNr: <number>,
            limitNr: <number>,
            skipNr: <number>
        }
        */
        // `model` este obiectul model pentru care se face interogarea și returnarea rezultatelor paginate
        // `exclude` este un array care precizează câmpurile care trebuie excluse din căutare.

        let query; // construiește obiectul de interogare pentru Mongoose
        // serializează obiectul cerere
        let queryStr = JSON.stringify(req.query.select);
        // creează operatorii dacă aceștia apar în obiectul cerere -> `$gt`, `$gte`, etc.
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)/g, match => `$${match}`);

        // reatribuirea obiectului după prelucrare
        req.query.select = JSON.parse(queryStr);

        // instanțiază un obiet `Query`
        query = model.find(req.query.select);
        console.log("[pagination.ctrl] Am obiect Query Mongoose aici? ", query);
    
        // Șterge câmpurile care nu vrei să aterizeze în obiectul `Query`
        if (req.query.exclude) {
            req.query.exclude.forEach(field => delete query[field]);
        }
    
        // Câmpurile selectate. Dacă cu este array (apel având query)
        // if (!Array.isArray(req.query.select)) {
        //     const fields = req.query.select.split(',').join(' '); // vom avea: `primulCamp alDoileaCamp alTreilea samd`
        //     query = query.select(fields);
        // } else {
        //     query = query.select(req.query.select.join(' '));
        // }
    
        // Sortare. Dacă nu primești un array, ci elementele separate prin virgulă din query
        // if (!Array.isArray(req.query.sortby)) {
        //     const sortBy = req.query.sortby.split(',').join(' ');
        //     query = query.sort(sortBy);
        // } else if (req.query.sortby.length === 0) {
        //     query = query.sort(req.query.sortDefaultField); // acesta va fi câmpul default după care se face ordonarea în cazul în care nu ai `req.query.sort`
        // }
    
        /* === PAGINAREA === */
        const page = parseInt(req.pageNr, 10) || 1; // pagina 1 va fi din oficiu, dacă nu avem valoare precizată pentru pagină
        const limit = parseInt(req.limitNr, 10) || 10; // dacă nu este precizat numărul de rezultate afișat de pagină, trimite din oficiu 10
        const startIdx = (page -1 ) * limit; // calculează câte rezultate trebuie sărite pentru a ajunge la fereastra de date necesare
        const endIdx = page * limit;
        const total = await model.countDocuments();
    
        // console.log("[pagination] indexul de start este ", startIdx, " iar limita este ", limit);
        query = query.skip(startIdx).limit(limit).exec();

        // execută interogarea bazei și adu rezultatele (se creează și cursorul cu această ocazie)
        let date = await query;
        // console.log("[pagination.ctrl] datele aduse din Mongo sunt: ", date, " cu un total de ", total);
    
        // rezultatul paginării
        const pagination = {};
    
        // dacă ești pe prima pagină, nu vrei să apară `previous`, iar dacă ești pe ultima, nu vrei să apară `next`.
        /* === NEXT page === */
        if (endIdx < total) {
            pagination.next = {
                page: page + 1,
                limit
            };
        }
        /* === PREVIOUS page === */
        if (startIdx > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }
    
        // constituie pachetul de date necesar clientului
        return {date, total, pagination}; 
    } catch (error) {
        console.log(error);
    }
};