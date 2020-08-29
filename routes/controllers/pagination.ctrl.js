exports.pagination = async function getPaginated (req, model) {
    // req trebuie să fie un obiect care să aibă următoarea semnătură
    /*
    {
        query: {
            select: 'primulCamp,alDoileaCamp,alTreilea,samd',
            exclude: <array>,
            sort: <array>,
            sortDefaultField: <string>
        },
        page: <number>,
        limit: <number>,
        skip: <number>
    }
    */
    // `model` este obiectul model pentru care se face interogarea și returnarea rezultatelor paginate
    // `exclude` este un array care precizează câmpurile care trebuie excluse din căutare.

    let query; // construiește obiectul de interogare pentru Mongoose

    // serializează obiectul cerere
    let queryStr = JSON.stringify(req.query);

    // instanțiază un obiet `Query`
    query = model.find(JSON.parse(queryStr));

    // Șterge câmpurile care nu vrei să aterizeze în obiectul `Query`
    if (req.query.exclude) {
        req.query.exclude.forEach(field => delete query[field]);
    }

    // Câmpurile selectate
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' '); // vom avea:  `primulCamp alDoileaCamp alTreilea samd`
        query = query.select(fields);
    }

    // Sortare
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort(req.query.sortDefaultField); // acesta va fi câmpul default după care se face ordonarea în cazul în care nu ai `req.query.sort`
    }

    // creează operatorii dacă aceștia apar în obiectul cerere -> `$gt`, `$gte`, etc.
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)/g, match => `$${match}`);

    /* === PAGINAREA === */
    const page = parseInt(req.page, 10) || 1; // pagina 1 va fi din oficiu, dacă nu avem valoare precizată pentru pagină
    const limit = parseInt(req.limit, 10) || 10; // dacă nu este precizat numărul de rezultate afișat de pagină, trimite din oficiu 10
    const startIdx = (page -1 ) * limit; // calculează câte rezultate trebuie sărite pentru a ajunge la fereastra de date necesare
    const endIdx = page * limit;
    const total = await model.countDocuments();

    query = query.skip(startIdx).limit(limit);

    // execută interogarea bazei și adu rezultatele (se creează și cursorul cu această ocazie)
    let date = await query;

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
    const result = {date, pagination}; 

    return result;
};