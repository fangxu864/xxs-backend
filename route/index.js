const Router = require("koa-router");
let router = new Router();


const controller = require("../controller");



  
router.get("/fangxu", controller.fangxu);
router.get("/", controller.main);
router.get("/userset", controller.user.set);
router.get("/userget", controller.user.get);


module.exports = router;