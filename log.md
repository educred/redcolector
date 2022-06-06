CastError: Cast to ObjectId failed for value "articole" (type string) at path "_id" for model "resursedu"
    at model.Query.exec (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/query.js:4715:21)
    at model.Query.newExec [as exec] (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/controllers/cache.helper.js:23:25)
    at model.Query.Query.then (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/query.js:4814:15)
    at clbkProfResID (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/profile.js:227:69)
    at runMicrotasks (<anonymous>)
    at processTicksAndRejections (node:internal/process/task_queues:96:5) {
  messageFormat: undefined,
  stringValue: '"articole"',
  kind: 'ObjectId',
  value: 'articole',
  path: '_id',
  reason: BSONTypeError: Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer
      at new BSONTypeError (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/bson/lib/error.js:41:28)
      at new ObjectId (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/bson/lib/objectid.js:66:23)
      at castObjectId (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/cast/objectid.js:24:12)
      at ObjectId.cast (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/schema/objectid.js:247:12)
      at ObjectId.SchemaType.applySetters (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/schematype.js:1189:12)
      at ObjectId.SchemaType._castForQuery (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/schematype.js:1623:15)
      at ObjectId.SchemaType.castForQuery (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/schematype.js:1613:15)
      at ObjectId.SchemaType.castForQueryWrapper (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/schematype.js:1590:20)
      at cast (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/cast.js:344:32)
      at model.Query.Query.cast (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/query.js:5137:12)
      at model.Query.Query._castConditions (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/query.js:2168:10)
      at model.Query.<anonymous> (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/query.js:2462:8)
      at model.Query._wrappedThunk [as _findOne] (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/helpers/query/wrapThunk.js:27:8)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:367:25
      at processTicksAndRejections (node:internal/process/task_queues:78:11),
  valueType: 'string'
}


node:internal/validators:238
    throw new ERR_INVALID_ARG_TYPE(name, 'Function', value);
    ^

