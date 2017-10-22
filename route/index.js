const Router = require("koa-router");
let router = new Router({
    // prefix: "/xxs"
});


const controller = require("../controller");



  
router.get("/fangxu", controller.fangxu);
router.get("/", controller.main);
router.get("/userset", controller.user.set);
router.get("/userget", controller.user.get);
router.post("/xxs/login", controller.login.login);
router.post("/xxs/publish", controller.publish.publish);


module.exports = router;