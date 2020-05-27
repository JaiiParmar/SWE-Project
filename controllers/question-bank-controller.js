

const Faculty = require("../models/faculty");
const Question = require("../models/question");

//***********************************************************************************/
/** C-R-U-D Questions... */
//***********************************************************************************/

exports.getCreateQuestion = (req, res, next) => {

    let message = null;
    const id = req.user._id;
    const classId = req.params.classId

    Faculty.findById(id)
        .then(mClass => {
            if (!mClass) {
                console.log(mClass);
                message = 'No Classes'
            }
            let mmClass = null;
            for (let i = 0; mClass.classes[i]; i++) {
                if (String(mClass.classes[i]._id) === classId)
                    mmClass = mClass.classes[i];
            }
            res.render('AddQuestion', {
                mClass: {
                    classId: classId,
                    program: mmClass.program,
                    course: mmClass.course,
                    topics: mmClass.topics,
                }
            });
        })
        .catch(error => {
            console.log(`Error Fetching Class : ${error.message}`);
            message = "Opps! Something's wrong! Please try again later."
            res.render('noData', { message: message })
        });
}




exports.createQuestion = (req, res, next) => {
    console.log("Question Created");
    //console.log(req.body);
    const facId = req.user._id;
    const programId = req.body.programId;
    const courseId = req.body.courseId;
    const classId = req.body.classId;
    const topic = req.body.mtopic;
    const difficutly = req.body.level;
    const mark = req.body.marks;
    const type = req.body.type;
    const question = req.body.question;
    const note = req.body.note;
    const answer = req.body.answer;
    const op1 = req.body.option1;
    const op2 = req.body.option2;
    const op3 = req.body.option3;
    const op4 = req.body.option4;
    const options = [];

    console.log(topic);

    if (type !== 'theory') {
        if (type === 'true/false') {
            options.push('true');
            options.push('false')
        }
        else if (type === 'yes/no') {
            options.push('yes');
            options.push('no')
        }
        else {
            options.push(op1);
            options.push(op2);
            options.push(op3);
            options.push(op4);
        }
    }

    const mQuestion = new Question({
        class: classId,
        faculty: facId,
        program: programId,
        course: courseId,
        topic: topic,
        text: question,
        note: note,
        difficulty: difficutly,
        mark: mark,
        type: type,
        options: options,
        answer: answer,
    })
    // console.log(mQuestion);

    mQuestion.save((err) => {
        message = null;
        if (err) {
            console.log(`Error Fetching Class : ${err.message}`);
            message = "Opps! Something's wrong! Please try again later."
            res.render('noData', { message: message })
        }
        console.log("Question Added!");

        this.getCreateQuestion(req, res, next);//temp.................
    });
}


exports.getListQuestions = (req, res, next) => {
    let message = null;
    const classId = req.params.classId;
    Question.find({class:classId})
        .then(mQuestions => {
            if (!mQuestions) {
                console.log(mQuestions);
                message = 'No Questions'
            }
            console.log(mQuestions[3].options);

            // res.render('listQuestions', {
            //     mQuestions: mQuestions
            // });
            res.render('listQuestions', {
                 mQuestions: mQuestions
            });
        })
        .catch(error => {
            console.log(`Error Fetching Class : ${error.message}`);
            message = "Opps! Something's wrong! Please try again later."
            res.render('noData', { message: message })
        });
}

exports.getDetailsQuestions = (req, res, next) => {

    const questionId = req.params.questionId;
    const facId = req.user._id;
    let topics = null;
    Question.findById(questionId)
        .then(mQuestion => {
            if (!mQuestion) {
                console.log(mQuestion);
                message = 'No Classes'
            }
            console.log(mQuestion);
            //find class and return topics
            Faculty.findById(facId)
                .then(mClass => {
                    if (!mClass) {
                        console.log(mClass);
                        message = 'No Classes'
                    }
                    let mmClass = null;
                    for (let i = 0; mClass.classes[i]; i++) {
                        if (String(mClass.classes[i]._id) === mQuestion.class)
                            mmClass = mClass.classes[i];
                    }

                    res.render('questionDetails', {
                        mQuestion: mQuestion, mTopics: mmClass.topics
                    })
                })
                .catch(error => {
                    console.log(`Error Fetching Class : ${error.message}`);
                    message = "Opps! Something's wrong! Please try again later."
                    res.render('noData', { message: message })
                });
        })
        .catch(error => {
            console.log(`Error Fetching Class : ${error.message}`);
            message = "Opps! Something's wrong! Please try again later."
            res.render('noData', { message: message })
        });
}


exports.updateQuestion = (req, res, next) => {
    console.log("Updating... ");

    const questionId = req.params.questionId;
    const classId = req.body.classId;
    //const topic = req.body.mtopic;
    // const difficutly = req.body.level;

    const type = req.body.type;
    const mark = req.body.marks;
    const question = req.body.question;
    const note = req.body.note;
    const answer = req.body.answer;
    const op1 = req.body.option1;
    const op2 = req.body.option2;
    const op3 = req.body.option3;
    const op4 = req.body.option4;
    const options = [];


    if (type !== 'theory') {
        if (type === 'true/false') {
            options.push('true');
            options.push('false')
        }
        else if (type === 'yes/no') {
            options.push('yes');
            options.push('no')
        }
        else {
            options.push(op1);
            options.push(op2);
            options.push(op3);
            options.push(op4);
        }
    }
    Question.findByIdAndUpdate(questionId, {
        $set: {
                text: question,
                note: note,
                mark: mark,
                options: options,
                answer: answer,
        }
    })
        .then(result => {
            console.log("Question Updated!");
            res.redirect('/listQuestions/'+classId)
        })
        .catch(error => {
            console.log(`Error Fetching Class : ${error.message}`);
            message = "Opps! Something's wrong! Please try again later."
            res.render('noData', { message: message })
        });
}


exports.deleteQuestion = (req, res, next) => {

    const questionId = req.params.questionId;
    const classId = req.params.classId;

    Question.findByIdAndDelete(questionId)
        .then(result => {
            console.log("Question Updated!");
            res.redirect('/listQuestions/' + classId)
        }).catch(error => {
            console.log(`Error Fetching Class : ${error.message}`);
            message = "Opps! Something's wrong! Please try again later."
            res.render('noData', { message: message })
        });
}


