const jsonSend = require('./json-send/index.js');
module.exports = (app) => {
    app.use(jsonSend());
}