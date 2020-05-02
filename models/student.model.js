const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    user: {
        type: mongoose.Types.Schema.ObjectId,
        ref: 'user',
    },
    program: {
        type: mongoose.Types.Schema.ObjectId,
        ref:'program'
    },
    batch:{
        type: Date,
    },
});

//Export model
module.exports = mongoose.model("student", studentSchema);
