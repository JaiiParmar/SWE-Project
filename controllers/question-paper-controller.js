const Question = require("../models/question");
const Faculty  = require("../models/faculty")
const QuestionPaper = require("../models/questionPaper");

exports.getGenerateQuestionPaper = (req, res, next) => {
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

            res.render('generateQuestionPaper', {
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




exports.generateQuestionPaper = (req, res, next) => {

    console.log("Generating Questiona Paper");

    let message = null;
    const classId = req.params.classId;

    const topics = req.body.mTopics;
    console.log(topics);

    const types = req.body.mTypes;
    console.log(types);

    let nEasy = req.body.nEasy;
    let nMedium = req.body.nMedium;
    let nHard = req.body.nHard;
    console.log(nEasy, nMedium, nHard);

    // const type = [1]
    // type.length = 0;

    // if (String(req.body.type) !== 'theoryoptional') {
    //     if (String(req.body.type) === "theory")
    //         type.push('theory');
    //     else {
    //         type.push('mcq');
    //         type.push('yes/no');
    //         type.push('true/false');
    //     }
    // }
    // else {
    //     type.push('theory');
    //     type.push('mcq');
    //     type.push('yes/no');
    //     type.push('true/false');
    // }
    Question.find({ class: classId, topic:{$in:topics}, type: {$in:types}})
        .then(mQuestions => {
            if (!mQuestions) {
                console.log(mQuestions);
                message = 'No Questions'
            }
            //An array to store final question that meets with the requirements...
            const finalQuestions = [mQuestions[0]]
            finalQuestions.length = 0;
            //console.log(mQuestions);
            console.log(typeof mQuestions);
            console.log(typeof finalQuestions);

            //From all the fetched questions...
            //Select number of Easy, Medium, Hard...
            for (let i = 0; mQuestions[i]; i++) {
                if (nEasy || nMedium || nHard) {
                    if ((mQuestions[i].difficulty === 'easy') && nEasy > 0) {
                        nEasy--;
                        finalQuestions.push(mQuestions[i]);
                    }
                    else if ((mQuestions[i].difficulty === 'medium') && nMedium > 0) {
                        nMedium--;
                        finalQuestions.push(mQuestions[i]);
                    }
                    else if ((mQuestions[i].difficulty === 'hard') && nHard > 0){
                        nHard--;
                        finalQuestions.push(mQuestions[i]);
                    }
                }
                else {
                    break;
                }
            }
            //console.log(finalQuestions);
            //console.log("Rendering the Questions...");

            res.render('questionPaper', {
                mQuestions: finalQuestions
            });
        })
        .catch(error => {
            console.log(`Error Fetching Class : ${error.message}`);
            message = "Opps! Something's wrong! Please try again later."
            res.render('noData', { message: message })
        });
}