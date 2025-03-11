const router = require("express").Router()
const studentController = require("../controller/studentController");

router.route("/students").post((req, res)=>
    studentController.create(req, res));

router.route("/students/all").get((req, res) => 
    studentController.readAll(req, res));

router.route("/students/delete/:id").post((req, res) => 
    studentController.delete(req, res));

router.route("/students/:id").get((req, res)=> 
    studentController.readOne(req,res));

router.route("/students/edit/:id").post((req, res)=> 
    studentController.update(req,res));

module.exports=router;