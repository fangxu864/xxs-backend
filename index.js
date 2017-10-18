
const Koa = require('koa');
const app = new Koa();
const router = require("./route");
const mongodb = require("./mongodb");

mongodb.connect();

app
.use(router.routes())
.use(router.allowedMethods())

app.listen(3000);
