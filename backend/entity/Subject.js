const mongoose = require ("mongoose")
const AutoIncrement = require("mongoose-sequence")(mongoose)
const{ Schema}= mongoose

const subjectSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    hours:{
        type: String,
        require: true
    }
},

{timesstamps: true})

const Subject = mongoose.model("Subject", subjectSchema)
module.exports = {
    Subject, 
    subjectSchema,
}