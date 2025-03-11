const mongoose = require ("mongoose")
const AutoIncrement = require("mongoose-sequence")(mongoose)
const Student = require("./Student"); 
const Subject = require("./Subject");
const{ Schema}= mongoose

const enrollmentSchema = new Schema({
    student: { 
        type: mongoose.Schema.Types.ObjectId,   
        ref: "Student",
        required: true
    }, 
    subject: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Subject",
        required: true
    }
},

{timesstamps: true})

const Enrollment = mongoose.model("Enrollment", enrollmentSchema)
module.exports = {
    Enrollment, 
    enrollmentSchema,
}