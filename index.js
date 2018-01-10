
const Koa = require('koa');
const app = new Koa();
const router = require("./route");
const mongodb = require("./mongodb");
const koaBody = require('koa-body') // post body 解析
const middleWare = require("./middleware/index.js");

middleWare(app); //使用中间件

mongodb.connect();

app.use(koaBody());

app
.use(router.routes())
.use(router.allowedMethods())

app.listen(3002);
