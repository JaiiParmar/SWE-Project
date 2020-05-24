/** All the Request from the admin... */

//for each Request it will check for the authentication....
const isAuth = require('../middleware/is-auth');
const express = require("express");

const adminController = require("../controllers/admin-controller");
const userController = require("../controllers/user-controller");

const router = express.Router();





//*********************************************************************************** */
                    /**Program Routes */

//*********************************************************************************** */

//render AddProgram.ejs page.
router.get("/getAddProgram", isAuth, (req, res, next) => res.render('AddProgram'));

//Add program - Database.
router.post("/addProgram", isAuth, adminController.addProgram);

//list Program
router.get("/listProgram", isAuth, adminController.listPrograms);

// a Single program Details
router.get("/getShowProgram/:id", isAuth, adminController.getProgramDetails);

//Delete a Program
router.get('/getShowProgram/deleteProgram/:id', isAuth,  adminController.deleteProgram);

//Update a Program
router.post('/getShowProgram/updateProgram/:id', isAuth, adminController.updateProgram);








//*********************************************************************************** */
                    /**Course Routes */

//*********************************************************************************** */

//render AddCourse.ejs page.
router.get("/getAddCourse", isAuth, (req, res, next) => res.render('AddCourse'));

// add Course -Database.
router.post("/addCourse", isAuth, adminController.addCourse);

// list Courses.
router.get("/listCourses", isAuth, adminController.listCourses);

// a Single Course Details.
router.get("/getShowCourse/:id", isAuth, adminController.getCourseDetails);

// Delete a Course.
router.get('/getShowCourse/deleteCourse/:id', isAuth, adminController.deleteCourse);

// Update a Course.
router.post('/getShowCourse/updateCourse/:id', isAuth, adminController.updateCourse);






//*********************************************************************************** */
                    /**Faculty Routes */

//*********************************************************************************** */

//render AddFaculty page.
router.get("/getAddFaculty", isAuth, (req, res, next) => res.render('AddFaculty'));

//list Facutly.
router.get("/listFaculty", isAuth, adminController.listFaculty);

//Add Faculty - Database.
router.post("/addFaculty", isAuth, userController.addFaculty);

// a Single Faculty Details.
router.get("/getShowFaculty/:   id", isAuth, userController.getUserDetails);

// Detele a Faculty.
router.get('/getShowFaculty/deleteFaculty/:id', isAuth, userController.deleteUser);

// Update a Faculty.
router.post('/getShowFaculty/updateFaculty/:id', isAuth, userController.updateUser);

    
//exports the routes
module.exports = router;
