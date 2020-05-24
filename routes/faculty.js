/** All the Request from the Faculty... */

//for each Request it will check for the authentication....
const isAuth = require("../middleware/is-auth");
const express = require("express");

const facultyController = require("../controllers/faculty-controller");

const router = express.Router();

//***********************************************************************************/

router.get("/getCreateClass", isAuth, facultyController.getCreateClass);

router.post("/createClass", isAuth, facultyController.createClass);

router.get('/listTopics/:fid/:cid', isAuth, facultyController.listTopics);

router.get("/listClasses", isAuth, facultyController.getListClass);

router.get("/classDetails/:id", isAuth, facultyController.getDetailsClass);

router.get("/getCreateTopic", isAuth, facultyController.getCreateTopic);

router.post("/createTopic", isAuth, facultyController.createTopic);

module.exports = router;
