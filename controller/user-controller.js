const mongoose = require('mongoose');
const User = require('../models/user');
const Faculty = require('../models/faculty');
const Student = require('../models/student');


exports.findUserByUsername = function (req, res) {
    const email = req.body.uname;
    User.find().where({ 'email': email }).exec((err, user) => {
        if (err) return next(err);
    })
}

// exports.addUser = function () {

// }
// exports.removeUser = function () {

// }
// exports.updateUses = function () {

// }

// exports.findUserById = function (req, res, next) {

// }

// exports.listFaculty = function (req, res, next) {

// }

// exports.listStudentByProgram = function () {

// }

// exports.listStudentByCourse = function(){

// }

// function createUser(res) {
//     let Jai = new User({
//         name: "Amit Mankodi",
//         email: "Man  kodi201912076@gmail.com",
//         password: "mankodi@123",
//         meta: {
//             user_type: "faculty",
//         },
//     });
//     Jai.save((err) => {
//         if (err) {
//             console.log(err);

//             console.log("ERROR CREATING : " + Jai);
//             return;
//         }
//         console.log("New User Created : " + Jai);
//         return;
//     });

//     Jai = new User({
//         name: "Jayesh",
//         email: "admin201912076@gmail.com",
//         password: "admin@123",
//         meta: {
//             user_type: "admin",
//         },
//     });
//     Jai.save((err) => {
//         if (err) {
//             console.log(err);

//             console.log("ERROR CREATING : " + Jai);
//             return;
//         }
//         console.log("New User Created : " + Jai);
//         return;
//     });

//     Jai = new User({
//         name: "Jai",
//         email: "jai201912076@gmail.com",
//         password: "jai@123",
//         meta: {
//             user_type: "student",
//         },
//     });
//     Jai.save((err) => {
//         if (err) {
//             console.log(err);

//             console.log("ERROR CREATING : " + Jai);
//             return;
//         }
//         console.log("New User Created : " + Jai);
//         return;
//     });
// }


// exports.user_list = function(req, res, next) {
//     User.find().exec(function (err, uList) {
//         if (err) {
//             return next(err);
//         }
//         console.log(user_list);
//         res.render('user_list', {user_list : uList});
//     });
// }

// //DisplayUsers();
// function findbytype(type) {
//     User.find()
//         .where({ 'user_type': type })
//         .exec(function (err, user_list) {
//             if (err) {
//                 return next(err);
//             }
//             console.log(user_list);
//         });
// }
// //findbytype('student');

