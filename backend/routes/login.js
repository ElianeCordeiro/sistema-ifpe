const router = require("express"). Router()
const loginController = require("../controller/loginController");

router.route("/login").post((req, res)=>
    loginController.login(req, res));

module.exports=router;