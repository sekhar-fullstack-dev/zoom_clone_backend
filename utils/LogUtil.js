const ShortUniqueID = require('short-unique-id');
const uid = new ShortUniqueID({length:10});

const log = (code, err) => {
    const error_code = uid();
    console.log(`${error_code} : ${err}`);
    return {'code':code, res:{'msg':'internal server error', 'error_code':error_code}};
}

module.exports = log;