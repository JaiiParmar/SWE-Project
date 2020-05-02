const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const programSchema = new Schema({
    //if want to provide program code?
    name: {
        type: String,
        maxlength: 50,
        required: true,
    },
    duration: {
        type: Number,
        min: 1,
        max: 5,
        defualt: 1,
    },
    active: {
        type: Boolean,
        defualt: true
    },
    created_at: {
        type: Date,
        default: Date.now(),
    }
});

//Export model
module.exports = mongoose.model('program', programSchema);
