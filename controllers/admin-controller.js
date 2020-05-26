
const Program = require("../models/program");
const Course = require("../models/course");
const Faculty = require("../models/faculty");
const User = require('../models/user');



//*********************************************************************************** */
/**Program Routes */

//*********************************************************************************** */

//render the AddProgram Page....
exports.getAddProgram = (req, res, next) => {
    let message = req.flash("error");
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render("AddProgram", {
        //path: "/login",
        pageTitle: "add-product",
        message : message,
    });
};

// Fetch Program and render it in listProgram.ejs
exports.listPrograms = (req, res, next) => {
    Program.find({}).exec()
        .then((programs) => {
            if (!programs) {
                res.render('listProgram', {
                    messag: "NO RECORD FOUND"
                })
            }
            res.render('listProgram', {
                message: null,
                programs: programs
            })
        })
        .catch((err) => {
            res.render('listProgram', {
                message: "NO RECORD FOUND"
            })
        })
};


// fetch fet Single program and fetch it in programDetails.ejs
exports.getProgramDetails = (req, res, next) => {
    Program.findOne({ _id: req.params.id })
        .then((program) => {
            if (!program) {
                req.flash("error", "Invalid email or password.");
                return res.redirect("/");
            }
            res.render('programDetails', {
                program: program
            })
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/listProgram");
        });
}


// Add the program in the Database.
exports.addProgram = (req, res, next) => {
    const id = req.body.pid
    const name = req.body.pname
    const duration = req.body.duration

    const nProgram = new Program({
        _id: id,
        name: name,
        duration: duration
    })
    nProgram.save((err) => {
        message = null;
        if (err) {
            console.error(err);
            message = "Sorry! Could not Add the Program!"
        }
        message = "Program Added!"
        res.render('AddProgram',
            {
                message: message
        })
    });
}


//Update the Program
exports.updateProgram = (req, res, next) => {
    const id = req.params.id
    const name = req.body.pname
    const duration = req.body.pduration
    const active = req.body.pactive

    Program.findByIdAndUpdate(id, {
        $set: {
            name: name,
            duration: duration,
            active: active
        }
    } )
        .then(result => {
            console.log("Program Updated!");
            //this.getProgramDetails(req, res, next);
            res.redirect('/listProgram')
        })
    .catch(error => {
        console.log(`Error updating Program: ${error.message}`);
        
    });
};

//Delete the Program
exports.deleteProgram = (req, res, next) => {
    const id = req.params.id;
    Program.findByIdAndDelete(id)
        .exec().
    then(ress => {
        res.redirect('/listProgram');
    }).catch(err => {
        console.log(err.message);
     })
};




//*********************************************************************************** */
/**Course Routes */

//*********************************************************************************** */


//list course
exports.listCourses = (req, res, next) => {
    Course.find({}).exec()
        .then((courses) => {
            if (!courses) {
                res.render('listCourse', {
                    messag: "NO RECORD FOUND"
                })
            }
            res.render('listCourse', {
                message: null,
                courses: courses
            })
        })
        .catch((err) => {
            res.render('listCourse', {
                message: "NO RECORD FOUND"
            })
        })
};

// Add course
exports.addCourse = (req, res, next) => {
    const id = req.body.ccode
    const name = req.body.cname

    const nCourse = new Course({
        _id: id,
        name: name,
    })

    nCourse.save((err) => {
        message = null;
        if (err) {
            console.error(err);
            message = "Could not Add the Program!"
        }
        message = "Course Added!"
        res.render('AddCourse',
            {
                message: message
            })
    });
};

//Get Single program.
exports.getCourseDetails = (req, res, next) => {
    Course.findOne({ _id: req.params.id })
        .then((course) => {
            if (!course) {
                req.flash("error", "Invalid email or password.");
                return res.redirect("/");
            }
            res.render('courseDetails', {
                course: course
            })
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/listCourse");
        });
}

//updateCourse
exports.updateCourse = (req, res, next) => {
    const id = req.params.id
    const name = req.body.cname
    const optional = req.body.coptional
    const active = req.body.cactive

    Course.findByIdAndUpdate(id, {
        $set: {
            name: name,
            optional: optional,
            active: active
        }
    })
        .then(result => {
            console.log("Course Updated!");
            res.redirect('/listCourses')
        })
        .catch(error => {
            console.log(`Error updating Course: ${error.message}`);
        });
};

//deleteCourse
exports.deleteCourse = (req, res, next) => {
    const id = req.params.id;
    Course.findByIdAndDelete(id)
        .exec().
        then(ress => {
            res.redirect('/listCourses');
        }).catch(err => {
            console.log(err.message);
    })
};

//*********************************************************************************** */
/**Program Routes */

//*********************************************************************************** */

//list Faculty
exports.listFaculty = (req, res, next) => {
  User.find()
    .where({ role: "faculty" })
    .exec()
    .then((faculties) => {
      if (!faculties) {
        res.render("listFaculty", {
          messag: "NO RECORD FOUND",
        });
      }
      res.render("listFaculty", {
        message: null,
        faculties: faculties,
      });
    })
    .catch((err) => {
      res.render("listFaculty", {
        message: "NO RECORD FOUND",
      });
    });
};

