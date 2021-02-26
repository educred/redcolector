Pentru că sistemul avea nevoie de managementul detașat al stării în contextul operării cu mai multe instanțe, am detașat configurări Redis-ului. Astfel, setările imuabile privind indecșii Elasticsearch au fost trecuți din process.env au în Redis. Acest lucru a fost dictat de necesitatea de a putea modifica numele indexului atunci când se face reindexare din panoul de administrare dedicat. Punctele afectate:

- /routes/controllers/resurse.ctrl.js `let idxRes = process.env.RES_IDX_ALS;` --> `redisClient.get("RES_IDX_ALS", (err, reply) => {...}` (line 24);
- /routes/administrator.js `index: process.env.RES_IDX_ES7,` și `ALS` --> (line 199, 249);
- /routes/profile.js (line 187, 233, 243, 250);
- /routes/resursepublice.js (line 20);
- /routes/sockets.js - multiple
- /models/resursa-red.js - multiple
- /models/model-helpers.resursa-red-reindex.js - multiple

Am instalat și configurat un sistem rotativ de logging al erorilor. Acesta este bazat pe winston. A fost creat un directos specific (logs) tratării datelor provenite din log-uri. Configurarea și operaționalizarea lui `winston` se face prin /util/logger.js.

Update luna ianuarie - npm-check -u
 
 Patch Update Backwards-compatible bug fixes.
❯◯ @fortawesome/fontawesome-free  5.15.1  ❯  5.15.2   https://fontawesome.com
 ◯ bufferutil                     4.0.2   ❯  4.0.3    https://github.com/websockets/bufferutil
 ◯ datatables.net-responsive      2.2.6   ❯  2.2.7    https://datatables.net
 ◯ datatables.net-responsive-dt   2.2.6   ❯  2.2.7    https://datatables.net
 ◯ globby                         11.0.1  ❯  11.0.2   https://github.com/sindresorhus/globby#readme
 ◯ holderjs                       2.9.7   ❯  2.9.9    http://holderjs.com
 ◯ mongoose                       5.11.8  ❯  5.11.13  https://mongoosejs.com
 ◯ utf-8-validate                 5.0.3   ❯  5.0.4    https://github.com/websockets/utf-8-validate
 ◯ autocannon devDep              7.0.1   ❯  7.0.3    https://github.com/mcollina/autocannon#readme
 ◯ webpack-dev-server devDep      3.11.0  ❯  3.11.2   https://github.com/webpack/webpack-dev-server#readme

 Minor Update New backwards-compatible features.
 ◯ archiver                 5.1.0   ❯  5.2.0   https://github.com/archiverjs/node-archiver
 ◯ bootstrap                4.5.3   ❯  4.6.0   https://getbootstrap.com/
❯◯ fs-extra                 9.0.1   ❯  9.1.0   https://github.com/jprichardson/node-fs-extra
 ◯ helmet                   4.3.1   ❯  4.4.1   https://helmetjs.github.io/
 ◯ passport-local-mongoose  6.0.1   ❯  6.1.0   https://github.com/saintedlama/passport-local-mongoose#readme
 ◯ socket.io                3.0.4   ❯  3.1.0   https://github.com/socketio/socket.io#readme
 ◯ socket.io-client         3.0.4   ❯  3.1.0   https://github.com/socketio/socket.io-client#readme
 ◯ supertest                6.0.1   ❯  6.1.3   https://github.com/visionmedia/supertest#readme
 ◯ autoprefixer devDep      10.1.0  ❯  10.2.3  https://github.com/postcss/autoprefixer#readme
 ◯ webpack devDep           5.11.0  ❯  5.18.0  https://github.com/webpack/webpack
 ◯ webpack-cli devDep       4.3.0   ❯  4.4.0   https://github.com/webpack/webpack-cli#readme

