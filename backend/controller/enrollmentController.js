const main = require("../database/conn")
const mongoose = require ("mongoose")
const {Enrollment: EnrollmentModel} = require("../entity/Enrollment")
const {Student: StudentModel} = require("../entity/Student")
const {Subject: SubjectModel} = require("../entity/Subject")

const enrollmentController = {
    create: async (req, res) => {
        try {
            const studentId = mongoose.Types.ObjectId.createFromHexString(req.params.id);  
            const subjectId = mongoose.Types.ObjectId.createFromHexString(req.body.subjectId);

            const enrollment = {
                student: studentId,
                subject: subjectId
            };

            let results = await EnrollmentModel.create(enrollment);   
            res.status(200).send(results);
        } catch (error) {
            console.error("Erro ao criar matrícula:", error);
            res.status(500).json({ message: "Erro ao criar matrícula.", error: error.message });
        }
    },
    delete: async(req, res) => {
        try {
            const enrollmentId = mongoose.Types.ObjectId.createFromHexString(req.params.id);
            let results = await EnrollmentModel.deleteOne({ _id: enrollmentId });
            res.status(200).send(results);
        } catch (error) {
            console.error("Erro ao deletar matrícula:", error);
            res.status(500).json({ message: "Erro ao deletar matrícula.", error: error.message });
        }
    },
    readOne: async(req, res) =>{
        try {
            const studentId = mongoose.Types.ObjectId.createFromHexString(req.params.id);
    
            console.log("Recebendo solicitação para studentId:", studentId);

        if (!studentId) {
            return res.status(400).json({ message: "ID do estudante não foi fornecido." });
        }

        // Busca todas as matrículas associadas ao estudante
        const enrollments = await EnrollmentModel.find({ student: studentId })
            .populate("subject");

        console.log("📌 Matrículas encontradas:", enrollments);

        // Se não houver matrículas, retorna erro 404
        if (!enrollments || enrollments.length === 0) {
            return res.status(404).json({ message: "Nenhuma matrícula encontrada para este estudante." });
        }

        // Extrai as disciplinas vinculadas às matrículas
        const subjects = enrollments.map(enrollment => ({
            _id: enrollment._id,  // ID da matrícula
            subject: enrollment.subject // Dados da disciplina associada
        }));

        return res.status(200).json({ subjects });

    } catch (error) {
        console.error("Erro ao buscar matrículas:", error);
        return res.status(500).json({ message: "Erro ao buscar matrículas.", error: error.message });
    }
    }
}

module.exports = enrollmentController