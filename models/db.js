const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/paper_generator',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (!err)
            console.log('MongoDb Connection Successful')
        else
            console.log("Error in connection " + err)
});

require('./user');
require('./course');
require('./faculty');
require('./program');
require('./question');
require('./questionPaper');
require('./student');