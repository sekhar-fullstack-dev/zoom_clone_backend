const JSEncrypt = require('node-jsencrypt');
require('dotenv').config();

function encrypt(text) {
    const crypt = new JSEncrypt();
    crypt.setKey(process.env.PUBLICKEY);
    return crypt.encrypt(text);
}

function decrypt(encrypted) {
    const crypt = new JSEncrypt();
    crypt.setPrivateKey(process.env.PRIVATEKEY);
    return crypt.decrypt(encrypted);
}

var eText = encrypt("Hello, world!");

console.log(eText);
console.log(decrypt(eText));