const bcrypt = require("bcryptjs");
/**Mail Service */
const nodemailer = require('nodemailer');

const User = require('../models/user');
const Faculty = require('../models/faculty');

// Add faculty and send email.
exports.addFaculty = (req, res, next) => {
    //const confirmPassword = req.body.confirmPassword;
    const id = req.body.facEmail
    const password = req.body.facPass
    const name = req.body.facName
    const role = req.body.facRole

    User.findOne({ _id: id })
        .then((userDoc) => {
            if (userDoc) {
                req.flash(
                    "error",
                    "E-Mail exists already, please pick a different one."
                );
                return res.redirect("/getAddFaculty");
            }
            return bcrypt
                .hash(password, 12)
                .then((hashedPassword) => {
                    const user = new User({
                        _id: id,
                        password: hashedPassword,
                        role: role,
                        name: name
                    });
                    Faculty({ _id: id })
                        .save().catch((err) => {
                            console.log(err);
                            res.render('error',
                                {
                                    message: "Ooops! Something's Wrong! Try again later."
                                })
                    })
                    return user.save();
                })
                .then((result) => {

                    //**Mailing Service. */
                    // const smtpTransport = nodemailer.createTransport({
                    //     service: 'gmail',
                    //     auth: {
                    //         user: "*****20@gmail.com",
                    //         pass: "*****@123"
                    //     }
                    // });
                    // const mailOptions = {
                    //     from: "mooseparmar20@gmail.com",
                    //     to: id,
                    //     subject: "Account Registerd!",
                    //     text: "Your account has been registered! Use given password to login!",
                    //     html: "<h5>Password :" + password + " .</h5>"
                    // }
                    // smtpTransport.sendMail(mailOptions, function (error, response) {
                    //     if (error) {
                    //         console.log(error);
                    //     } else {
                    //         console.log('email sent to : ' + id);
                    //     }
                    // });
                    res.redirect("/getAddFaculty");
                })
        })
        .catch((err) => {
            console.log(err);
            res.render('error', {message :"Ooops! Something's Wrong! Try again later."})
        });
};

//Get Single User.
exports.getUserDetails = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((user) => {
            if (!user) {
                req.flash("error", "Invalid email or password.");
                return res.redirect("/");
            }
            //add if condition if Student of Facutly then based on the condition redirect.
            res.render('facultyDetails', {
                faculty: user
            })
        })
        .catch((err) => {
            console.log(err);
            //add if condition if Student of Facutly then based on the condition redirect.
            res.redirect("/listFaculty");
        });
}

//Update User.
exports.updateUser = (req, res, next) => {
    const id = req.params.id
    const name = req.body.fname
    const active = req.body.factive
    User.findByIdAndUpdate(id, {
        $set: {
            name: name,
            active: active
        }
    })
        .then(result => {
            //add if condition if Student of Facutly then based on the condition redirect.
            console.log("Faculty Updated!");
            res.redirect('/listFaculty')
        })
        .catch(error => {
            console.log(`Error updating Faculty: ${error.message}`);
        });
}

//Delete Use.
exports.deleteUser = (req, res, next) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .exec().
        then(ress => {
            //add if condition if Student of Facutly then based on the condition redirect.
            res.redirect('/listFaculty');
        }).catch(err => {
            console.log(err.message);
        })
}