TypeError [ERR_INVALID_ARG_TYPE]: The "original" argument must be of type function. Received undefined
    at promisify (node:internal/util:329:3)
    at Object.<anonymous> (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/util/es7.js:8:22)
    at Module._compile (node:internal/modules/cjs/loader:1105:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1159:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Module.require (node:internal/modules/cjs/loader:1005:19)
    at require (node:internal/modules/cjs/helpers:102:18)
    at Object.<anonymous> (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/model-helpers/es7-helper.js:29:23)
    at Module._compile (node:internal/modules/cjs/loader:1105:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1159:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Module.require (node:internal/modules/cjs/loader:1005:19)
    at require (node:internal/modules/cjs/helpers:102:18)
    at Object.<anonymous> (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/resursa-red.js:8:23) {
  code: 'ERR_INVALID_ARG_TYPE'
}
[nodemon] app crashed - waiting for file changes before starting...



Am renunțat la GOT care era într-o combinație cu Unsplash, etc.


De investigat pachetele:
❯◯ @elastic/elasticsearch         7.16.0  ❯  8.1.0   http://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
 ◯ express-rate-limit             5.5.1   ❯  6.4.0   https://github.com/nfriedly/express-rate-limit
 ◯ globby                         11.0.4  ❯  13.1.1  https://github.com/sindresorhus/globby#readme
 ◯ got                            11.8.3  ❯  12.0.4  https://github.com/sindresorhus/got#readme
 ◯ helmet                         4.6.0   ❯  5.0.2   https://helmetjs.github.io/
 ◯ passport-local-mongoose        6.1.0   ❯  7.0.0   https://github.com/saintedlama/passport-local-mongoose#readme
 ◯ redis                          3.1.2   ❯  4.0.6   https://github.com/redis/node-redis 
 
 
 Patch Update Backwards-compatible bug fixes.
❯◯ archiver                            5.3.0   ❯  5.3.1   https://github.com/archiverjs/node-archiver
 ◯ datatables.net                      1.11.3  ❯  1.11.5  https://datatables.net
 ◯ datatables.net-dt                   1.11.3  ❯  1.11.5  https://datatables.net
 ◯ git-parse                           2.1.0   ❯  2.1.1   https://github.com/wayfair/git-parse#readme
 ◯ moment                              2.29.1  ❯  2.29.3  https://momentjs.com
 ◯ papaparse                           5.3.1   ❯  5.3.2   http://papaparse.com
 ◯ autoprefixer devDep                 10.4.2  ❯  10.4.5  https://github.com/postcss/autoprefixer#readme
 ◯ copy-webpack-plugin devDep          10.2.0  ❯  10.2.4  https://github.com/webpack-contrib/copy-webpack-plugin
 ◯ eslint-plugin-security-node devDep  1.1.0   ❯  1.1.1   https://github.com/gkouziik/eslint-plugin-security-node
 ◯ jsdoc devDep                        3.6.7   ❯  3.6.10  https://github.com/jsdoc/jsdoc#readme
 ◯ webpack-cli devDep                  4.9.1   ❯  4.9.2   https://github.com/webpack/webpack-cli/tree/master/packages/webpack-cli

 Minor Update New backwards-compatible features.
 ◯ @editorjs/editorjs         2.22.2  ❯  2.24.0  https://github.com/codex-team/editor.js
 ◯ bootstrap-icons            1.7.2   ❯  1.8.1   https://icons.getbootstrap.com/
 ◯ connect-redis              6.0.0   ❯  6.1.3   https://github.com/visionmedia/connect-redis#readme
 ◯ datatables.net-buttons     2.1.1   ❯  2.2.2   https://datatables.net
 ◯ datatables.net-buttons-dt  2.1.1   ❯  2.2.2   https://datatables.net
 ◯ elasticdump                6.79.0  ❯  6.84.0  https://github.com/elasticsearch-dump/elasticsearch-dump#readme
 ◯ express                    4.17.2  ❯  4.18.0  http://expressjs.com/
 ◯ fs-extra                   10.0.0  ❯  10.1.0  https://github.com/jprichardson/node-fs-extra
 ◯ isomorphic-git             1.10.3  ❯  1.17.1  https://isomorphic-git.org/
 ◯ mocha                      9.1.3   ❯  9.2.2   https://mochajs.org/
 ◯ mongoose                   6.1.5   ❯  6.3.1   https://mongoosejs.com
 ◯ nanoid                     3.2.0   ❯  3.3.3   https://github.com/ai/nanoid#readme
 ◯ pm2                        5.1.2   ❯  5.2.0   http://pm2.keymetrics.io/
 ◯ socket.io                  4.4.1   ❯  4.5.0   https://github.com/socketio/socket.io#readme
 ◯ socket.io-client           4.4.1   ❯  4.5.0   https://github.com/socketio/socket.io-client#readme
 ◯ supertest                  6.1.6   ❯  6.2.3   https://github.com/visionmedia/supertest
 ◯ winston                    3.3.4   ❯  3.7.2   https://github.com/winstonjs/winston#readme
 ◯ winston-daily-rotate-file  4.5.5   ❯  4.6.1   https://github.com/winstonjs/winston-daily-rotate-file#readme
 ◯ autocannon devDep          7.5.1   ❯  7.8.1   https://github.com/mcollina/autocannon#readme
 ◯ eslint devDep              8.6.0   ❯  8.14.0  https://eslint.org

 Major Update Potentially breaking API changes. Use caution.
❯◯ @elastic/elasticsearch         7.16.0  ❯  8.1.0   http://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
 ◯ @fortawesome/fontawesome-free  5.15.4  ❯  6.1.1   https://fontawesome.com
 ◯ dotenv                         10.0.0  ❯  16.0.0  https://github.com/motdotla/dotenv#readme
 ◯ express-rate-limit             5.5.1   ❯  6.4.0   https://github.com/nfriedly/express-rate-limit
 ◯ globby                         11.0.4  ❯  13.1.1  https://github.com/sindresorhus/globby#readme
 ◯ got                            11.8.3  ❯  12.0.4  https://github.com/sindresorhus/got#readme
 ◯ helmet                         4.6.0   ❯  5.0.2   https://helmetjs.github.io/
 ◯ passport-local-mongoose        6.1.0   ❯  7.0.0   https://github.com/saintedlama/passport-local-mongoose#readme
 ◯ redis                          3.1.2   ❯  4.0.6   https://github.com/redis/node-redis
  
 Non-Semver Versions less than 1.0.0, caution.
 ◯ passport  0.5.0  ❯  0.5.2  https://www.passportjs.org/




Moare aici: https://accounts.google.ro/accounts/SetSID

Aplicația a crăpat cu următoarele detalii:  InternalOAuthError: Failed to obtain access token
    at Strategy.OAuth2Strategy._createOAuthError (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/passport-oauth2/lib/strategy.js:423:17)
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/passport-oauth2/lib/strategy.js:177:45
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/oauth/lib/oauth2.js:191:18
    at ClientRequest.<anonymous> (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/oauth/lib/oauth2.js:162:5)
    at ClientRequest.emit (node:events:520:28)
    at TLSSocket.socketErrorListener (node:_http_client:442:9)
    at TLSSocket.emit (node:events:520:28)
    at emitErrorNT (node:internal/streams/destroy:164:8)
    at emitErrorCloseNT (node:internal/streams/destroy:129:3)
    at processTicksAndRejections (node:internal/process/task_queues:83:21)
[09-02-2022 14:42:55] [error] [undefined]:      Failed to obtain access token
[09-02-2022 14:42:55] [error] [undefined]:      Failed to obtain access token


Configuration file '/etc/elasticsearch/jvm.options'
 ==> Modified (by you or by a script) since installation.
 ==> Package distributor has shipped an updated version.
   What would you like to do about it ?  Your options are:
    Y or I  : install the package maintainer's version
    N or O  : keep your currently-installed version
      D     : show the differences between the versions
      Z     : start a shell to examine the situation
 The default action is to keep your current version.
*** jvm.options (Y/I/N/O/D/Z) [default=N] ? 
Installing new version of config file /etc/elasticsearch/log4j2.properties ...
warning: usage of JAVA_HOME is deprecated, use ES_JAVA_HOME
Created elasticsearch keystore in /etc/elasticsearch/elasticsearch.keystore


<div style="width: 100%;">
	<div style='position: relative; padding-bottom: 56.25%; padding-top: 0; height: 0;'>
		<iframe 
			frameborder="0" 
			width="1200" 
			height="675" 
			style="position: absolute; 
			top: 0; 
			left: 0; 
			width: 100%; 
			height: 100%;" 
			src="https://view.genial.ly/619f7927f2d1d50e25f7f782" 
			type="text/html" 
			allowscriptaccess="always" 
			allowfullscreen="true" 
			scrolling="yes" 
			allownetworking="all">
		</iframe> 
	</div> 
</div>


https://view.genial.ly/60c8e13fb16c270dc0e31d08/presentation-simple-presentation
https://view.genial.ly/60c77528dd18b30db40f58c3/presentation-umbra-producerea-eclipselor
https://view.genial.ly/60406bc2ead6200f87f37500
https://view.genial.ly/601583b91bd3060d78c622f4/presentation-sunetul-caracteristici

<iframe frameborder='0' style='position: absolute; top: 0; left: 0; width: 100%; height: 100%;' type='text/html' allowscriptaccess='always' allowfullscreen='true' scrolling='yes' allownetworking='all'></iframe> 





        // https://stackoverflow.com/questions/18148166/find-document-with-array-that-contains-a-specific-value FRACK $all!!!
        // https://docs.mongodb.com/manual/tutorial/query-arrays/
        // https://stackoverflow.com/a/8145558/1271340 Cum se face căutare într-un singur array
        // https://stackoverflow.com/questions/22998765/mongoose-query-to-find-matching-elements-in-multiple-arrays Căutare în array-uri multiple
        // https://www.codegrepper.com/code-examples/whatever/mongoose+find+multiple
        // https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js


Când nu introduci nimic în editorul de text, dă o mare eroare


[app.js] O promisiune a fost respinsă fără a fi tratată respingerea Promise {
  <rejected> TypeError: Cannot read properties of undefined (reading 'blocks')
      at model.clbkPostSave1 (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/resursa-red.js:162:48)
      at callMiddlewareFunction (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:488:23)
      at next (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:194:9)
      at Kareem.execPost (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:218:3)
      at _cb (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:313:15)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/model.js:426:5
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/model.js:302:7
      at collectionOperationCallback (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:168:24)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/utils.js:508:9
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/operations/execute_operation.js:49:55
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/utils.js:508:9
      at completeEndSession (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/sessions.js:147:17)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/sessions.js:157:13
      at maybePromise (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/utils.js:494:5)
      at ClientSession.endSession (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/sessions.js:133:41)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/operations/execute_operation.js:49:36
}  având motivul TypeError: Cannot read properties of undefined (reading 'blocks')
[03-02-2022 18:06:07] [error] [undefined]:      [object Promise] TypeError: Cannot read properties of undefined (reading 'blocks')
[03-02-2022 18:06:07] [error] [undefined]:      [object Promise] TypeError: Cannot read properties of undefined (reading 'blocks')



[es-helper::indexMongoColInES7] Colecția pentru care se cere îndexare, încă nu are suport în cod
[app.js] O promisiune a fost respinsă fără a fi tratată respingerea Promise {
  <rejected> ResponseError: mapper_parsing_exception: [mapper_parsing_exception] Reason: failed to parse field [titleI18n] of type [text] in document with id '61dc01b407aac47355193eec'. Preview of field's value: '{eng=Scientific Writing Vault - S.1: Scientific Publication Structure}'
      at onBody (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:367:23)
      at IncomingMessage.onEnd (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:291:11)
      at IncomingMessage.emit (node:events:402:35)
      at endReadableNT (node:internal/streams/readable:1343:12)
      at processTicksAndRejections (node:internal/process/task_queues:83:21) {
    meta: {
      body: [Object],
      statusCode: 400,
      headers: [Object],
      meta: [Object]
    }
  }
}  având motivul {"error":{"root_cause":[{"type":"mapper_parsing_exception","reason":"failed to parse field [titleI18n] of type [text] in document with id '61dc01b407aac47355193eec'. Preview of field's value: '{eng=Scientific Writing Vault - S.1: Scientific Publication Structure}'"}],"type":"mapper_parsing_exception","reason":"failed to parse field [titleI18n] of type [text] in document with id '61dc01b407aac47355193eec'. Preview of field's value: '{eng=Scientific Writing Vault - S.1: Scientific Publication Structure}'","caused_by":{"type":"illegal_state_exception","reason":"Can't get text on a START_OBJECT at 1:355"}},"status":400}
[02-02-2022 12:22:59] [error] [undefined]:      [object Promise] {"error":{"root_cause":[{"type":"mapper_parsing_exception","reason":"failed to parse field [titleI18n] of type [text] in document with id '61dc01b407aac47355193eec'. Preview of field's value: '{eng=Scientific Writing Vault - S.1: Scientific Publication Structure}'"}],"type":"mapper_parsing_exception","reason":"failed to parse field [titleI18n] of type [text] in document with id '61dc01b407aac47355193eec'. Preview of field's value: '{eng=Scientific Writing Vault - S.1: Scientific Publication Structure}'","caused_by":{"type":"illegal_state_exception","reason":"Can't get text on a START_OBJECT at 1:355"}},"status":400}
[02-02-2022 12:22:59] [error] [undefined]:      [object Promise] {"error":{"root_cause":[{"type":"mapper_parsing_exception","reason":"failed to parse field [titleI18n] of type [text] in document with id '61dc01b407aac47355193eec'. Preview of field's value: '{eng=Scientific Writing Vault - S.1: Scientific Publication Structure}'"}],"type":"mapper_parsing_exception","reason":"failed to parse field [titleI18n] of type [text] in document with id '61dc01b407aac47355193eec'. Preview of field's value: '{eng=Scientific Writing Vault - S.1: Scientific Publication Structure}'","caused_by":{"type":"illegal_state_exception","reason":"Can't get text on a START_OBJECT at 1:355"}},"status":400}
Procesul a fost încheiat având codul:  1             
             
             
             
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <a href="/resurse/{{this._id}}">{{this.title}}</a>
                        </h3>
                        <div class="row mb-2 text-muted">
                            <p class="card-subtitle col-sm-6 text-muted">{{this.autori}}</p>
                            <p class="card-subtitle col-sm-6 text-muted">{{this.dataRo}}</p>
                        </div>
                    </div>
                    {{!-- <img class="card-img-top" src="{{this.coperta}}" alt="{{this.title}}"> --}}
                    <div class="card-body">
                        <aside style="float: left;">
                            {{!-- Dacă există copertă, afișeaz-o --}}
                            {{#if this.coperta}}
                                <img src="{{this.coperta}}" class="coperta card-img-top" alt="{{this.title}}">
                            {{else}}
                                <div style="position: relative;">
                                    <img src="/{{template}}/img/SIGLA-CRED1.png" alt="logo educred" style="position: absolute; top: 0,5rem;">
                                    <img src="/{{template}}/img/black-1072366_1920.jpg" class="coperta card-img-top" alt="{{this.title}}">
                                </div>
                            {{/if}}
                        </aside>
                        <main>
                            <p class="card-text">{{this.description}}</p>   
                        </main>  
                    </div>
                    <div class="card-footer">
                        {{!-- {{this.date}} --}}
                        {{#each this.etichete}}
                            <a href="/tag/{{this}}">
                                <span class="badge badge-info">{{this}}</span>
                            </a>
                        {{/each}}
                        {{!-- {{this.dataRo}} --}}
                    </div>
                </div>





Retine și codul de competență specifica



clasa disciplina -> competente specifice



Materialul este afișat public la adresa (notă în afișare)


      
      
        {{!-- ES6 SHIM --}}
        {{!-- <script type="application/javascript" src="/{{template}}/lib/es6-shim/es6-shim.min.js"></script> --}}
        {{!-- https://github.com/es-shims/es6-shim --}}


[]
[24-01-2022 12:43:30] [error] [undefined]: 
[24-01-2022 12:43:30] [error] [undefined]: 
Am pornit
la prelucrarea setului au apărut erorile  TypeError [ERR_INVALID_URL]: Invalid URL
    at new NodeError (node:internal/errors:371:5)
    at onParseError (node:internal/url:552:9)
    at new URL (node:internal/url:632:5)
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/sockets.js:1777:40
    at Array.forEach (<anonymous>)
    at createREDRecords (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/sockets.js:1753:17)
    at Object.complete (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/sockets.js:2000:25)
    at ReadableStreamStreamer.ChunkStreamer.parseChunk (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/papaparse/papaparse.js:556:18)
    at ReadableStreamStreamer.<anonymous> (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/papaparse/papaparse.js:870:11)
    at ReadableStreamStreamer._streamData (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/papaparse/papaparse.js:1866:25)
    at ReadableStreamStreamer.<anonymous> (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/papaparse/papaparse.js:889:9)
    at Readable.<anonymous> (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/papaparse/papaparse.js:1866:25)
    at Readable.emit (node:events:390:28)
    at endReadableNT (node:internal/streams/readable:1343:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21) {
  input: 'NULL',
  code: 'ERR_INVALID_URL'
}





{
    "expertCheck": false,
    "uuid": "6d3629d8-83cc-4d44-a625-ee9d5dad0c4c",
    "emailContrib": "nicu.constantinescu@educred.ro",
    "langRED": "rum",
    "title": "Vânatoarea de coduri",
    "titleI18n": [],
    "idContributor": "5e9832fcf052494338584d92",
    "description": "Finds a single document by its _id field. findById(id) is almost* equivalent to findOne({ _id: id }). If you want to query by a document's _id, use findById() instead of findOne().",
    "licenta": "CC BY",
    "arieCurriculara": [
        "Limbă și comunicare"
    ],
    "level": [
        "Clasa a II-a"
    ],
    "discipline": [
        "Comunicare în limba română"
    ],
    "competenteGen": [
        "Receptarea de mesaje orale în contexte de comunicare cunoscute"
    ],
    "competenteS": [
        "5e8eebafa303ea2541454d28",
        "5e8eebafa303ea2541454d2a"
    ],
    "activitati": [
        [
            "lbcomRom2-1.1",
            "selectarea/ formularea unor titluri potrivite textelor scurte audiate"
        ],
        [
            "lbcomRom2-1.1",
            "povestirea orală, cu întrebări de sprijin, a unui fragment audiat"
        ],
        [
            "lbcomRom2-1.3",
            "formarea unor cuvinte prin derivare cu prefixe sau sufixe (fără terminologie)"
        ],
        [
            "lbcomRom2-1.3",
            "jocuri de tip „Fazan” „Cuvinte alintate”"
        ]
    ],
    "relatedTo": [],
    "etichete": [
        "lbcomRom2",
        "Comunicare în limba română"
    ],
    "nameUser": "Nicu Constantinescu",
    "rol": "resursa susține o activitate de învățare indicată în programa școlară"
}  
  
  
  id = _.generateBlockId(),


  https://github.com/codex-team/editor.js/blob/e3db19df84d0fe4fb75a9556cc51a09cc6b172c2/src/components/utils.ts#L676


/**
 * Class Util
 */


/**
 * Create a block id
 *
 * @returns {string}
 */
 export function generateBlockId() {
    return nanoid(10);
  }


  //https://github.com/ai/nanoid


 import { nanoid } from 'nanoid';

  /**
 * Returns random generated identifier
 *
 * @param {string} prefix - identifier prefix
 *
 * @returns {string}
 */
export function generateId(prefix = '') {
  return `${prefix}${(Math.floor(Math.random() * 1e8)).toString(16)}`; // genereaza șapte Prefix ar trebui să fie trei
}








Problema de upgrade la globby are un răspuns aici: https://github.com/FormidableLabs/trace-pkg/compare/experiment/esm-pkgs-support
Vezi și recitește informația de la https://formidable.com/blog/2021/node-esm-and-exports/ 


https://github.com/rndme/download
The download() function is used to trigger a file download from JavaScript.

It specifies the contents and name of a new file placed in the browser's download directory. The input can be a URL, String, Blob, or Typed Array of data, or via a dataURL representing the file's data as base64 or url-encoded string. No matter the input format, download() saves a file using the specified file name and mime information in the same manner as a server using a Content-Disposition HTTP header.

https://github.com/pqina/filepond
A JavaScript library that can upload anything you throw at it, optimizes images for faster uploads, and offers a great, accessible, silky smooth user experience.


Isomorphic git -> index.cjs

function join(...parts) {
  let nrp = normalizePath(parts.map(normalizePath).join('/'))
  console.log(`Normalizarea căilor are următorul efect: `, nrp);
  // return normalizePath(parts.map(normalizePath).join('/'))
  return nrp
}


icolaie@nicolaie-G750JX:~/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/repo/5e9832fcf052494338584d92/b0626e62-d73b-4019-9aae-a837d357f492$ git branch
* master
nicolaie@nicolaie-G750JX:~/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/repo/5e9832fcf052494338584d92/b0626e62-d73b-4019-9aae-a837d357f492$ git log
commit f963b5e135e4c945943393f0787b68f5e262f55f (HEAD -> master)
Author: Nicu Constantinescu <nicu.constantinescu@educred.ro>
Date:   Sun Jan 16 23:37:56 2022 +0200

    Start-1642369076830


A creat branch-ul main, dar nu a adăugat fișierele

nicolaie@nicolaie-G750JX:~/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/repo/5e9832fcf052494338584d92/b0626e62-d73b-4019-9aae-a837d357f492$ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	6d9930e83bbb43bba93e22eda2871b55.svg
	bag-info.txt
	bagit.txt
	data/
	manifest-sha256.txt

nothing added to commit but untracked files present (use "git add" to track)
nicolaie@nicolaie-G750JX:~/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/repo/5e9832fcf052494338584d92/b0626e62-d73b-4019-9aae-a837d357f492$ git status
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	6d9930e83bbb43bba93e22eda2871b55.svg
	bag-info.txt
	bagit.txt
	data/
	manifest-sha256.txt

nothing added to commit but untracked files present (use "git add" to track)



Vezi ca vrea să populeze repo-ul cu toate fișierele și directoarele aplicației. Vezi modifică setările lui globby pentru a lua doar resursele din subdirectorul local.


[app.js] O promisiune a fost respinsă fără a fi tratată respingerea Promise {
  <rejected> NotFoundError: Could not find Dockerfile.
      at addToIndex (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/isomorphic-git/index.cjs:4473:21)
      at async /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/isomorphic-git/index.cjs:4455:7
      at async /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/isomorphic-git/index.cjs:882:16 {
    caller: 'git.add',
    code: 'NotFoundError',
    data: { what: 'Dockerfile' }
  }
}  având motivul NotFoundError: Could not find Dockerfile.
[16-01-2022 17:56:24] [error] [undefined]:      [object Promise] NotFoundError: Could not find Dockerfile.
[16-01-2022 17:56:24] [error] [undefined]:      [object Promise] NotFoundError: Could not find Dockerfile.
Procesul a fost încheiat având codul:  1



gource -s .03 --auto-skip-seconds .1 --multi-sampling -f -1280x720 --camera-mode track --realtime --stop-at-end --highlight-users --logo ./public/doru/img/repologo.png --title "Colector RED" --output-ppm-stream - --output-framerate 30 | ffmpeg -y -r 30 -f image2pipe -vcodec ppm -i - -b 65536K movie.mp4



TypeError: Cannot read properties of undefined (reading 'url')
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/controllers/editorJs2HTML.js:97:54
    at Array.map (<anonymous>)
    at content2html (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/controllers/editorJs2HTML.js:7:24)
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/public.js:109:30
    at processTicksAndRejections (node:internal/process/task_queues:96:5)

Aplicația a crăpat cu următoarele detalii:  Error: [resurse.ctrl.js]::Verificarea existenței alias-ului a dat chix
    at Object.loadRootResources (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/controllers/resurse.ctrl.js:67:19)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
[10-01-2022 08:16:38] [error] [undefined]:      [resurse.ctrl.js]::Verificarea existenței alias-ului a dat chix
[10-01-2022 08:16:38] [error] [undefined]:      [resurse.ctrl.js]::Verificarea existenței alias-ului a dat chix


GET /users0/_search
{
  "query": {
    "match_all": {}
  }
}

GET /users0/_mapping

GET /users0/_search
{
  "query": {
      "multi_match": {
          "query": "video",
          "type": "most_fields",
          "fields": ["email", "googleProfile.name"]
      }
  }
}

GET /resursedus0/_search
{
  "size": 0,
  "aggs": {
    "clasa": {
      "terms": {
        "field": "level.raw"
      }
    }
  }
}

GET /resursedus0/_search
{
  "size": 0,
  "aggs": {
    "arieCurriculara": {
      "terms": {
        "field": "arieCurriculara.raw"
      },
      "aggs": {
        "discipline": {
          "terms": {
            "field": "discipline.raw",
            "missing": "neprecizat",
            "min_doc_count": 0,
            "order": {
              "_key": "asc"
            }
          }
        },
        "cadenta": {
          "date_histogram": {
            "field": "date",
            "interval": "week"
          }
        }
      }
    }
  }
}

GET /resursedus0/_search
{
  "size": 0,
  "aggs": {
    "arieCurriculara": {
      "terms": {
        "field": "arieCurriculara.raw"
      },
      "aggs": {
        "discipline": {
          "terms": {
            "field": "discipline.raw",
            "missing": "neprecizat",
            "min_doc_count": 0,
            "order": {
              "_key": "asc"
            }
          },
          "aggs": {
            "aprecieri": {
              "histogram": {
                "field": "rating",
                "interval": 1,
                "order": {
                  "_key": "desc"
                }
              }
            }
          }
        },
        "ultimii_ani": {
          "date_histogram": {
            "field": "date",
            "calendar_interval": "1y",
            "order": {
              "_key": "desc"
            }
          }
        }
      }
    }
  }
}


GET _cat/indices/?v

GET _cat/indices/*,-.*?v

GET /_cat/health?v=true

DELETE /false

GET /resedus*/_alias

GET /users*/_alias

GET /users/_alias

GET /_cat/indices/exists

GET _cat/count/resedus1/?v&pretty

GET /resedus0/_search?size=0&filter_path=hits.total&pretty


[es-helper::indexMongoColInES7] Eroare: TypeError: model.find is not a function
    at indexMongoColInES7 (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/model-helpers/es7-helper.js:547:47)
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/model-helpers/es7-helper.js:472:21
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
[09-01-2022 17:35:19] [error] [undefined]:      model.find is not a function
[09-01-2022 17:35:19] [error] [undefined]:      model.find is not a function
(node:65596) Warning: Accessing non-existent property 'find' of module exports inside circular dependency
    at emitCircularRequireWarning (node:internal/modules/cjs/loader:707:11)
    at Object.get (node:internal/modules/cjs/loader:721:5)
    at indexMongoColInES7 (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/model-helpers/es7-helper.js:547:47)
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/model-helpers/es7-helper.js:472:21
    at processTicksAndRejections (node:internal/process/task_queues:96:5)



 Patch Update Backwards-compatible bug fixes.
 ◉ datatables.net-select     1.3.3   ❯  1.3.4   https://datatables.net
 ◉ datatables.net-select-dt  1.3.3   ❯  1.3.4   https://datatables.net
 ◉ express                   4.17.1  ❯  4.17.2  http://expressjs.com/
 ◉ isomorphic-git            1.10.1  ❯  1.10.3  https://isomorphic-git.org/
 ◉ mongoose                  6.1.0   ❯  6.1.5   https://mongoosejs.com
 ◉ socket.io                 4.4.0   ❯  4.4.1   https://github.com/socketio/socket.io#readme
 ◉ socket.io-client          4.4.0   ❯  4.4.1   https://github.com/socketio/socket.io-client#readme
 ◉ autocannon devDep         7.5.0   ❯  7.5.1   https://github.com/mcollina/autocannon#readme
 ◉ autoprefixer devDep       10.4.0  ❯  10.4.2  https://github.com/postcss/autoprefixer#readme
  
 Minor Update New backwards-compatible features.
 ◉ @elastic/elasticsearch              7.15.0  ❯  7.16.0  http://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
 ◉ copy-webpack-plugin devDep          10.0.0  ❯  10.2.0  https://github.com/webpack-contrib/copy-webpack-plugin
 ◉ eslint devDep                       8.4.1   ❯  8.6.0   https://eslint.org
 ◉ eslint-plugin-security-node devDep  1.0.14  ❯  1.1.0   https://github.com/gkouziik/eslint-plugin-security-node
❯◉ postcss-cli devDep                  9.0.2   ❯  9.1.0   https://github.com/postcss/postcss-cli#readme
  
 Major Update Potentially breaking API changes. Use caution.
 ◯ express-rate-limit  5.5.1   ❯  6.0.5   https://github.com/nfriedly/express-rate-limit
 ◯ globby              11.0.4  ❯  12.0.2  https://github.com/sindresorhus/globby#readme
 ◯ got                 11.8.3  ❯  12.0.1  https://github.com/sindresorhus/got#readme
 ◯ helmet              4.6.0   ❯  5.0.1   https://helmetjs.github.io/
 ◯ redis               3.1.2   ❯  4.0.1   https://github.com/redis/node-redis
  
 Non-Semver Versions less than 1.0.0, caution.
 ◯ passport  0.5.0  ❯  0.5.2  https://www.passportjs.org/



(node:61486) Warning: Accessing non-existent property 'Symbol(Symbol.toStringTag)' of module exports inside circular dependency
    at emitCircularRequireWarning (node:internal/modules/cjs/loader:707:11)
    at Object.get (node:internal/modules/cjs/loader:721:5)
    at Object.toString (<anonymous>)
    at console.log (<anonymous>)
    at Object.<anonymous> (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/model-helpers/es7-helper.js:45:13)
    at Module._compile (node:internal/modules/cjs/loader:1095:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1147:10)
    at Module.load (node:internal/modules/cjs/loader:975:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Module.require (node:internal/modules/cjs/loader:999:19)
    at require (node:internal/modules/cjs/helpers:102:18)
    at Object.<anonymous> (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/resursa-red.js:8:23)
    at Module._compile (node:internal/modules/cjs/loader:1095:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1147:10)
    at Module.load (node:internal/modules/cjs/loader:975:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
(node:61486) Warning: Accessing non-existent property 'Symbol(nodejs.util.inspect.custom)' of module exports inside circular dependency
    at emitCircularRequireWarning (node:internal/modules/cjs/loader:707:11)
    at Object.get (node:internal/modules/cjs/loader:721:5)
    at formatValue (node:internal/util/inspect:752:30)
    at inspect (node:internal/util/inspect:340:10)
    at formatWithOptionsInternal (node:internal/util/inspect:2006:40)
    at formatWithOptions (node:internal/util/inspect:1888:10)
    at console.value (node:internal/console/constructor:323:14)
    at console.log (node:internal/console/constructor:359:61)
    at Object.<anonymous> (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/model-helpers/es7-helper.js:45:13)
    at Module._compile (node:internal/modules/cjs/loader:1095:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1147:10)
    at Module.load (node:internal/modules/cjs/loader:975:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Module.require (node:internal/modules/cjs/loader:999:19)
    at require (node:internal/modules/cjs/helpers:102:18)
    at Object.<anonymous> (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/resursa-red.js:8:23)
(node:61486) Warning: Accessing non-existent property 'constructor' of module exports inside circular dependency
    at emitCircularRequireWarning (node:internal/modules/cjs/loader:707:11)
    at Object.getOwnPropertyDescriptor (node:internal/modules/cjs/loader:728:5)
    at getOwnPropertyDescriptor (<anonymous>)
    at getConstructorName (node:internal/util/inspect:552:24)
    at formatRaw (node:internal/util/inspect:803:23)
    at formatValue (node:internal/util/inspect:793:10)
    at inspect (node:internal/util/inspect:340:10)
    at formatWithOptionsInternal (node:internal/util/inspect:2006:40)
    at formatWithOptions (node:internal/util/inspect:1888:10)
    at console.value (node:internal/console/constructor:323:14)
    at console.log (node:internal/console/constructor:359:61)
    at Object.<anonymous> (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/model-helpers/es7-helper.js:45:13)
    at Module._compile (node:internal/modules/cjs/loader:1095:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1147:10)
    at Module.load (node:internal/modules/cjs/loader:975:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
(node:61486) Warning: Accessing non-existent property 'Symbol(Symbol.toStringTag)' of module exports inside circular dependency
    at emitCircularRequireWarning (node:internal/modules/cjs/loader:707:11)
    at Object.get (node:internal/modules/cjs/loader:721:5)
    at formatRaw (node:internal/util/inspect:809:18)
    at formatValue (node:internal/util/inspect:793:10)
    at inspect (node:internal/util/inspect:340:10)
    at formatWithOptionsInternal (node:internal/util/inspect:2006:40)
    at formatWithOptions (node:internal/util/inspect:1888:10)
    at console.value (node:internal/console/constructor:323:14)
    at console.log (node:internal/console/constructor:359:61)
    at Object.<anonymous> (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/model-helpers/es7-helper.js:45:13)
    at Module._compile (node:internal/modules/cjs/loader:1095:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1147:10)
    at Module.load (node:internal/modules/cjs/loader:975:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Module.require (node:internal/modules/cjs/loader:999:19)
    at require (node:internal/modules/cjs/helpers:102:18)
(node:61486) Warning: Accessing non-existent property 'Symbol(Symbol.iterator)' of module exports inside circular dependency
    at emitCircularRequireWarning (node:internal/modules/cjs/loader:707:11)
    at Object.get (node:internal/modules/cjs/loader:721:5)
    at formatRaw (node:internal/util/inspect:833:12)
    at formatValue (node:internal/util/inspect:793:10)
    at inspect (node:internal/util/inspect:340:10)
    at formatWithOptionsInternal (node:internal/util/inspect:2006:40)
    at formatWithOptions (node:internal/util/inspect:1888:10)
    at console.value (node:internal/console/constructor:323:14)
    at console.log (node:internal/console/constructor:359:61)
    at Object.<anonymous> (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/model-helpers/es7-helper.js:45:13)
    at Module._compile (node:internal/modules/cjs/loader:1095:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1147:10)
    at Module.load (node:internal/modules/cjs/loader:975:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Module.require (node:internal/modules/cjs/loader:999:19)
    at require (node:internal/modules/cjs/helpers:102:18)  
  
  
  // "type": "module",

Patch Update Backwards-compatible bug fixes.
 ◉ bootstrap           5.1.1   ❯  5.1.3   https://getbootstrap.com/
 ◉ bootstrap-icons     1.7.1   ❯  1.7.2   https://icons.getbootstrap.com/
 ◉ cookie-parser       1.4.5   ❯  1.4.6   https://github.com/expressjs/cookie-parser#readme
 ◉ got                 11.8.2  ❯  11.8.3  https://github.com/sindresorhus/got#readme
 ◉ mocha               9.1.2   ❯  9.1.3   https://mochajs.org/
 ◉ multer              1.4.3   ❯  1.4.4   https://github.com/expressjs/multer#readme
 ◉ nodemon             2.0.14  ❯  2.0.15  https://nodemon.io
 ◉ postcss-cli devDep  9.0.1   ❯  9.0.2   https://github.com/postcss/postcss-cli#readme
  
 Minor Update New backwards-compatible features.
 ◉ datatables.net-buttons     2.0.1   ❯  2.1.1   https://datatables.net
 ◉ datatables.net-buttons-dt  2.0.1   ❯  2.1.1   https://datatables.net
 ◉ elasticdump                6.75.0  ❯  6.79.0  https://github.com/elasticsearch-dump/elasticsearch-dump#readme
 ◉ express-rate-limit         5.4.0   ❯  5.5.1   https://github.com/nfriedly/express-rate-limit
 ◉ mongoose                   6.0.8   ❯  6.1.0   https://mongoosejs.com
 ◉ socket.io                  4.2.0   ❯  4.4.0   https://github.com/socketio/socket.io#readme
 ◉ socket.io-client           4.2.0   ❯  4.4.0   https://github.com/socketio/socket.io-client#readme
 ◉ autocannon devDep          7.4.0   ❯  7.5.0   https://github.com/mcollina/autocannon#readme
 ◉ autoprefixer devDep        10.3.6  ❯  10.4.0  https://github.com/postcss/autoprefixer#readme
 ◉ webpack-cli devDep         4.8.0   ❯  4.9.1   https://github.com/webpack/webpack-cli/tree/master/packages/webpack-cli
  
 Major Update Potentially breaking API changes. Use caution.
 ◯ globby                      11.0.4  ❯  12.0.2  https://github.com/sindresorhus/globby#readme
 ◯ redis                       3.1.2   ❯  4.0.0   https://github.com/redis/node-redis
 ◉ copy-webpack-plugin devDep  9.0.1   ❯  10.0.0  https://github.com/webpack-contrib/copy-webpack-plugin
❯◉ eslint devDep               7.32.0  ❯  8.4.1   https://eslint.org
  



Am eliminat din setInRedisESIndexs.js următoarea secvență.

 else {
                    // dacă nu am un index de forma `resedus1`, atunci avem o mare problemă pentru că este un alias
                    alsr = d; // am pus această opțiune din motive istorice, când nu era plănuită vreo reindexare folosind alias-uri
                    
                    //_ FIXME: Aici ar trebui reparat in sensul ștergerii indexului, a constituiri unuia nou cu zero în coadă și a alias-ului său
                    //         urmat de o reindexare a tuturor datelor colecției din Mongo pe noul index.
                    // NOTE: Funcția ES7Helper.delAndCreateNew() face acest lucru la accesarea statisticilor privind Elasticsearch în administrator
                }

Ar fi trebuit să alerg după cai morți. Mai bine refac indecșii de la 0 pentru că oricum s-a modificat și mapping-ul.



Când trecem integral pe Boostrap 5:
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));

Instalează Bootstrap icons (doru tmpl) 
npm i bootstrap-icons


{
  id: 'nSnITY31xtA',
  created_at: '2021-10-14T04:45:53-04:00',
  updated_at: '2021-11-03T21:29:46-04:00',
  promoted_at: '2021-10-14T18:08:01-04:00',
  width: 3744,
  height: 5616,
  color: '#262626',
  blur_hash: 'L45X=NWB4:xZ?wWCM{s.9#Wr$|WX',
  description: null,
  alt_description: null,
  urls: {
    raw: 'https://images.unsplash.com/photo-1634201150093-33bdf1568a7d?ixid=MnwyNzMyODB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzYwNDkxMjM&ixlib=rb-1.2.1',
    full: 'https://images.unsplash.com/photo-1634201150093-33bdf1568a7d?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNzMyODB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzYwNDkxMjM&ixlib=rb-1.2.1&q=85',
    regular: 'https://images.unsplash.com/photo-1634201150093-33bdf1568a7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzMyODB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzYwNDkxMjM&ixlib=rb-1.2.1&q=80&w=1080',
    small: 'https://images.unsplash.com/photo-1634201150093-33bdf1568a7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzMyODB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzYwNDkxMjM&ixlib=rb-1.2.1&q=80&w=400',
    thumb: 'https://images.unsplash.com/photo-1634201150093-33bdf1568a7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzMyODB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzYwNDkxMjM&ixlib=rb-1.2.1&q=80&w=200'
  },
  links: {
    self: 'https://api.unsplash.com/photos/nSnITY31xtA',
    html: 'https://unsplash.com/photos/nSnITY31xtA',
    download: 'https://unsplash.com/photos/nSnITY31xtA/download?ixid=MnwyNzMyODB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzYwNDkxMjM',
    download_location: 'https://api.unsplash.com/photos/nSnITY31xtA/download?ixid=MnwyNzMyODB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzYwNDkxMjM'
  },
  categories: [],
  likes: 58,
  liked_by_user: false,
  current_user_collections: [],
  sponsorship: null,
  topic_submissions: {},
  user: {
    id: 'Ddxxk7rAvhw',
    updated_at: '2021-11-04T11:23:56-04:00',
    username: 'capturedbyjavi',
    name: 'Javier Haro',
    first_name: 'Javier',
    last_name: 'Haro',
    twitter_username: 'ShotByJavi',
    portfolio_url: null,
    bio: 'Living life as a nocturnal photographer, I have no issue with going out in the middle of the night to capture scenes around my city, Long Beach. Inspired by movies, I try my best to encapsulate my surroundings with a touch of cinematic tones. ',
    location: 'Long Beach, CA.',
    links: {
      self: 'https://api.unsplash.com/users/capturedbyjavi',
      html: 'https://unsplash.com/@capturedbyjavi',
      photos: 'https://api.unsplash.com/users/capturedbyjavi/photos',
      likes: 'https://api.unsplash.com/users/capturedbyjavi/likes',
      portfolio: 'https://api.unsplash.com/users/capturedbyjavi/portfolio',
      following: 'https://api.unsplash.com/users/capturedbyjavi/following',
      followers: 'https://api.unsplash.com/users/capturedbyjavi/followers'
    },
    profile_image: {
      small: 'https://images.unsplash.com/profile-1618131264131-2b5b95786159image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
      medium: 'https://images.unsplash.com/profile-1618131264131-2b5b95786159image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
      large: 'https://images.unsplash.com/profile-1618131264131-2b5b95786159image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
    },
    instagram_username: 'capturedbyjavi',
    total_collections: 0,
    total_likes: 132,
    total_photos: 274,
    accepted_tos: true,
    for_hire: true,
    social: {
      instagram_username: 'capturedbyjavi',
      portfolio_url: null,
      twitter_username: 'ShotByJavi',
      paypal_email: null
    }
  },
  exif: {
    make: 'Canon',
    model: 'Canon EOS 5D Mark II',
    name: 'Canon, EOS 5D Mark II',
    exposure_time: '5',
    aperture: '4.0',
    focal_length: '35.0',
    iso: 100
  },
  location: {
    title: null,
    name: null,
    city: null,
    country: null,
    position: { latitude: null, longitude: null }
  },
  views: 205344,
  downloads: 1225
}




Am instalat `got` -> npm install got



npm notice 
npm notice New major version of npm available! 7.19.1 -> 8.1.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v8.1.0
npm notice Run npm install -g npm@8.1.0 to update!
npm notice 


var pResEd = resursaEducationala.populate('competenteS').execPopulate();

Deprecation!!!!!!
Vezi
https://mongoosejs.com/docs/migrating_to_6.html#removed-execpopulate



[app.js] A apărut un "uncaughtException" cu detaliile:  resursaEducationala.populate(...).execPopulate is not a function
[11-10-2021 14:04:27] [error] [undefined]:      resursaEducationala.populate(...).execPopulate is not a function TypeError: resursaEducationala.populate(...).execPopulate is not a function
    at Socket.clbkCreateRED (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/sockets.js:475:70)
    at Socket.emit (node:events:394:28)
    at Socket.emitUntyped (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/socket.io/dist/typed-events.js:69:22)
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/socket.io/dist/socket.js:428:39
    at processTicksAndRejections (node:internal/process/task_queues:78:11)
[11-10-2021 14:04:27] [error] [undefined]:      resursaEducationala.populate(...).execPopulate is not a function TypeError: resursaEducationala.populate(...).execPopulate is not a function
    at Socket.clbkCreateRED (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/sockets.js:475:70)
    at Socket.emit (node:events:394:28)
    at Socket.emitUntyped (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/socket.io/dist/typed-events.js:69:22)
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/socket.io/dist/socket.js:428:39
    at processTicksAndRejections (node:internal/process/task_queues:78:11)
Procesul a fost încheiat având codul:  1
[nodemon] app crashed - waiting for file changes before starting...



npm-check -u
(node:35789) [DEP0128] DeprecationWarning: Invalid 'main' field in '/usr/local/lib/node_modules/npm-check/node_modules/find-parent-dir/package.json' of 'find-parent-dir.js'. Please either fix that or report it to the module author
(Use `node --trace-deprecation ...` to show where the warning was created)
? Choose which packages to update. 
  
 Patch Update Backwards-compatible bug fixes.
 ◉ mongoose            6.0.7  ❯  6.0.8  https://mongoosejs.com
 ◉ postcss-cli devDep  9.0.0  ❯  9.0.1  https://github.com/postcss/postcss-cli#readme
  
 Minor Update New backwards-compatible features.
❯◉ express-rate-limit  5.3.0  ❯  5.4.0  https://github.com/nfriedly/express-rate-limit
  
 Major Update Potentially breaking API changes. Use caution.
 ◯ globby  11.0.4  ❯  12.0.2  https://github.com/sindresorhus/globby#readme






npm audit fix

changed 6 packages, and audited 1065 packages in 2s

98 packages are looking for funding
  run `npm fund` for details

# npm audit report

ansi-regex  >2.1.1 <5.0.1
Severity: moderate
 Inefficient Regular Expression Complexity in chalk/ansi-regex - https://github.com/advisories/GHSA-93q8-gq69-wqmw
fix available via `npm audit fix`
node_modules/wide-align/node_modules/ansi-regex
node_modules/wrap-ansi/node_modules/ansi-regex
  strip-ansi  4.0.0 - 5.2.0
  Depends on vulnerable versions of ansi-regex
  node_modules/wide-align/node_modules/strip-ansi
  node_modules/wrap-ansi/node_modules/strip-ansi
    string-width  2.1.0 - 4.1.0
    Depends on vulnerable versions of strip-ansi
    node_modules/wide-align/node_modules/string-width
    node_modules/wrap-ansi/node_modules/string-width
      wrap-ansi  3.0.0 - 6.1.0
      Depends on vulnerable versions of string-width
      Depends on vulnerable versions of strip-ansi
      node_modules/wrap-ansi
        status-logger  >=3.1.1
        Depends on vulnerable versions of wrap-ansi
        node_modules/status-logger
          neat-log  1.1.2
          Depends on vulnerable versions of status-logger
          node_modules/neat-log

express-hbs  *
Severity: moderate
Insecure template handling in express-hbs - https://github.com/advisories/GHSA-rwxp-hwwf-653v
No fix available
node_modules/express-hbs

7 moderate severity vulnerabilities

To address issues that do not require attention, run:
  npm audit fix

Some issues need review, and may require choosing
a different dependency.


Aplicația a crăpat cu următoarele detalii:  Error: [resurse.ctrl.js]::Verificarea existenței alias-ului a dat chix
    at loadRootResources (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/controllers/resurse.ctrl.js:73:19)



    at Layer.handle [as handle_request] (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/express/lib/router/layer.js:95:5)
    at next (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/express/lib/router/route.js:137:13)
    at Route.dispatch (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/express/lib/router/route.js:112:3)
    at Layer.handle [as handle_request] (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/express/lib/router/layer.js:95:5)
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/express/lib/router/index.js:281:22
    at Function.process_params (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/express/lib/router/index.js:335:12)
    at next (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/express/lib/router/index.js:275:10)
    at Function.handle (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/express/lib/router/index.js:174:3)
    at router (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/express/lib/router/index.js:47:12)
    at Layer.handle [as handle_request] (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/express/lib/router/index.js:317:13)
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/express/lib/router/index.js:284:7
    at Function.process_params (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/express/lib/router/index.js:335:12)
    at next (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/express/lib/router/index.js:275:10)


    at ensureAuthenticated (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/controllers/user.ctrl.js:43:24)

    
[27-09-2021 12:03:37] [error] [undefined]:      [resurse.ctrl.js]::Verificarea existenței alias-ului a dat chix
[27-09-2021 12:03:37] [error] [undefined]:      [resurse.ctrl.js]::Verificarea existenței alias-ului a dat chix


Actualizare

Patch Update Backwards-compatible bug fixes.
❯◯ datatables.net             1.11.2  ❯  1.11.3  https://datatables.net
 ◯ datatables.net-buttons     2.0.0   ❯  2.0.1   https://datatables.net
 ◯ datatables.net-buttons-dt  2.0.0   ❯  2.0.1   https://datatables.net
 ◯ datatables.net-dt          1.11.2  ❯  1.11.3  https://datatables.net
 ◯ isomorphic-git             1.10.0  ❯  1.10.1  https://isomorphic-git.org/
 ◯ mocha                      9.1.1   ❯  9.1.2   https://mochajs.org/
 ◯ mongoose                   6.0.5   ❯  6.0.7   https://mongoosejs.com
 ◯ pm2                        5.1.1   ❯  5.1.2   http://pm2.keymetrics.io/
 ◯ autoprefixer devDep        10.3.4  ❯  10.3.6  https://github.com/postcss/autoprefixer#readme
  
 Minor Update New backwards-compatible features.
 ◯ @elastic/elasticsearch  7.14.1  ❯  7.15.0  http://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
 ◯ elasticdump             6.73.2  ❯  6.75.0  https://github.com/elasticsearch-dump/elasticsearch-dump#readme



ResponseError: mapper_parsing_exception: [mapper_parsing_exception] Reason: Failed to parse mapping [_doc]: Failed to parse value [analyzed] as only [true] or [false] are allowed.
    at onBody (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:350:23)
    at IncomingMessage.onEnd (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:276:11)
    at IncomingMessage.emit (node:events:406:35)
    at endReadableNT (node:internal/streams/readable:1343:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21) {
  meta: {
    body: { error: [Object], status: 400 },
    statusCode: 400,
    headers: {
      'x-elastic-product': 'Elasticsearch',
      warning: '299 Elasticsearch-7.15.0-79d65f6e357953a5b3cbcc5e2c7c21073d89aa29 "Elasticsearch built-in security features are not enabled. Without authentication, your cluster could be accessible to anyone. See https://www.elastic.co/guide/en/elasticsearch/reference/7.15/security-minimal-setup.html to enable security."',
      'content-type': 'application/json; charset=UTF-8',
      'content-length': '472'
    },
    meta: {
      context: null,
      request: [Object],
      name: 'elasticsearch-js',
      connection: [Object],
      attempts: 0,
      aborted: false
    }
  }
} M-am oprit la 0 documente



GET /users0/_search
{
  "query": {
    "match_all": {}
  }
}

GET /users0/_mapping

GET /users0/_search
{
  "query": {
      "multi_match": {
          "query": "nicu.constantinescu",
          "type": "most_fields",
          "fields": ["email", "googleProfile.name"]
      }
  }
}

GET _cat/indices/?v

GET _cat/indices/*,-.*?v

GET /_cat/health?v=true

DELETE /false

GET /resedus*/_alias

GET /users*/_alias

GET /users/_alias

GET /_cat/indices/exists

GET _cat/count/resedus1/?v&pretty

GET /resedus0/_search?size=0&filter_path=hits.total&pretty



/home/nicu/.pm2/logs/app-error.log



Aplicația a crăpat cu următoarele detalii:  TokenError: Bad Request
0|app  |     at Strategy.OAuth2Strategy.parseErrorResponse (/var/www/red.educred.ro/node_modules/passport-oauth2/lib/strategy.js:372:12)
0|app  |     at Strategy.OAuth2Strategy._createOAuthError (/var/www/red.educred.ro/node_modules/passport-oauth2/lib/strategy.js:419:16)
0|app  |     at /var/www/red.educred.ro/node_modules/passport-oauth2/lib/strategy.js:177:45
0|app  |     at /var/www/red.educred.ro/node_modules/oauth/lib/oauth2.js:191:18
0|app  |     at passBackControl (/var/www/red.educred.ro/node_modules/oauth/lib/oauth2.js:132:9)
0|app  |     at IncomingMessage.<anonymous> (/var/www/red.educred.ro/node_modules/oauth/lib/oauth2.js:157:7)
0|app  |     at IncomingMessage.emit (node:events:377:35)
0|app  |     at endReadableNT (node:internal/streams/readable:1312:12)
0|app  |     at processTicksAndRejections (node:internal/process/task_queues:83:21)
0|app  | [15-09-2021 18:32:29] [error] [undefined]: 	Bad Request
0|app  | [15-09-2021 18:32:29] [error] [undefined]: 	Bad Request
0|app  | GET /callback?code=4/0AX4XfWhUNsgqtMGMHtABuHI4xp6QiIYyJv5jR4YUYQpvfWH1XXOuegW_rYUmxiZeSHFPCA&scope=email%20profile%20https://www.googleapis.com/auth/userinfo.email%20openid%20https://www.googleapis.com/auth/userinfo.profile&authuser=1&hd=educred.ro&prompt=none 302 169.194 ms - 52


Uncaught TypeError: $(...).DataTable is not a function
(user.js:165)



[sockets.js::'personrecord'] Eroare la aducerea resurselor personale cu următoarele detalii:  CastError: Cast to ObjectId failed for value "resurse" (type string) at path "_id" for model "user"


Choose which packages to update. @fortawesome/fontawesome-free@5.15.4, multer@1.4.3, pm2@5.1.1, supertest@6.1.6, autoprefixer@10.3.4, @elastic/elasticsearch@7.14.1, bootstrap@5.1.1, datatables.net@1.11.2, datatables.net-dt@1.11.2, elasticdump@6.73.2, isomorphic-git@1.10.0, mocha@9.1.1, socket.io@4.2.0, socket.io-client@4.2.0, webpack-cli@4.8.0, datatables.net-buttons@2.0.0, datatables.net-buttons-dt@2.0.0, globby@12.0.2, mongoose@6.0.5

$ npm install --save @fortawesome/fontawesome-free@5.15.4 multer@1.4.3 pm2@5.1.1 supertest@6.1.6 @elastic/elasticsearch@7.14.1 bootstrap@5.1.1 datatables.net@1.11.2 datatables.net-dt@1.11.2 elasticdump@6.73.2 isomorphic-git@1.10.0 mocha@9.1.1 socket.io@4.2.0 socket.io-client@4.2.0 datatables.net-buttons@2.0.0 datatables.net-buttons-dt@2.0.0 globby@12.0.2 mongoose@6.0.5 --color=always



Update-uri

Patch Update Backwards-compatible bug fixes.
 ◉ isomorphic-git    1.9.1   ❯  1.9.2   https://isomorphic-git.org/
 ◉ mocha             9.0.2   ❯  9.0.3   https://mochajs.org/
 ◉ mongoose          5.13.2  ❯  5.13.5  https://mongoosejs.com
 ◉ socket.io         4.1.2   ❯  4.1.3   https://github.com/socketio/socket.io#readme
 ◉ socket.io-client  4.1.2   ❯  4.1.3   https://github.com/socketio/socket.io-client#readme
 ◉ supertest         6.1.3   ❯  6.1.4   https://github.com/visionmedia/supertest#readme
  
 Minor Update New backwards-compatible features.
 ◉ autocannon devDep    7.3.0   ❯  7.4.0   https://github.com/mcollina/autocannon#readme
 ◉ autoprefixer devDep  10.2.6  ❯  10.3.1  https://github.com/postcss/autoprefixer#readme
 ◉ eslint devDep        7.30.0  ❯  7.32.0  https://eslint.org
 ◉ webpack devDep       5.43.0  ❯  5.47.1  https://github.com/webpack/webpack
  
 Major Update Potentially breaking API changes. Use caution.
❯◉ globby  11.0.4  ❯  12.0.0  https://github.com/sindresorhus/globby#readme



[es7-helper] Rezultatul creării indicelui {
  body: { acknowledged: true, shards_acknowledged: true, index: 'users0' },
  statusCode: 200,
  headers: {
    warning: '299 Elasticsearch-7.13.4-c5f60e894ca0c61cdbae4f5a686d9f08bcefc942 "Elasticsearch built-in security features are not enabled. Without authentication, your cluster could be accessible to anyone. See https://www.elastic.co/guide/en/elasticsearch/reference/7.13/security-minimal-setup.html to enable security."',
    'content-type': 'application/json; charset=UTF-8',
    'content-length': '65'
  },
  meta: {
    context: null,
    request: { params: [Object], options: {}, id: 13 },
    name: 'elasticsearch-js',
    connection: {
      url: 'http://127.0.0.1:9200/',
      id: 'VExS2n4DS8KpqxkqKr_njg',
      headers: {},
      deadCount: 0,
      resurrectTimeout: 0,
      _openRequests: 0,
      status: 'alive',
      roles: [Object]
    },
    attempts: 0,
    aborted: false
  }
}
[es7-helper] Rezultatul creării alias-ului {
  body: { acknowledged: true },
  statusCode: 200,
  headers: {
    warning: '299 Elasticsearch-7.13.4-c5f60e894ca0c61cdbae4f5a686d9f08bcefc942 "Elasticsearch built-in security features are not enabled. Without authentication, your cluster could be accessible to anyone. See https://www.elastic.co/guide/en/elasticsearch/reference/7.13/security-minimal-setup.html to enable security."',
    'content-type': 'application/json; charset=UTF-8',
    'content-length': '21'
  },
  meta: {
    context: null,
    request: { params: [Object], options: {}, id: 14 },
    name: 'elasticsearch-js',
    connection: {
      url: 'http://127.0.0.1:9200/',
      id: 'VExS2n4DS8KpqxkqKr_njg',
      headers: {},
      deadCount: 0,
      resurrectTimeout: 0,
      _openRequests: 0,
      status: 'alive',
      roles: [Object]
    },
    attempts: 0,
    aborted: false
  }
}
Am indexat un număr de 0 documente








[es7-helper.js::deleteIndex] Datele primite sunt:  { idx: 'users0', alsr: 'users' }
[13-07-2021 09:23:43] [error] [undefined]:      aliases_not_found_exception: [aliases_not_found_exception] Reason: aliases [users] missing
[13-07-2021 09:23:43] [error] [undefined]:      aliases_not_found_exception: [aliases_not_found_exception] Reason: aliases [users] missing
[13-07-2021 09:23:43] [error] [undefined]:      index_not_found_exception: [index_not_found_exception] Reason: no such index [users0]
[13-07-2021 09:23:43] [error] [undefined]:      index_not_found_exception: [index_not_found_exception] Reason: no such index [users0]
   
   
   
   
    exports.reidx = function reidx (data) {
            let idx = data.alsr + data.vs,  // Formula este `alsr` + `vs` = numele indexului.
                nvs = '';                   // noua versiune
            /*
            === CREEAZĂ INDEXUL ȘI ALIASUL === INDEXARE DE LA 0
            // Verifică dacă nu cumva există aliasul deja. Șterge-l.
            // Verifică dacă nu cumva există indexul cu numele alias-ului! Șterge-l
            // Creează indexul nou cu mappingul nou.
            */
        
            // Verifică existența alias-ului
            let valEx = esClient.indices.existsAlias({name: RES_IDX_ALS});
        
            valEx.then((r) => {
                console.log("Verificarea existenței alias-ului: ", r.statusCode);
                // verifică dacă aliasul există. Dacă există, setează o variabilă cu numele actualului index.
                if (r.statusCode == 200) {
                    // verifică cui index aparține alias-ul. 
                    esClient.cat.aliases({
                        name: RES_IDX_ALS,
                        format: "json"     
                    }, (err, r) => {
                        if (err) console.log(err);
                        console.log("Rezultatul interogării alias-urilor ", r.body[0].index);
                        RES_IDX_ES7 = r.body[0].index;
                        console.log("Acum RES_IDX_ES7 are valoarea: ", RES_IDX_ES7);
                        
                        // creează unul nou incrementând cifra din componența numelui
                        let baseNameIdx = RES_IDX_ES7.slice(0, -1);
                        let increasedV = parseInt(RES_IDX_ES7.slice(-1));
                        increasedV++;
                        let newBaseName = baseNameIdx + increasedV;
                        // Crează nou index. La momentul creării indexului, se va crea și alias-ul, care are același nume precum cel vechi.
                        esClient.indices.create({
                            index: newBaseName,
                            body: resursaRedES7
                        }).then(r => {
                            console.log("Am creat indexul nou cu următorul detaliu: ", r.body);
                            
                            //TODO: Aici vei face reindexarea înregistrărilor din baza de date
                            const cursor = Resursa.find({}).populate('competenteS').cursor();
                            cursor.eachAsync(doc => {
                                let obi = Object.assign({}, doc._doc);
                                // verifică dacă există conținut
                                var content2txt = '';
                                if ('content' in obi) {
                                    content2txt = editorJs2TXT(obi.content.blocks); // transformă obiectul în text
                                }
                                // indexează documentul
                                const data = {
                                    id:               obi._id,
                                    date:             obi.date,
                                    idContributor:    obi.idContributor,
                                    emailContrib:     obi.emailContrib,
                                    uuid:             obi.uuid,
                                    autori:           obi.autori,
                                    langRED:          obi.langRED,
                                    title:            obi.title,
                                    titleI18n:        obi.titleI18n,
                                    arieCurriculara:  obi.arieCurriculara,
                                    level:            obi.level,
                                    discipline:       obi.discipline,
                                    disciplinePropuse:obi.disciplinePropuse,
                                    competenteGen:    obi.competenteGen,
                                    rol:              obi.rol,
                                    abilitati:        obi.abilitati,
                                    materiale:        obi.materiale,
                                    grupuri:          obi.grupuri,
                                    domeniu:          obi.demersuri,
                                    spatii:           obi.spatii,
                                    invatarea:        obi.invatarea,
                                    description:      obi.description,
                                    dependinte:       obi.dependinte,
                                    coperta:          obi.coperta,
                                    content:          content2txt,
                                    bibliografie:     obi.bibliografie,
                                    contorAcces:      obi.contorAcces,
                                    generalPublic:    obi.generalPublic,
                                    contorDescarcare: obi.contorDescarcare,
                                    etichete:         obi.etichete,
                                    utilMie:          obi.utilMie,
                                    expertCheck:      obi.expertCheck
                                };
                                // creează înregistrare nouă pentru fiecare document în parte
                                esClient.create({
                                    id:      data.id,
                                    index:   RES_IDX_ALS,
                                    refresh: true,
                                    body:    data
                                });
                                // Ține contul documentelor procesate
                                ++procesate;                   
                            }).then((r) => {
                                console.log("Am indexat un număr de ", procesate, " documente");
                                process.exit();               
                            }).catch(e => {
                                if (e) {
                                    console.error(e, "M-am oprit la ", procesate, " documente");
                                };
                                process.exit();
                            });
                        }).catch(e => {
                            if (e) throw e;
                        });
        
                        // Șterge indexul vechi
                        esClient.indices.delete({
                            index: RES_IDX_ES7
                        }, (error, r) => {
                            if (error) console.error(error);
                            console.log("Am șters indexul ", RES_IDX_ES7, " vechi cu următoarele detalii: ", r.statusCode);
                        });
                    });
                } else { 
                    // dacă alias-ul nu există, verifică dacă nu cumva există vreun index cu numele alias-ului. Dacă, da, șterge-l!
                    esClient.indices.exists({index: RES_IDX_ALS}).then(r => {
                        if (r.statusCode == 200){
                            console.log("În schimb există indexul cu numele alias-ului!");
                            esClient.indices.delete({
                                index: RES_IDX_ALS
                            }).then(r => {
                                console.log("Rezultatul ștergerii indexului care avea numele alias-ului", r.statusCode);
                                // are ca efect ștergerea indexului, cât și a alias-urilor acestuia.
                            });
                        }
                    }).catch(e => console.error);
                    
                    // Verifică dacă nu cumva există deja indexul pe care vrei să-l creezi. 
                    // Dacă există, creează index nou cu versiune incrementată
                    // Reindexează înregistrările din baza de date și abia când totul este OK, șterge-l!
                    esClient.indices.exists({
                        index: RES_IDX_ES7
                    }).then(r => {
                        if(r.statusCode == 200){
                            console.log("Indexul deja există și se procedează la crearea unuia nou.");
                            
                            // creează-l din nou incrementând cifra din componența numelui
                            let baseNameIdx = RES_IDX_ES7.slice(0, -1);
                            let increasedV = parseInt(RES_IDX_ES7.slice(-1));
                            increasedV++;
                            let newBaseName = baseNameIdx + increasedV;
                            console.log("Noul nume al indexului este: ", newBaseName);
        
                            // Crează nou index. La momentul creării indexului, se va crea și alias-ul, care are același nume precum cel vechi.
                            esClient.indices.create({
                                index: newBaseName,
                                body: resursaRedES7
                            }).then(r => {
                                console.log("Am creat indexul nou cu următorul detaliu: ", r.body);
                                
                                // _TODO: Aici vei face reindexarea înregistrărilor din baza de date
                                const cursor = Resursa.find({}).populate('competenteS').cursor();
                                cursor.eachAsync(doc => {
                                    let obi = Object.assign({}, doc._doc);
                                    // verifică dacă există conținut
                                    var content2txt = '';
                                    if ('content' in obi) {
                                        content2txt = editorJs2TXT(obi.content.blocks); // transformă obiectul în text
                                    }
                                    // indexează documentul
                                    const data = {
                                        id:               obi._id,
                                        date:             obi.date,
                                        idContributor:    obi.idContributor,
                                        emailContrib:     obi.emailContrib,
                                        uuid:             obi.uuid,
                                        autori:           obi.autori,
                                        langRED:          obi.langRED,
                                        title:            obi.title,
                                        titleI18n:        obi.titleI18n,
                                        arieCurriculara:  obi.arieCurriculara,
                                        level:            obi.level,
                                        discipline:       obi.discipline,
                                        disciplinePropuse:obi.disciplinePropuse,
                                        competenteGen:    obi.competenteGen,
                                        rol:              obi.rol,
                                        abilitati:        obi.abilitati,
                                        materiale:        obi.materiale,
                                        grupuri:          obi.grupuri,
                                        domeniu:          obi.demersuri,
                                        spatii:           obi.spatii,
                                        invatarea:        obi.invatarea,
                                        description:      obi.description,
                                        dependinte:       obi.dependinte,
                                        coperta:          obi.coperta,
                                        content:          content2txt,
                                        bibliografie:     obi.bibliografie,
                                        contorAcces:      obi.contorAcces,
                                        generalPublic:    obi.generalPublic,
                                        contorDescarcare: obi.contorDescarcare,
                                        etichete:         obi.etichete,
                                        utilMie:          obi.utilMie,
                                        expertCheck:      obi.expertCheck
                                    };
                                    esClient.create({
                                        id:      data.id,
                                        index:   RES_IDX_ALS,
                                        refresh: true,
                                        body:    data
                                    });
                                    // Îne contul celor procesate
                                    ++procesate;                        
                                }).then((r) => {
                                    console.log("Am indexat un număr de ", procesate, " documente");                       
                                }).catch(e => {
                                    if (e) {
                                        console.error(e, "M-am oprit la ", procesate, " documente");
                                    };
                                    process.exit();
                                });
                            }).catch(e => {
                                if (e) {
                                    console.error(e)
                                };
                            });
        
                            // Șterge indexul vechi
                            esClient.indices.delete({
                                index: RES_IDX_ES7
                            }, (error, r) => {
                                if (error) console.error(error);
                                console.log("Am șters indexul vechi cu următoarele detalii: ", r);
                            });
                        }
                    })
                    // Creează indexul nou
                    esClient.indices.create({
                        index: RES_IDX_ES7,
                        body: resursaRedES7
                    }).then((result) => {
                        console.log("Am creat nou index cu următorul rezultat: ", result.body);
                        const cursor = Resursa.find({}).populate('competenteS').cursor();
                        cursor.eachAsync(doc => {
                            let obi = Object.assign({}, doc._doc);
                            // verifică dacă există conținut
                            var content2txt = '';
                            if ('content' in obi) {
                                content2txt = editorJs2TXT(obi.content.blocks); // transformă obiectul în text
                            }
                            // indexează documentul
                            const data = {
                                id:               obi._id,
                                date:             obi.date,
                                idContributor:    obi.idContributor,
                                emailContrib:     obi.emailContrib,
                                uuid:             obi.uuid,
                                autori:           obi.autori,
                                langRED:          obi.langRED,
                                title:            obi.title,
                                titleI18n:        obi.titleI18n,
                                arieCurriculara:  obi.arieCurriculara,
                                level:            obi.level,
                                discipline:       obi.discipline,
                                disciplinePropuse:obi.disciplinePropuse,
                                competenteGen:    obi.competenteGen,
                                rol:              obi.rol,
                                abilitati:        obi.abilitati,
                                materiale:        obi.materiale,
                                grupuri:          obi.grupuri,
                                domeniu:          obi.demersuri,
                                spatii:           obi.spatii,
                                invatarea:        obi.invatarea,
                                description:      obi.description,
                                dependinte:       obi.dependinte,
                                coperta:          obi.coperta,
                                content:          content2txt,
                                bibliografie:     obi.bibliografie,
                                contorAcces:      obi.contorAcces,
                                generalPublic:    obi.generalPublic,
                                contorDescarcare: obi.contorDescarcare,
                                etichete:         obi.etichete,
                                utilMie:          obi.utilMie,
                                expertCheck:      obi.expertCheck
                            };
                            // creează înregistrare nouă pentru fiecare document
                            esClient.create({
                                id:      data.id,
                                index:   RES_IDX_ALS,
                                refresh: true,
                                body:    data
                            });
                            // Ține contul celor procesate
                            ++procesate;
                        }).then((r) => {
                            console.log("Am indexat un număr de ", procesate, " documente");
                            process.exit();                       
                        }).catch(e => {
                            if (e) {
                                console.error(e, "M-am oprit la ", procesate, " documente");
                            };
                            process.exit();
                        });
                    }).catch(e => console.error);
                }
            }).catch(e => console.error);
        }




Alias-ul resedus există? R:  true , iar indexul ar trebui să fie:  resedus1
Alias-ul resedus aparține indexului:  resedus1
Noul nume al indexului este:  resedus2
Am creat indexul nou cu următorul detaliu:  { acknowledged: true, shards_acknowledged: true, index: 'resedus2' }
[es7-helper] Am eșuat crearea noului index cu următoarele detalii:  ReferenceError: alsr is not defined
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/model-helpers/es7-helper.js:360:39
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
[08-07-2021 11:59:15] [error] [undefined]:      alsr is not defined
[08-07-2021 11:59:15] [error] [undefined]:      alsr is not defined



[es7-helper.js::deleteIndex] Datele primite sunt:  { idx: 'resedus2', alsr: 'resedus' }
[08-07-2021 11:58:32] [error] [undefined]:      index_not_found_exception: [index_not_found_exception] Reason: no such index [resedus2]
[08-07-2021 11:58:32] [error] [undefined]:      index_not_found_exception: [index_not_found_exception] Reason: no such index [resedus2]



Am creat indexul nou cu următorul detaliu:  { acknowledged: true, shards_acknowledged: true, index: 'resedus2' }
[es7-helper] Am eșuat crearea noului index cu următoarele detalii:  ResponseError: script_exception: [script_exception] Reason: compile error
    at onBody (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:337:23)
    at IncomingMessage.onEnd (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:264:11)
    at IncomingMessage.emit (node:events:406:35)
    at endReadableNT (node:internal/streams/readable:1329:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21) {
  meta: {
    body: { error: [Object], status: 400 },
    statusCode: 400,
    headers: {
      warning: '299 Elasticsearch-7.13.3-5d21bea28db1e89ecc1f66311ebdec9dc3aa7d64 "Elasticsearch built-in security features are not enabled. Without authentication, your cluster could be accessible to anyone. See https://www.elastic.co/guide/en/elasticsearch/reference/7.13/security-minimal-setup.html to enable security."',
      'content-type': 'application/json; charset=UTF-8',
      'content-length': '506'
    },
    meta: {
      context: null,
      request: [Object],
      name: 'elasticsearch-js',
      connection: [Object],
      attempts: 0,
      aborted: false
    }
  }
}
[08-07-2021 11:52:30] [error] [undefined]:      script_exception: [script_exception] Reason: compile error
[08-07-2021 11:52:30] [error] [undefined]:      script_exception: [script_exception] Reason: compile error

Pentru că funcționalitățile pachetului `uuid` au început să se regăsească în pachetul `crypto` al Node.js, am migrat funcționalitățile pentru generarea UUID-ului.



Patch Update Backwards-compatible bug fixes.
❯◯ datatables.net                1.10.24  ❯  1.10.25  https://datatables.net
 ◯ datatables.net-buttons        1.7.0    ❯  1.7.1    https://datatables.net
 ◯ datatables.net-buttons-dt     1.7.0    ❯  1.7.1    https://datatables.net
 ◯ datatables.net-responsive     2.2.7    ❯  2.2.9    https://datatables.net
 ◯ datatables.net-responsive-dt  2.2.7    ❯  2.2.9    https://datatables.net
 ◯ express-session               1.17.1   ❯  1.17.2   https://github.com/expressjs/session#readme
 ◯ globby                        11.0.3   ❯  11.0.4   https://github.com/sindresorhus/globby#readme
 ◯ isomorphic-git                1.8.2    ❯  1.8.10   https://isomorphic-git.org/
 ◯ papaparse                     5.3.0    ❯  5.3.1    http://papaparse.com
 ◯ winston-daily-rotate-file     4.5.3    ❯  4.5.5    https://github.com/winstonjs/winston-daily-rotate-file#readme
 ◯ autoprefixer devDep           10.2.5   ❯  10.2.6   https://github.com/postcss/autoprefixer#readme
  
 Minor Update New backwards-compatible features.
 ◉ @elastic/elasticsearch  7.12.0  ❯  7.13.0  http://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
 ◉ express-rate-limit      5.2.6   ❯  5.3.0   https://github.com/nfriedly/express-rate-limit
❯◉ mongoose                5.12.7  ❯  5.13.0  https://mongoosejs.com
 ◯ socket.io               4.0.1   ❯  4.1.2   https://github.com/socketio/socket.io#readme
 ◯ socket.io-client        4.0.1   ❯  4.1.2   https://github.com/socketio/socket.io-client#readme
 ◯ autocannon devDep       7.2.0   ❯  7.3.0   https://github.com/mcollina/autocannon#readme
 ◯ eslint devDep           7.25.0  ❯  7.29.0  https://eslint.org
 ◯ webpack devDep          5.36.2  ❯  5.42.0  https://github.com/webpack/webpack
 ◯ webpack-cli devDep      4.6.0   ❯  4.7.2   https://github.com/webpack/webpack-cli/tree/master/packages/webpack-cli
  
 Major Update Potentially breaking API changes. Use caution.
 ◯ bootstrap                   4.6.0    ❯  5.0.2   https://getbootstrap.com/
 ◯ connect-redis               5.2.0    ❯  6.0.0   https://github.com/visionmedia/connect-redis#readme
 ◯ datatables.net-bs4          1.10.24  ❯  3.2.2   https://datatables.net
 ◯ dotenv                      8.2.0    ❯  10.0.0  https://github.com/motdotla/dotenv#readme
 ◯ fs-extra                    9.1.0    ❯  10.0.0  https://github.com/jprichardson/node-fs-extra
 ◯ mocha                       8.3.2    ❯  9.0.1   https://mochajs.org/
 ◯ passport-twitter            0.1.5    ❯  1.0.4   https://github.com/jaredhanson/passport-twitter#readme
 ◯ pm2                         4.5.6    ❯  5.1.0   http://pm2.keymetrics.io/
 ◯ copy-webpack-plugin devDep  8.1.1    ❯  9.0.1   https://github.com/webpack-contrib/copy-webpack-plugin

 Non-Semver Versions less than 1.0.0, caution.
❯◉ i18n  0.13.2  ❯  0.13.3  http://github.com/mashpie/i18n-node







https://redislabs.com/blog/goodbye-cache-redis-as-a-primary-database/


[es7-helper.js::deleteIndex] Datele primite sunt:  { idx: 'users' }
ResponseError: illegal_argument_exception
    at onBody (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:337:23)
    at IncomingMessage.onEnd (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:264:11)
    at IncomingMessage.emit (node:events:377:35)
    at endReadableNT (node:internal/streams/readable:1312:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21) {
  meta: {
    body: { error: [Object], status: 400 },
    statusCode: 400,
    headers: {
      warning: '299 Elasticsearch-7.13.0-5ca8591c6fcdb1260ce95b08a8e023559635c6f3 "Elasticsearch built-in security features are not enabled. Without authentication, your cluster could be accessible to anyone. See https://www.elastic.co/guide/en/elasticsearch/reference/7.13/security-minimal-setup.html to enable security."',
      'content-type': 'application/json; charset=UTF-8',
      'content-length': '253'
    },
    meta: {
      context: null,
      request: [Object],
      name: 'elasticsearch-js',
      connection: [Object],
      attempts: 0,
      aborted: false
    }
  }
}
[01-06-2021 13:10:24] [error] [undefined]:      illegal_argument_exception
[01-06-2021 13:10:24] [error] [undefined]:      illegal_argument_exception







Am introdus în modelul datelor specificația de rating cu următoarele detalii.

    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    }



Actualizarea înregistrărilor pentru o colecție

https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/
https://stackoverflow.com/questions/7714216/add-new-field-to-every-document-in-a-mongodb-collection
https://stackoverflow.com/questions/36228599/how-to-use-mongoose-model-schema-with-dynamic-keys
https://github.com/Automattic/mongoose/issues/1867
https://mongoosejs.com/docs/guide.html#strict




Lucru pentru a realiza un mecanism de upload al imaginilor folosind Socket.IO

https://www.digitalocean.com/community/tutorials/how-to-add-advanced-photo-uploads-in-node-and-express
https://bezkoder.com/node-js-upload-resize-multiple-images/
https://coderszine.com/upload-multiple-image-in-node-js/
https://medium.com/swlh/video-streaming-using-opencv4nodejs-with-node-js-express-and-socket-io-3806abb049a
https://www.npmjs.com/package/socketio-file-upload
https://iabhishek.dev/post/building-a-multimedia-chat-app-using-expres-socketio-redis-and-docker-part-1
https://iabhishek.dev/post/building-a-multimedia-chat-app-using-express-socketio-redis-and-docker-part-2
https://iabhishek.dev/post/building-a-multimedia-chat-app-using-express-socketio-redis-and-docker-part-3

https://docs.mongodb.com/manual/tutorial/deploy-replica-set-for-testing/
https://medium.com/swlh/build-your-own-realtime-database-with-socket-io-and-mongodb-1c561c2bb87
https://hackernoon.com/enforcing-a-single-web-socket-connection-per-user-with-node-js-socket-io-and-redis-65f9eb57f66a


ReferenceError: next is not defined
    at /var/www/red.educred.ro/routes/upload.js:178:25
Error: EACCES: permission denied, mkdir '/var/www/red.educred.ro/repo/5dc05a3e6b20115bd629aac5'
    at Object.mkdirSync (node:fs:1325:3)
    at sync (/var/www/red.educred.ro/node_modules/bagit-fs/node_modules/mkdirp/index.js:72:13)
    at sync (/var/www/red.educred.ro/node_modules/bagit-fs/node_modules/mkdirp/index.js:78:24)
    at Function.sync (/var/www/red.educred.ro/node_modules/bagit-fs/node_modules/mkdirp/index.js:78:24)
    at new BagIt (/var/www/red.educred.ro/node_modules/bagit-fs/index.js:29:10)
    at BagIt (/var/www/red.educred.ro/node_modules/bagit-fs/index.js:15:40)
    at /var/www/red.educred.ro/routes/sockets.js:274:31 {
  errno: -13,
  syscall: 'mkdir',
  code: 'EACCES',
  path: '/var/www/red.educred.ro/repo/5dc05a3e6b20115bd629aac5'
}

{ "_id" : ObjectId("60994a345333df1b975aa6d9"), "date" : ISODate("2021-05-10T14:59:00.460Z"), "title" : "Un eford de câteva luni", "idContributor" : "nicu.constantinescu@educred.ro", "content" : { "time" : 1620658740455, "blocks" : [ { "id" : "8AHG184qGi", "type" : "paragraph", "data" : { "text" : "Astăzi a fost instalată versiunea 0.9.7 a aplicației colectorului. Este un efort de câteva luni pentru a actualiza și a îmbunătăți baza de cod. În plus, în vederea unei ușoare portări cu scopul de a mări numărul celor care doresc să se implice în dezvoltare software, întregul cod a fost pe volume gestionabile cu Docker.&nbsp;" } }, { "id" : "kCo-VngD2S", "type" : "paragraph", "data" : { "text" : "Toate eforturile sunt îndreptate în acest moment spre corectarea datelor interne." } }, { "id" : "Pa98uRZg_j", "type" : "paragraph", "data" : { "text" : "Aplicația a suferit și o acualizare a interfeței, dar formularul pentru introducerea resurselor a rămas neschimbat pentru a nu crea nicio discrepanță cu experiența de lucru de până acum." } }, { "id" : "vNbx_wto-A", "type" : "paragraph", "data" : { "text" : "Vă mulțumesc tuturor pentru răbdare. Următoarea etapă după cea a corecturilor și ajustărilor de date, va fi dedicată îmbunătățirii bazei de cod existente dedicate motorului de căutare. Astfel, în acestă versiune căutare nu este disponibilă." } }, { "id" : "hpHKR8Zsg5", "type" : "image", "data" : { "caption" : "", "withBorder" : false, "stretched" : false, "withBackground" : false } } ], "version" : "2.21.0" }, "contorAcces" : 0, "__v" : 0 }




0|app  | TypeError: Cannot read property 'url' of undefined
0|app  |     at /var/www/red.educred.ro/routes/controllers/editorJs2HTML.js:23:59
0|app  |     at Array.map (<anonymous>)
0|app  |     at content2html (/var/www/red.educred.ro/routes/controllers/editorJs2HTML.js:7:24)
0|app  |     at clbkLogAdd (/var/www/red.educred.ro/routes/log.js:30:34)
0|app  |     at Array.map (<anonymous>)
0|app  |     at /var/www/red.educred.ro/routes/log.js:26:21
0|app  |     at processTicksAndRejections (node:internal/process/task_queues:96:5)
0|app  | Aplicația a crăpat cu următoarele detalii:  TypeError: Cannot read property 'url' of undefined
0|app  |     at /var/www/red.educred.ro/routes/controllers/editorJs2HTML.js:23:59
0|app  |     at Array.map (<anonymous>)
0|app  |     at content2html (/var/www/red.educred.ro/routes/controllers/editorJs2HTML.js:7:24)
0|app  |     at clbkLogAdd (/var/www/red.educred.ro/routes/log.js:30:34)
0|app  |     at Array.map (<anonymous>)
0|app  |     at /var/www/red.educred.ro/routes/log.js:26:21
0|app  |     at processTicksAndRejections (node:internal/process/task_queues:96:5)
0|app  | [10-05-2021 18:00:10] [error] [undefined]: 	Cannot read property 'url' of undefined
0|app  | [10-05-2021 18:00:10] [error] [undefined]: 	Cannot read property 'url' of undefined
0|app  | GET /log 302 11.741 ms - 52
0|app  | GET /500 500 12.943 ms - -
0|app  | TypeError: Cannot read property 'url' of undefined
0|app  |     at /var/www/red.educred.ro/routes/controllers/editorJs2HTML.js:23:59
0|app  |     at Array.map (<anonymous>)
0|app  |     at content2html (/var/www/red.educred.ro/routes/controllers/editorJs2HTML.js:7:24)
0|app  |     at clbkLogAdd (/var/www/red.educred.ro/routes/log.js:30:34)
0|app  |     at Array.map (<anonymous>)
0|app  |     at /var/www/red.educred.ro/routes/log.js:26:21
0|app  |     at processTicksAndRejections (node:internal/process/task_queues:96:5)
0|app  | Aplicația a crăpat cu următoarele detalii:  TypeError: Cannot read property 'url' of undefined
0|app  |     at /var/www/red.educred.ro/routes/controllers/editorJs2HTML.js:23:59
0|app  |     at Array.map (<anonymous>)
0|app  |     at content2html (/var/www/red.educred.ro/routes/controllers/editorJs2HTML.js:7:24)
0|app  |     at clbkLogAdd (/var/www/red.educred.ro/routes/log.js:30:34)
































0|app  |     at Array.map (<anonymous>)
0|app  |     at /var/www/red.educred.ro/routes/log.js:26:21
0|app  |     at processTicksAndRejections (node:internal/process/task_queues:96:5)
0|app  | [10-05-2021 18:01:30] [error] [undefined]: 	Cannot read property 'url' of undefined
0|app  | [10-05-2021 18:01:30] [error] [undefined]: 	Cannot read property 'url' of undefined








socket.on('delresid'

AM DEZACTIVAT CODUL DE STERGERE DIN INDEX ES!!! REACTIVEAZA!


Căile formate sunt:  repo/5e9832fcf052494338584d92/f1d06596-2878-4d09-b939-ab20b5a404c0 repo/5e9832fcf052494338584d92/deleted repo/5e9832fcf052494338584d92/deleted/f1d06596-2878-4d09-b939-ab20b5a404c0
[sockets.js::'delresid'] Acest id am să incerc să-l șterg. Acum îl caut în Mongoose:  6097ed16531dfaf084e9b6bf
[app.js] A apărut un "uncaughtException" cu detaliile:  index is not defined
[09-05-2021 17:09:57] [error] [undefined]:      index is not defined ReferenceError: index is not defined
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/sockets.js:683:163
    at onBody (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:339:9)
    at IncomingMessage.onEnd (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:264:11)
    at IncomingMessage.emit (node:events:377:35)
    at endReadableNT (node:internal/streams/readable:1312:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21)
[09-05-2021 17:09:57] [error] [undefined]:      index is not defined ReferenceError: index is not defined
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/sockets.js:683:163
    at onBody (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:339:9)
    at IncomingMessage.onEnd (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:264:11)
    at IncomingMessage.emit (node:events:377:35)
    at endReadableNT (node:internal/streams/readable:1312:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21)
Procesul a fost încheiat având codul:  1
[nodemon] app crashed - waiting for file changes before starting...





AM dezafectat codul care face indexare în profile/cod_resursă. Voi reactiva cand reconstruiesc sistemul de indexare 


undefined

[09-05-2021 16:47:23] [error] [undefined]:      Cannot read property 'exists' of undefined
[09-05-2021 16:47:23] [error] [undefined]:      Cannot read property 'exists' of undefined

(node:60048) Warning: Accessing non-existent property 'indices' of module exports inside circular dependency
    at emitCircularRequireWarning (node:internal/modules/cjs/loader:703:11)
    at Object.get (node:internal/modules/cjs/loader:717:5)
    at Object.searchCreateIdx [as searchIdxAndCreateDoc] (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/model-helpers/es7-helper.js:99:35)
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/profile.js:246:31
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
GET /profile/6097e7e9448834e95b3fc3c5 200 134.498 ms - -
Căile formate sunt:  repo/5e9832fcf052494338584d92/c17f02a9-7e16-428d-8773-bb6af6a4f8a7 repo/5e9832fcf052494338584d92/deleted repo/5e9832fcf052494338584d92/deleted/c17f02a9-7e16-428d-8773-bb6af6a4f8a7
[sockets.js::'delresid'] Acest id am să incerc să-l șterg. Acum îl caut în Mongoose:  6097e7e9448834e95b3fc3c5
[app.js] A apărut un "uncaughtException" cu detaliile:  index is not defined
[09-05-2021 16:48:49] [error] [undefined]:      index is not defined ReferenceError: index is not defined
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/sockets.js:682:163
    at onBody (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:339:9)
    at IncomingMessage.onEnd (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:264:11)
    at IncomingMessage.emit (node:events:377:35)
    at endReadableNT (node:internal/streams/readable:1312:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21)
[09-05-2021 16:48:49] [error] [undefined]:      index is not defined ReferenceError: index is not defined
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/sockets.js:682:163
    at onBody (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:339:9)
    at IncomingMessage.onEnd (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:264:11)
    at IncomingMessage.emit (node:events:377:35)
    at endReadableNT (node:internal/streams/readable:1312:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21)
Procesul a fost încheiat având codul:  1
[nodemon] app crashed - waiting for file changes before starting...




[app.js] O promisiune a fost respinsă fără a fi tratată respingerea Promise {
  <rejected> ReferenceError: RES_IDX_ES7 is not defined
      at model.clbkPostSave1 (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/resursa-red.js:182:5)
      at callMiddlewareFunction (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:483:23)
      at next (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:194:9)
      at Kareem.execPost (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:218:3)
      at _cb (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:308:15)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/model.js:418:5
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/model.js:293:7
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/utils.js:697:5
      at executeCallback (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/operations/execute_operation.js:65:7)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/operations/insert_one.js:34:21
      at handleCallback (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/utils.js:102:55)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/operations/common_functions.js:262:5
      at handler (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/core/sdam/topology.js:944:24)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/cmap/connection_pool.js:350:13
      at handleOperationResult (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/core/sdam/server.js:558:5)
      at MessageStream.messageHandler (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/cmap/connection.js:277:5)
      at MessageStream.emit (node:events:365:28)
      at processIncomingData (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/cmap/message_stream.js:144:12)
      at MessageStream._write (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/cmap/message_stream.js:42:5)
      at writeOrBuffer (node:internal/streams/writable:389:12)
      at _write (node:internal/streams/writable:330:10)
      at MessageStream.Writable.write (node:internal/streams/writable:334:10)
}  având motivul ReferenceError: RES_IDX_ES7 is not defined



httpstatuses.com

Patch Update Backwards-compatible bug fixes.
❯◯ @fortawesome/fontawesome-free  5.15.2   ❯  5.15.3   https://fontawesome.com
 ◯ datatables.net                 1.10.23  ❯  1.10.24  https://datatables.net
 ◯ datatables.net-bs4             1.10.23  ❯  1.10.24  https://datatables.net
 ◯ datatables.net-dt              1.10.23  ❯  1.10.24  https://datatables.net
 ◯ datatables.net-select          1.3.1    ❯  1.3.3    https://datatables.net
 ◯ datatables.net-select-dt       1.3.1    ❯  1.3.3    https://datatables.net
 ◯ globby                         11.0.2   ❯  11.0.3   https://github.com/sindresorhus/globby#readme
 ◯ isomorphic-git                 1.8.1    ❯  1.8.2    https://isomorphic-git.org/
 ◯ mocha                          8.3.1    ❯  8.3.2    https://mochajs.org/
 ◯ pm2                            4.5.5    ❯  4.5.6    http://pm2.keymetrics.io/
 ◯ winston-daily-rotate-file      4.5.0    ❯  4.5.3    https://github.com/winstonjs/winston-daily-rotate-file#readme
  
Minor Update New backwards-compatible features.
 ◯ @elastic/elasticsearch      7.11.0   ❯  7.12.0  http://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
 ◯ connect-redis               5.1.0    ❯  5.2.0   https://github.com/visionmedia/connect-redis#readme
 ◯ datatables.net-buttons      1.6.5    ❯  1.7.0   https://datatables.net
 ◯ datatables.net-buttons-dt   1.6.5    ❯  1.7.0   https://datatables.net
 ◯ express-hbs                 2.3.4    ❯  2.4.0   https://github.com/TryGhost/express-hbs
 ◯ helmet                      4.4.1    ❯  4.6.0   https://helmetjs.github.io/
 ◯ mongoose                    5.11.13  ❯  5.12.7  https://mongoosejs.com
 ◯ redis                       3.0.2    ❯  3.1.2   https://github.com/NodeRedis/node-redis
 ◯ validator                   13.5.2   ❯  13.6.0  https://github.com/validatorjs/validator.js
 ◯ autocannon devDep           7.0.5    ❯  7.2.0   https://github.com/mcollina/autocannon#readme
 ◯ copy-webpack-plugin devDep  8.0.0    ❯  8.1.1   https://github.com/webpack-contrib/copy-webpack-plugin
 ◯ eslint devDep               7.22.0   ❯  7.25.0  https://eslint.org
 ◯ webpack devDep              5.24.3   ❯  5.36.2  https://github.com/webpack/webpack
 ◯ webpack-cli devDep          4.5.0    ❯  4.6.0   https://github.com/webpack/webpack-cli
  
 Major Update Potentially breaking API changes. Use caution.
 ◯ socket.io         3.1.2  ❯  4.0.1  https://github.com/socketio/socket.io#readme
 ◯ socket.io-client  3.1.2  ❯  4.0.1  https://github.com/socketio/socket.io-client#readme

npm install --save @fortawesome/fontawesome-free@5.15.3 datatables.net@1.10.24 datatables.net-bs4@1.10.24 datatables.net-dt@1.10.24 datatables.net-select@1.3.3 datatables.net-select-dt@1.3.3 globby@11.0.3 isomorphic-git@1.8.2 mocha@8.3.2 pm2@4.5.6 winston-daily-rotate-file@4.5.3 @elastic/elasticsearch@7.12.0 connect-redis@5.2.0 datatables.net-buttons@1.7.0 datatables.net-buttons-dt@1.7.0 express-hbs@2.4.0 helmet@4.6.0 mongoose@5.12.7 redis@3.1.2 validator@13.6.0 socket.io@4.0.1 socket.io-client@4.0.1 --color=always

added 5 packages, removed 37 packages, changed 58 packages, and audited 1289 packages in 31s

85 packages are looking for funding
  run `npm fund` for details

3 low severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.


$ npm install --save-dev autocannon@7.2.0 copy-webpack-plugin@8.1.1 eslint@7.25.0 webpack@5.36.2 webpack-cli@4.6.0 --color=always

added 1 package, changed 12 packages, and audited 1290 packages in 5s

85 packages are looking for funding
  run `npm fund` for details

3 low severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

npm audit report

xmldom  <0.5.0
Misinterpretation of malicious XML input - https://npmjs.com/advisories/1650
fix available via `npm audit fix --force`
Will install passport-twitter@0.1.5, which is a breaking change
node_modules/xmldom
  xtraverse  *
  Depends on vulnerable versions of xmldom
  node_modules/xtraverse
    passport-twitter  >=1.0.0
    Depends on vulnerable versions of xtraverse
    node_modules/passport-twitter

3 low severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force



Actualizare la versiunea 2.21.0 a pachetului Editor.js.


https://r-future.github.io/post/how-to-fix-redis-warnings-with-docker/


Dacă ai erori de tipul
ERROR: for redcolectordevel  Container "64467f7e2e99" is unhealthy.
ERROR: Encountered errors while bringing up the project.

Verifică folosind docker-compose ps pentru a vedea starea tuturor containerelor active
Poți investiga fiecare container individual cu:
docker inspect  --format "{{json .State.Health }}" nume_container_sau_id  | jq
sau
docker inspect --format "{{json .State.Health }}" $(docker-compose ps -q) | jq

docker-compose up in the first terminal window, and docker-compose logs -f in another. This will display all logs from docker-compose-managed containers.


Și dacă ai o eroare de citire de socket:
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/64467f7e2e99/json: dial unix /var/run/docker.sock: connect: permission denied

Atunci e o groblemă pentru că folosești docker drept root!!!
Vezi: https://docs.docker.com/engine/install/linux-postinstall/
Vezi: https://www.digitalocean.com/community/questions/how-to-fix-docker-got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket

sudo groupadd docker
groupadd: group 'docker' already exists

sudo usermod -aG docker $USER




Am introdus o variabilă de mediu nouă necesară pregătirii saltului aplicației la posibilitatea de a fi rulată virtualizat: APP_RUNTIME=local
Această variabilă de mediu poate avea două valori: `local` | `virtual`

Actualizare editor de la versiunea 2.20.1 la 2.20.2.

http://localhost:8080/profile/6063439394f7007d68138c05

{
  "error": {
    "root_cause": [
      {
        "type": "invalid_alias_name_exception",
        "reason": "Invalid alias name [false], an index exists with the same name as the alias",
        "index_uuid": "H8XDS7EvSJuw4ELntKVNbQ",
        "index": "false"
      }
    ],
    "type": "invalid_alias_name_exception",
    "reason": "Invalid alias name [false], an index exists with the same name as the alias",
    "index_uuid": "H8XDS7EvSJuw4ELntKVNbQ",
    "index": "false"
  },
  "status": 400
}

Actualizare editor de la versiunea 2.19.1 la 2.20.1.

```javascript
// webminer.js
import fs                from 'fs'
import path              from 'path'
import superagent        from 'superagent'
import mkdirp            from 'mkdirp'
import { urlToFilename } from './utils.js'

export function webminer (url, cb) {
  const filename = urlToFilename(url);

  // dacă fișierul nu există
  fs.access(filename, err => {
    if (err && err.code === 'ENOENT') {

      // poți purcede la crearea structurii
      console.log(`Downloading ${url} into ${filename}`);

      // descarcă pagina
      superagent.get(url).end((err, res) => {
        if (err) {
          // cb(err);
          return cb(err); // early return principle
        } else {

          // construiește un director al cărui nume va fi numele fișierului
          mkdirp(path.dirname(filename), err => {
            if (err) {
              // cb(err);
              return cb(err);
            } else {

              // scrie fișierul
              fs.writeFile(filename, res.text, err => {
                  if (err) {
                    // cb(err);
                    return cb(err);
                  } else {
                    // apelează callback-ul final
                    cb(null, filename, true);
                  }
              })
            }
          })
        }
      })
    } else {
      // apelează callback-ul final
      cb(null, filename, false);
    }
  });
}

// webminecli.js
import { spider } from './webminer.js'
webminer(process.argv[2], (err, filename, downloaded) => {
  if (err) {
    console.error(err)
  } else if (downloaded) {
    console.log(`Completed the download of "${filename}"`)
  } else {
    console.log(`"${filename}" was already downloaded`)
  }
});
```


Am instalat eslint

eslint --init
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · JSON
Successfully created .eslintrc.json file in /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector



Eroare apărută la ștergerea de un utilizator simplu (video@educred.ro) a unei resurse:

Căile formate sunt:  repo/5eb10e121891c80a029c42c0/433ce46c-1afd-404c-878b-f72a8c8961fa repo/5eb10e121891c80a029c42c0/deleted repo/5eb10e121891c80a029c42c0/deleted/433ce46c-1afd-404c-878b-f72a8c8961fa
Acest id am să incerc să-l șterg. Acum îl caut în Mongoose:  60476a3b59b46c33ae5a5c74

ES7 sniff:  Nicio problemă detectată la inițializare!!! All norminal 👌

[sockets.js::'delresid'] În timpul ștergerii din Elasticsearch, a apărut eroarea ResponseError: illegal_argument_exception


[app.js] A apărul un uncaughtException cu detaliile  index is not defined
[09-03-2021 14:49:08] [error] [undefined]:      ReferenceError: index is not defined
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/sockets.js:637:158
    at onBody (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:335:9)
    at IncomingMessage.onEnd (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:260:11)
    at IncomingMessage.emit (node:events:391:22)
    at endReadableNT (node:internal/streams/readable:1307:12)
    at processTicksAndRejections (node:internal/process/task_queues:81:21)
[09-03-2021 14:49:08] [error] [undefined]:      ReferenceError: index is not defined
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/sockets.js:637:158
    at onBody (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:335:9)
    at IncomingMessage.onEnd (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:260:11)
    at IncomingMessage.emit (node:events:391:22)
    at endReadableNT (node:internal/streams/readable:1307:12)
    at processTicksAndRejections (node:internal/process/task_queues:81:21)
Procesul a fost încheiat având codul:  1



[08-03-2021 13:12:00] [error] [undefined]:      [/util::backupMongo] A apărut o eroare la comanda de ștergerea backup-ului MongoDB  Command failed: mongodump --host localhost --port 27017 --db redcolector --username kosson --password acid77burn --out /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/util/backup-mongodump-2021-3-8
2021-03-08T13:12:00.117+0200    Failed: can't create session: could not connect to server: connection() : auth error: sasl conversation error: unable to authenticate using mechanism "SCRAM-SHA-1": (AuthenticationFailed) Authentication failed.

[08-03-2021 13:12:00] [error] [undefined]:      [/util::backupMongo] A apărut o eroare la comanda de ștergerea backup-ului MongoDB  Command failed: mongodump --host localhost --port 27017 --db redcolector --username kosson --password acid77burn --out /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/util/backup-mongodump-2021-3-8
2021-03-08T13:12:00.117+0200    Failed: can't create session: could not connect to server: connection() : auth error: sasl conversation error: unable to authenticate using mechanism "SCRAM-SHA-1": (AuthenticationFailed) Authentication failed.

^CProcesul a fost întrerupt (CTRL+C). Închid procesul 12759! Data:  2021-03-08T11:33:30.105Z




npm-check -u
? Choose which packages to update. (Press <space> to select)
  
 Patch Update Backwards-compatible bug fixes.
❯◯ bcrypt               5.0.0    ❯  5.0.1    https://github.com/kelektiv/node.bcrypt.js#readme
 ◯ mocha                8.3.0    ❯  8.3.1    https://mochajs.org/
 ◯ mongoose             5.11.13  ❯  5.11.19  https://mongoosejs.com
 ◯ socket.io            3.1.1    ❯  3.1.2    https://github.com/socketio/socket.io#readme
 ◯ socket.io-client     3.1.1    ❯  3.1.2    https://github.com/socketio/socket.io-client#readme
 ◯ autocannon devDep    7.0.4    ❯  7.0.5    https://github.com/mcollina/autocannon#readme
 ◯ autoprefixer devDep  10.2.4   ❯  10.2.5   https://github.com/postcss/autoprefixer#readme
 ◯ webpack devDep       5.24.0   ❯  5.24.3   https://github.com/webpack/webpack
  
 Minor Update New backwards-compatible features.
 ◯ archiver  5.2.0  ❯  5.3.0  https://github.com/archiverjs/node-archiver
 ◯ jquery    3.5.1  ❯  3.6.0  https://jquery.com
  
 Major Update Potentially breaking API changes. Use caution.
 ◯ copy-webpack-plugin devDep  7.0.0  ❯  8.0.0  https://github.com/webpack-contrib/copy-webpack-plugin

După actualizarea lui mongoose la versiunea 5.11.19, problemele nu au dispărut. Am procedat la reinstalarea versiunii 5.11.13.


Actualizare pm2

npm audit
# npm audit report

systeminformation  <5.3.1
Severity: moderate
Command Injection - https://npmjs.com/advisories/1628
fix available via `npm audit fix`
node_modules/systeminformation
  pm2  4.0.0 - 4.5.4
  Depends on vulnerable versions of systeminformation
  node_modules/pm2

2 moderate severity vulnerabilities




Realizarea unui backup automat și la comandă

Am instalat npm install node-cron --save


https://zaiste.net/posts/nodejs-child-process-spawn-exec-fork-async-await/
https://nodejs.org/en/knowledge/child-processes/how-to-spawn-a-child-process/
https://docs.bitnami.com/ibm/apps/lets-chat/administration/backup-restore-mongodb/
https://dev.to/yasseryka/how-to-backup-mongodb-every-night-in-nodejs-257o
https://levelup.gitconnected.com/how-to-set-up-scheduled-mongodb-backups-with-a-bit-of-node-js-b81abebfa20


[app.js] O promisiune a fost respinsă fără a fi tratată respingerea Promise {
  <rejected> ConfigurationError: Missing required parameter: index
      at Client.existsApi [as exists] (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/api/api/exists.js:38:17)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/user.js:83:47
      at Array.map (<anonymous>)
      at model.Query.clbkUsrFind (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/user.js:82:17)
      at callMiddlewareFunction (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:483:23)
      at next (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:194:9)
      at Kareem.execPost (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:218:3)
      at _cb (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:308:15)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/query.js:4435:12
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/helpers/query/completeMany.js:35:39
      at processTicksAndRejections (node:internal/process/task_queues:76:11)
}  având motivul ConfigurationError: Missing required parameter: index
[04-03-2021 14:21:37] [error] [undefined]:      [object Promise] ConfigurationError: Missing required parameter: index
[04-03-2021 14:21:37] [error] [undefined]:      [object Promise] ConfigurationError: Missing required parameter: index


[app.js] O promisiune a fost respinsă fără a fi tratată respingerea Promise {
  <rejected> ConfigurationError: Missing required parameter: index
      at Client.existsApi [as exists] (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/api/api/exists.js:38:17)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/user.js:83:47
      at Array.map (<anonymous>)
      at model.Query.clbkUsrFind (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/user.js:82:17)
      at callMiddlewareFunction (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:483:23)
      at next (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:194:9)
      at Kareem.execPost (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:218:3)
      at _cb (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:308:15)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/query.js:4435:12
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/helpers/query/completeMany.js:35:39
      at processTicksAndRejections (node:internal/process/task_queues:76:11)
}  având motivul ConfigurationError: Missing required parameter: index
[04-03-2021 14:21:37] [error] [undefined]:      [object Promise] ConfigurationError: Missing required parameter: index
[04-03-2021 14:21:37] [error] [undefined]:      [object Promise] ConfigurationError: Missing required parameter: index
[app.js] O promisiune a fost respinsă fără a fi tratată respingerea Promise {
  <rejected> ConfigurationError: Missing required parameter: index
      at Client.existsApi [as exists] (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/api/api/exists.js:38:17)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/user.js:83:47
      at Array.map (<anonymous>)
      at model.Query.clbkUsrFind (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/user.js:82:17)
      at callMiddlewareFunction (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:483:23)
      at next (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:194:9)
      at Kareem.execPost (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:218:3)
      at _cb (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:308:15)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/query.js:4435:12
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/helpers/query/completeMany.js:35:39
      at processTicksAndRejections (node:internal/process/task_queues:76:11)
}  având motivul ConfigurationError: Missing required parameter: index
[04-03-2021 14:21:37] [error] [undefined]:      [object Promise] ConfigurationError: Missing required parameter: index
[04-03-2021 14:21:37] [error] [undefined]:      [object Promise] ConfigurationError: Missing required parameter: index
[app.js] O promisiune a fost respinsă fără a fi tratată respingerea Promise {
  <rejected> ConfigurationError: Missing required parameter: index
      at Client.existsApi [as exists] (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/api/api/exists.js:38:17)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/user.js:83:47
      at Array.map (<anonymous>)
      at model.Query.clbkUsrFind (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/user.js:82:17)
      at callMiddlewareFunction (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:483:23)
      at next (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:194:9)
      at Kareem.execPost (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:218:3)
      at _cb (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:308:15)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/query.js:4435:12
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/helpers/query/completeMany.js:35:39
      at processTicksAndRejections (node:internal/process/task_queues:76:11)
}  având motivul ConfigurationError: Missing required parameter: index
[04-03-2021 14:21:37] [error] [undefined]:      [object Promise] ConfigurationError: Missing required parameter: index
[04-03-2021 14:21:37] [error] [undefined]:      [object Promise] ConfigurationError: Missing required parameter: index
Procesul a fost încheiat având codul:  1








Update-uri și probleme februarie

 Patch Update Backwards-compatible bug fixes.
 ◉ handlebars           4.7.6    ❯  4.7.7    http://www.handlebarsjs.com/
❯◯ isomorphic-git       1.8.0    ❯  1.8.1    https://isomorphic-git.org/
 ◯ mongoose             5.11.13  ❯  5.11.17  https://mongoosejs.com
 ◯ pm2                  4.5.1    ❯  4.5.4    http://pm2.keymetrics.io/
 ◯ socket.io            3.1.0    ❯  3.1.1    https://github.com/socketio/socket.io#readme
 ◯ socket.io-client     3.1.0    ❯  3.1.1    https://github.com/socketio/socket.io-client#readme
 ◯ autocannon devDep    7.0.3    ❯  7.0.4    https://github.com/mcollina/autocannon#readme
 ◯ autoprefixer devDep  10.2.3   ❯  10.2.4   https://github.com/postcss/autoprefixer#readme
  
 Minor Update New backwards-compatible features.
 ◯ @elastic/elasticsearch  7.10.0  ❯  7.11.0  http://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
 ◯ connect-redis           5.0.0   ❯  5.1.0   https://github.com/visionmedia/connect-redis#readme
 ◯ mocha                   8.2.1   ❯  8.3.0   https://mochajs.org/
 ◯ webpack devDep          5.18.0  ❯  5.24.0  https://github.com/webpack/webpack
 ◯ webpack-cli devDep      4.4.0   ❯  4.5.0   https://github.com/webpack/webpack-cli#readme
 
  Non-Semver Versions less than 1.0.0, caution.
❯◉ querystring  0.2.0  ❯  0.2.1  https://github.com/Gozala/querystring#readme


Update-ul la mongoose 5.11.13  ❯  5.11.17  https://mongoosejs.com introoduce: (node:19593) Warning: Accessing non-existent property 'MongoError' of module exports inside circular dependency.
Am revenit la versiunea anterioară 5.11.13. Vezi: https://github.com/Automattic/mongoose/issues/9900





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
 ◯ node-sass devDep            4.14.1  ❯  5.0.0   https://github.comrăpădit în 1985, la vârsta de 54 de ani. O coincidenţă stranie face ca ziua de naştere a lui Toma Caragiu, 21 august, să fie data la care Marin Moraru a urcat la Ceruri./sass/node-sass
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
De aprofundat: https://www.nginx.com/blog/nginx-nodejs-websockets-socketio/. Când va fi la serverul Nginx, o posibilă configurare ar putea fi
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

Helmet introduce un nou nivel de protecție: Content Security Policy. Pentru versiunea noă, acest nivel nu va fi implementat pentru că browserele au comportament diferit.

DataTables warning: table id=DataTables_Table_0 - 
Requested unknown parameter 'googleProfile.name' for row 3, column 5. For more information about this error, please see http://datatables.net/tn/4


Probleme de indexare

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
