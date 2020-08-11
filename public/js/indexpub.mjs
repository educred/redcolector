import {socket} from './main.mjs';

// TESTAREA CONEXIUNII
// console.log('Socket sniff: ', {
//     detalii: socket.json
// });

setInterval(() => {
    socket.emit('testconn', 'test');
}, 2000);