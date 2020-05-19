const mongoose = require('mongoose');
const Program = require('../models/program');

const url = 'mongodb://localhost:27017/paper_generator';

mongoose.connect(url, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


function addProgram() {
    const mscit = new Program({
        name: "MScIt",
    });

    mscit.save((err) => {
        if (err) {
            console.log(err);

            console.log("ERROR CREATING Program: " + mscit);
            return;
        }
        console.log("New User Created.: " + mscit);
        return;
    });
}