A fost nevoie de introducerea unui nou nivel de persistență a datelor de configurare a aplicației dincolo de ceea ce oferă din oficiu modulul .env prin setarea variabilelor de mediu.
Au fost investigate mai multe oportunități pe care următoarele module le oferă:
- conf (https://github.com/sindresorhus/conf);
- node-persist (https://www.npmjs.com/package/node-persist);
- config (https://www.npmjs.com/package/config);
- cache-conf (https://github.com/SamVerschueren/cache-conf)

Opțiunea pentru gestiunea scenariilor de dezvoltare, de test și cel de producție a găsit candidatul în pachetul config. Am explorat și posibilitatea de a constitui fișiere administrate local la nivel de read/write conform https://medium.com/@jinmatt/config-management-for-node-js-based-on-runtime-environment-variables-55b3c6d82f5c. Opțiunea realizărilor de configurări specifice rămâne deschisă pentru momentul în care aplicația va trebuie containerizată pentru realizarea maximului de portabilitate (https://zetcode.com/javascript/nodeconfig/).

USR_IDX_ES7=users0
USR_IDX_ALS=users
RES_IDX_ES7=resedus1
RES_IDX_ALS=resedus

DataTables warning: table id=DataTables_Table_0 - Requested unknown parameter 'googleProfile.name' for row 4, column 5. For more information about this error, please see http://datatables.net/tn/4 
 
 Upgrade-uri preflight ianuarie - npm-check -u:
 
 Patch Update Backwards-compatible bug fixes.
❯◯ bootstrap                     4.5.2    ❯  4.5.3    https://getbootstrap.com/
 ◯ bufferutil                    4.0.1    ❯  4.0.2    https://github.com/websockets/bufferutil
 ◯ datatables.net                1.10.21  ❯  1.10.23  https://datatables.net
 ◯ datatables.net-bs4            1.10.21  ❯  1.10.23  https://datatables.net
 ◯ datatables.net-buttons        1.6.3    ❯  1.6.5    https://datatables.net
 ◯ datatables.net-buttons-dt     1.6.3    ❯  1.6.5    https://datatables.net
 ◯ datatables.net-dt             1.10.21  ❯  1.10.23  https://datatables.net
 ◯ datatables.net-responsive     2.2.5    ❯  2.2.6    https://datatables.net
 ◯ datatables.net-responsive-dt  2.2.5    ❯  2.2.6    https://datatables.net
 ◯ fast-csv                      4.3.1    ❯  4.3.6    http://c2fo.github.com/fast-csv
 ◯ utf-8-validate                5.0.2    ❯  5.0.3    https://github.com/websockets/utf-8-validate
 ◯ uuid                          8.3.0    ❯  8.3.2    https://github.com/uuidjs/uuid#readme

 Minor Update New backwards-compatible features.
❯◯ @elastic/elasticsearch         7.9.0   ❯  7.10.0  http://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
 ◯ @fortawesome/fontawesome-free  5.14.0  ❯  5.15.1  https://fontawesome.com
 ◯ isomorphic-git                 1.7.4   ❯  1.8.0   https://isomorphic-git.org/
 ◯ mocha                          8.1.1   ❯  8.2.1   https://mochajs.org/
 ◯ moment                         2.27.0  ❯  2.29.1  https://momentjs.com
 ◯ mongoose                       5.10.0  ❯  5.11.8  https://mongoosejs.com
 ◯ papaparse                      5.2.0   ❯  5.3.0   http://papaparse.com
 ◯ pm2                            4.4.1   ❯  4.5.1   http://pm2.keymetrics.io/
 ◯ validator                      13.1.1  ❯  13.5.2  https://github.com/chriso/validator.js

 Major Update Potentially breaking API changes. Use caution.
 ◯ archiver                    4.0.2   ❯  5.1.0   https://github.com/archiverjs/node-archiver
 ◯ helmet                      3.23.3  ❯  4.3.1   https://helmetjs.github.io/
 ◯ socket.io                   2.3.0   ❯  3.0.4   https://github.com/socketio/socket.io#readme
 ◯ socket.io-client            2.3.0   ❯  3.0.4   https://github.com/socketio/socket.io-client#readme
 ◯ supertest                   4.0.2   ❯  6.0.1   https://github.com/visionmedia/supertest#readme
 ◯ autocannon devDep           6.1.0   ❯  7.0.1   https://github.com/mcollina/autocannon#readme
 ◯ autoprefixer devDep         9.8.6   ❯  10.1.0  https://github.com/postcss/autoprefixer#readme
 ◯ copy-webpack-plugin devDep  6.0.3   ❯  7.0.0   https://github.com/webpack-contrib/copy-webpack-plugin
 ◯ node-sass devDep            4.14.1  ❯  5.0.0   https://github.com/sass/node-sass
 ◯ postcss-cli devDep          7.1.1   ❯  8.3.1   https://github.com/postcss/postcss-cli#readme
 ◯ webpack devDep              4.44.1  ❯  5.11.0  https://github.com/webpack/webpack
 ◯ webpack-cli devDep          3.3.12  ❯  4.3.0   https://github.com/webpack/webpack-cli#readme

  Major Update Potentially breaking API changes. Use caution.
 ◯ archiver                    4.0.2   ❯  5.1.0   https://github.com/archiverjs/node-archiver
 ◯ helmet                      3.23.3  ❯  4.3.1   https://helmetjs.github.io/
 ◯ socket.io                   2.3.0   ❯  3.0.4   https://github.com/socketio/socket.io#readme
 ◯ socket.io-client            2.3.0   ❯  3.0.4   https://github.com/socketio/socket.io-client#readme
 ◯ supertest                   4.0.2   ❯  6.0.1   https://github.com/visionmedia/supertest#readme
 ◯ autocannon devDep           6.1.0   ❯  7.0.1   https://github.com/mcollina/autocannon#readme
 ◯ autoprefixer devDep         9.8.6   ❯  10.1.0  https://github.com/postcss/autoprefixer#readme
 ◯ copy-webpack-plugin devDep  6.0.3   ❯  7.0.0   https://github.com/webpack-contrib/copy-webpack-plugin
 ◯ node-sass devDep            4.14.1  ❯  5.0.0   https://github.com/sass/node-sass
 ◯ postcss-cli devDep          7.1.1   ❯  8.3.1   https://github.com/postcss/postcss-cli#readme
 ◯ webpack devDep              4.44.1  ❯  5.11.0  https://github.com/webpack/webpack
 ◯ webpack-cli devDep          3.3.12  ❯  4.3.0   https://github.com/webpack/webpack-cli#readme

Folosesc archiver la momentul în care o resursă este ștearsă și este arhivată ca zip. Singurul braking este la 5.0.2: breaking: absolute path glob patterns are no longer supported: use cwd option instead.

Migrare de la socket.io 2.23.3 la 3.0.4
Detalii de migrare aici: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/

Sunt probleme!!!
Am instalat pachetele recomandate: npm install --save-optional bufferutil utf-8-validate
De aprofundat: https://www.nginx.com/blog/nginx-nodejs-websockets-socketio/. Când va fi la serverul Nginx, o posibbilă configurare ar putea fi
server {
    listen 80;
    server_name YOURDOMAIN.COM;
    client_max_body_size 100M;
    location /socket.io/ {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_pass http://localhost:PORTNUMBER/socket.io/;
    }
}

Helmet introduce un nou nivel de protecție: Content Security Policy.


DataTables warning: table id=DataTables_Table_0 - 
Requested unknown parameter 'googleProfile.name' for row 3, column 5. For more information about this error, please see http://datatables.net/tn/4




curl -X PUT "localhost:9200/resedus0/_settings?pretty" -H 'Content-Type: application/json' -d '
{
  "index.blocks.read_only_allow_delete":null
}
'

{
  "error": {
    "root_cause": [
      {
        "type": "cluster_block_exception",
        "reason": "index [resedus0] blocked by: [TOO_MANY_REQUESTS/12/index read-only / allow delete (api)];"
      }
    ],
    "type": "cluster_block_exception",
    "reason": "index [resedus0] blocked by: [TOO_MANY_REQUESTS/12/index read-only / allow delete (api)];"
  },
  "status": 429
}

[PM2][WARN] Current process list running is not in sync with saved list. app differs. Type 'pm2 save' to synchronize.
nicu@red:/var/www/red.educred.ro$ pm2 start app.js
[PM2] Starting /var/www/red.educred.ro/app.js in fork_mode (1 instance)
(node:9722) Warning: Accessing non-existent property 'cat' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:9722) Warning: Accessing non-existent property 'cd' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'chmod' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'cp' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'dirs' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'pushd' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'popd' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'echo' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'tempdir' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'pwd' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'exec' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'ls' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'find' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'grep' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'head' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'ln' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'mkdir' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'rm' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'mv' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'sed' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'set' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'sort' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'tail' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'test' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'to' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'toEnd' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'touch' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'uniq' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'which' of module exports inside circular dependency
[PM2] Done.
⇆ PM2+ activated | Instance Name: red-2dfe | Dash: https://app.pm2.io/#/r/4witmxhstv3zskn
