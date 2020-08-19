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
