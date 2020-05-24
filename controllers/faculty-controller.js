
const Faculty = require("../models/faculty");
const Course = require('../models/course');
const Program = require('../models/program');


//provide create class page.
exports.getCreateClass = (req, res, next) => {
    const message = '';
    Program.find({}).exec()
        .then((programs) => {
            if (!programs)
                message = message + 'No Programs! '

            Course.find({}).exec()
                .then((courses) => {
                    if (!courses) {
                         message = message + 'No Courses!'
                    }
                    res.render('createClass', {
                        message: message + "OK",
                        courses: courses,
                        programs: programs,
                    })
                })
                .catch((err) => {
                    console.log(err);
                    res.render('noData', {
                        message: "Opps!Something's Wrong! Please Try again later."
                    })
                })
        })
        .catch((err) => {
            console.log(err);
            res.render('noData', {
                message: "Opps!Something's Wrong! Please Try again later."
            })
        })
}

//create class in the Database.
exports.createClass = (req, res, next) => {

    const id = req.body.fid;
    const programId = req.body.fprogram;
    const courseId = req.body.fcourse;
    //make sure that the entry is unique.
    Faculty.findByIdAndUpdate(id,
        {
            $push: {
                classes: [{
                    program: programId,
                    course: courseId
                }]
            }
        })
        .then(result => {
            console.log("Class Created  -> " + programId + ' : ' + courseId);
            //this.getProgramDetails(req, res, next);
            res.redirect('listClasses');
        })
        .catch(error => {
            console.log(`Error Creating Class : ${error.message}`);
        });
};


//provide create class page.
exports.getListClass = (req, res, next) => {
    let message = null;
    const id = req.user._id;

    Faculty.findByIdAndUpdate(id)
        .then(classes => {
            if (!classes)
                message = 'No Classes! '
            console.log(classes);
            res.render('listClass', { classes: classes.classes });
        })
        .catch(error => {
            console.log(`Error Fetching Class : ${error.message}`);
            message = "Opps! Something's wrong! Please try again later."
            res.render('noData', { message : message })
        });
    // Program.find({}).exec()
    //     .then((programs) => {
    //         if (!programs)
    //             message = message + 'No Programs! '

    //         Course.find({}).exec()
    //             .then((courses) => {
    //                 if (!courses) {
    //                     message = message + 'No Courses!'
    //                 }
    //                 res.render('createClass', {
    //                     message: message + "OK",
    //                     courses: courses,
    //                     programs: programs,
    //                 })
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //                 res.render('noData', {
    //                     message: "Opps!Something's Wrong! Please Try again later."
    //                 })
    //             })
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         res.render('noData', {
    //             message: "Opps!Something's Wrong! Please Try again later."
    //         })
    //     })
}

exports.getDetailsClass = (req, res, next) => {

    let message = null;
    const id = req.user._id;
    const classId =  req.params.id
    Faculty.find({"_id":id})
        .then(mClass => {
            if (!mClass) {
                console.log(mClass);
                message = 'No Classes'
            }
            // const mClasses = mClass
            // for (let x of mClass.classes)
            // {
            //     if (x._id === classId.iid)
            //         console.log(x);
            // }
            // console.log("Over");

            // console.log("RES : ",mClasses);

            res.render('classDetails', {
                mClass: {
                    fid:id,
                    cid: classId,
                    program: "MScIt",
                    course: "C++",
                    topics: ["Pointers", "Array", "Memory"]
                }
            });
        })
        .catch(error => {
            console.log(`Error Fetching Class : ${error.message}`);
            message = "Opps! Something's wrong! Please try again later."
            res.render('noData', { message: message })
        });
}

exports.listTopics = (req, res, next) => {
    res.render('listTopics', {
        mClass: {
            program: "MScIT",
            course: "C++",
            topics: ["Pointers", "Array", "Memory"]
        }
    })
}

exports.getCreateTopic = (req, res, next) => {
    res.render('createTopic', {
        mClass: {
            program: "MScIT",
            course: "C++",
        }
    })
}

exports.createTopic = (req, res, next)=>{
    //code for adding data in the database.
}