{const mongoose = require ("mongoose")
const AutoIncrement = require("mongoose-sequence")(mongoose)
const bcrypt = require("bcryptjs");
const{ Schema}= mongoose

const studentSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
   
    birthdate:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    course:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }

},

{timesstamps: true})

//Criptografa a senha antes de ser salva no banco 
studentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const Student = mongoose.model("Student", studentSchema);
module.exports = {
    Student, 
    studentSchema,
}}