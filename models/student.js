const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    _id: {
        type: String,
        ref: 'user',
    },
    program: {
        type: String,
        ref:'program'
    },
    batch:{
        type: Date,
    },
});

//Export model
module.exports = mongoose.model("student", studentSchema);
