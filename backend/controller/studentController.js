const main = require("../database/conn")
const mongoose = require ("mongoose")
const bcrypt = require("bcryptjs");
const {Student: StudentModel} = require("../entity/Student")

const studentController = {
    create: async (req, res) => {
        try{
            const student = {
                name: req.body.name,
                phone: req.body.phone,
                birthdate: req.body.birthdate,
                email: req.body.email,
                course: req.body.course,
                address: req.body.address,
                password: req.body.password
            }
            const response = await StudentModel.create(student);

            const studentData = {
                name: response.name,
                email: response.email,
                phone: response.phone,
                course: response.course,
                studentId: student._id
            };

            res.status(201).json({studentData, msg: "Aluno cadastrado"});
        }catch(error){
            console.error(error)
            res.status(500).json({error: "Erro ao cadastrar aluno"});
        }
    },
    readAll: async(req, res) =>{
        let results = await StudentModel.find({}).select("-password");;
        res.send(results).status(200);
    },
    delete: async(req, res) => {
        try{
            const id = mongoose.Types.ObjectId.createFromHexString(req.params.id);
            let results = await StudentModel.deleteOne({_id: id});
            res.send(results).status(200);
        }catch (error){
            console.log(error)
        }
    },
    readOne: async(req, res)=>{
        try {
            const id = mongoose.Types.ObjectId.createFromHexString(req.params.id);
            let results = await StudentModel.findOne({_id: id}).select("-password");;   
            res.send(results).status(200); 
        } catch (error) {
            console.log(error);
        }
     },
 
     update: async(req, res)=>{
        try {
            const id = mongoose.Types.ObjectId.createFromHexString(req.params.id);
            const updateStudent = { ...req.body }; // Copia os dados recebidos

            // Se a senha for alterada, criptografa antes de salvar
            if (updateStudent.password) {
                updateStudent.password = await bcrypt.hash(updateStudent.password, 10);
            }
            let results = await StudentModel.updateOne({_id: id},{$set: updateStudent});   
            res.send(results).status(200); 
        } catch (error) {
            console.log(error);
        }
     },
}

module.exports = studentController