
const Faculty = require("../models/faculty");
const Course = require('../models/course');
const Program = require('../models/program');




//***********************************************************************************/
/** C-R-U-D Class and Topics */
//***********************************************************************************/


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

//create class in the Database by Updating the faculty table..
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

}


//provide List class page.
exports.getListClass = (req, res, next) => {

    let message = null;
    const id = req.user._id;    //user Id.

    Faculty.findById(id)
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
}


//get Class Details...
exports.getDetailsClass = (req, res, next) => {

    let message = null;
    const id = req.user._id;
    const classId = req.params.id

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
            res.render('classDetails', {
                mClass: {
                    fid:id,
                    cid: classId,
                    program: mmClass.program,
                    course: mmClass.course,
                    topics:mmClass.topics,
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

    let message = null;
    const id = req.user._id;
    const classId = req.params.cid

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
            res.render('listTopics', {
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

exports.getCreateTopic = (req, res, next) => {
    const id = req.user._id;
    const classId = req.params.cid;
    Faculty.findById(id)
        .then(mClass => {
            if (!mClass) {
                console.log(mClass);
                message = 'No Classes'
            }
            let program = null;
            let course = null;
            for (let i = 0; mClass.classes[i]; i++) {
                if (String(mClass.classes[i]._id) === classId) {
                    program = mClass.classes[i].program;
                    course = mClass.classes [i].course;
                }
            }

            res.render('createTopic', {
                mClass: {
                    classId: classId,
                    program: program,
                    course: course
                }
            })
        })
        .catch(error => {
            console.log(`Error Fetching Class : ${error.message}`);
            message = "Opps! Something's wrong! Please try again later."
            res.render('noData', { message: message })
        });
}
exports.createTopic = (req, res, next)=>{
    //code for adding data in the database.

    const id = req.user._id
    const classId = req.params.cid
    const topic = req.body.tname

    //make sure that the entry is unique.
    Faculty.updateOne({ "_id": id, "classes._id": classId },
        {
            "$push": {
                "classes.$.topics": topic
            }
        }
    )
        .then(result => {
            console.log("Topic Added  -> " + topic);
            //this.getProgramDetails(req, res, next);
            const mRoutes ='/listTopics/' + classId
            res.redirect(mRoutes);
        })
        .catch(error => {
            console.log(`Error Creating Class : ${error.message}`);
        });
}

exports.getTopicDetails = (req, res, next) => {
    const id = req.user._id;
    const classId = req.params.cid;
    const topic = req.params.tid;

    Faculty.findById(id)
        .then(mClass => {
            if (!mClass) {
                console.log(mClass);
                message = 'No Classes'
            }
            let program = null;
            let course = null;
            for (let i = 0; mClass.classes[i]; i++) {
                if (String(mClass.classes[i]._id) === classId) {
                    program = mClass.classes[i].program;
                    course = mClass.classes [i].course;
                }
            }
            res.render('topicDetails', {
                mTopic: {
                    classId: classId,
                    program: program,
                    course: course,
                    topic:topic
                }
            })
        })
        .catch(error => {
            console.log(`Error Fetching Class : ${error.message}`);
            message = "Opps! Something's wrong! Please try again later."
            res.render('noData', { message: message })
        });
}


exports.updateTopic = (req, res, next) => {
    const id = req.user._id
    const classId = req.params.cid
    const topic = req.params.tid
    const newTopic = req.body.tname
    console.log(topic, newTopic);

        Faculty.updateOne({ "_id": id, "classes._id": classId },
            {
                "$pull": {
                    "classes.$.topics": topic
                }
            }
        )
        .then(result => {
            //make sure that the entry is unique.
            Faculty.updateOne({ "_id": id, "classes._id": classId },
                {
                    "$push": {
                        "classes.$.topics": newTopic
                    }
                }
            )
            .then(result => {
                this.listTopics(req, res, next);
            })
            .catch(error => {
                console.log(`Error Creating Class : ${error.message}`);
            });
        })
        .catch(error => {
            console.log(`Error Creating Class : ${error.message}`);
        });
}

exports.deleteTopic = (req, res, next) => {

    const id = req.user._id
    const classId = req.params.cid
    const topic = req.params.tid
    //make sure that the entry is unique.
    Faculty.updateOne({ "_id": id, "classes._id":classId },
        {
             "$pull": {
                "classes.$.topics": topic
            }
        }
    )
        .then(result => {
            console.log("Topic Deleted  -> " + topic);
            this.listTopics(req, res, next);
        })
        .catch(error => {
            console.log(`Error Creating Class : ${error.message}`);
        });
}




