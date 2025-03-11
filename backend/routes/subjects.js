const router = require("express").Router()
const subjectController = require("../controller/subjectController");

router.route("/subjects").post((req, res)=>
    subjectController.create(req, res));

router.route("/subjects/all").get((req, res)=>
    subjectController.readAll(req, res));

router.route("/subjects/delete/:id").post((req, res)=>
    subjectController.delete(req, res));

router.route("/subjects/edit/:id").post((req, res)=> 
    subjectController.update(req,res));

module.exports=router;