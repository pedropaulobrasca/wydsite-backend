const events = require('events');
const fs = require('fs');
const path = require('path');

const emitter = new events();
const date = new Date();
var dia     = date.getDate();           // 1-31
var mes     = date.getMonth();          // 0-11 (zero=janeiro)
var ano4    = date.getFullYear();       // 4 dígitos
var hora    = date.getHours();          // 0-23
var min     = date.getMinutes();        // 0-59
var seg     = date.getSeconds();        // 0-59

emitter.on('log', (message, ip) => {
    fs.appendFile(path.join(__dirname, 'errors.log'), `[${dia}/${mes}/${ano4} - ${hora}:${min}:${seg}] | [${ip}]: ` + message + '\n', (err) => {
        if (err) throw err;
    })
});

function log(message) {
    emitter.emit('log', message);
}

module.exports = log;