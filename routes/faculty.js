/** All the Request from the Faculty... */

//for each Request it will check for the authentication....
const isAuth = require("../middleware/is-auth");
const express = require("express");

const facultyController = require("../controllers/faculty-controller");

const router = express.Router();

//***********************************************************************************/

router.get("/getCreateClass", isAuth, facultyController.getCreateClass);

router.post("/createClass", isAuth, facultyController.createClass);

router.get('/listTopics/:cid', isAuth, facultyController.listTopics);

router.get("/listClasses", isAuth, facultyController.getListClass);

router.get("/classDetails/:id", isAuth, facultyController.getDetailsClass);

router.get("/getCreateTopic/:cid", isAuth, facultyController.getCreateTopic);

router.post("/createTopic/:cid", isAuth, facultyController.createTopic);

router.get("/getTopicDetails/:cid/:tid", isAuth, facultyController.getTopicDetails);

router.post("/updateTopic/:cid/:tid", isAuth, facultyController.updateTopic);

router.get("/deleteTopic/:cid/:tid", isAuth, facultyController.deleteTopic);



module.exports = router;
