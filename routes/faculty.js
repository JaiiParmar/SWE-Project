/** All the Request from the Faculty... */

//for each Request it will check for the authentication....
const isAuth = require("../middleware/is-auth");
const express = require("express");

const facultyController = require("../controllers/faculty-controller");
const questionBankController = require("../controllers/question-bank-controller");
const questionPaperController = require("../controllers/question-paper-controller");

const router = express.Router();

//***********************************************************************************/
                /** CRUD Class and CRUD Topics */
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



//***********************************************************************************/
                /** CRUD Questions... */
//***********************************************************************************/

router.get("/getCreateQuestion/:classId", isAuth, questionBankController.getCreateQuestion);

router.post("/createQuestion/:classId", isAuth, questionBankController.createQuestion)

router.get("/listQuestions/:classId", isAuth, questionBankController.getListQuestions);

router.get("/questionDetails/:questionId", isAuth, questionBankController.getDetailsQuestions);

router.post("/updateQuestion/:questionId", isAuth, questionBankController.updateQuestion);

router.get("/deleteQuestion/:questionId/:classId", isAuth, questionBankController.deleteQuestion);





//***********************************************************************************/
/** CRUD Questions Paper... */
//***********************************************************************************/


router.get('/getGenerateQuestionpaper/:classId', isAuth, questionPaperController.getGenerateQuestionPaper)

router.post('/generateQuestionPaper/:classId', isAuth, questionPaperController.generateQuestionPaper)



//***********************************************************************************/

module.exports = router;
