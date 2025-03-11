const main = require("../database/conn")
const mongoose = require ("mongoose")
const {Subject: SubjectModel} = require("../entity/Subject")

const subjectController = {
    create: async (req, res) => {
        try{
            const subject = {
                name: req.body.name,
                hours: req.body.hours,
            }
            const response = await SubjectModel.create(subject)
            res.status(201).json({response, msg: "Disciplina cadastrada"})
        }catch(error){
            console.error(error)
            res.status(500).json({error: "Erro ao cadastrar disciplina"})
        }
    },
    readAll: async(req, res) =>{
        let results = await SubjectModel.find({});
        res.send(results).status(200)
    },
    delete: async(req, res) => {
        try{
            const id = mongoose.Types.ObjectId.createFromHexString(req.params.id);
            let results = await SubjectModel.deleteOne({_id: id});
            res.send(results).status(200);
        }catch (error){
            console.log(error)
        }
    },
    update: async(req, res)=>{
        try {
            const id = mongoose.Types.ObjectId.createFromHexString(req.params.id);
            const subject = {
                name: req.body.name,
                hours: req.body.hours,
            }
            let results = await SubjectModel.updateOne({_id: id},{$set: subject});   
            res.send(results).status(200); 
        } catch (error) {
            console.log(error);
        }
     },
}

module.exports = subjectController