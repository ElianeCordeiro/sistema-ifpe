const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const {Student: StudentModel} = require("../entity/Student")

const loginController = {
    login: async(req, res) => {
        try{

            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "Email e senha são obrigatórios" });
            }

            const student = await StudentModel.findOne({ email });

            if (!student) {
                return res.status(404).json({ error: "Estudante não encontrado" });
            }
// Verificar se a senha existe
if (!student.password) {
    return res.status(500).json({ error: "Erro interno: senha não encontrada no banco" });
}
            const passwordMatch = await bcrypt.compare(password, student.password);

            if (!passwordMatch) {
                return res.status(401).json({ error: "Senha incorreta" });
            }

            const response = {
                name: student.name,
                email: student.email,
                phone: student.phone,
                course: student.course,
                studentId: student._id
            };
            

            res.status(200).json({ message: "Login realizado com sucesso", response });
        } catch(error){
            console.error(error);
            res.status(404).json( "Login ou senha incorretos");
        }
    }
}


module.exports = loginController