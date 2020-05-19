const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facultySchema = new Schema({
    user_info: {
        type: String,
        ref: 'user',
    },
    teaches_in: [
            {
                program: {
                    type: String,
                    ref: 'program',
                    default: null,
                },
                courses: [
                    {
                        type: String,
                        ref: 'course',
                        unique: true,
                        default: null,
                    }
                ],
            },
        ],
});

//Export model
module.exports = mongoose.model('faculty', facultySchema);


