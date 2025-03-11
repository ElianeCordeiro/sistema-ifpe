const router = require("express").Router()
const enrollmentController = require("../controller/enrollmentController");

router.route("/enrollments/:id").post((req, res)=> 
    enrollmentController.create(req,res));

router.route("/enrollments/delete/:id").post((req, res)=> 
    enrollmentController.delete(req,res));

router.route("/enrollments/:id").get((req, res) =>
    enrollmentController.readOne(req, res));

module.exports=router;