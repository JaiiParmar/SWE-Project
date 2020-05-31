/** All the Request from the Faculty... */

//for each Request it will check for the authentication....
const isAuth = require("../middleware/is-auth");
const isFaculty = require('../middleware/is-faculty')

const express = require("express");

const facultyController = require("../controllers/faculty-controller");
const questionBankController = require("../controllers/question-bank-controller");
const questionPaperController = require("../controllers/question-paper-controller");

const router = express.Router();

//***********************************************************************************/
                /** CRUD Class and CRUD Topics */
//***********************************************************************************/

router.get("/getCreateClass", isAuth, isFaculty, facultyController.getCreateClass);

router.post("/createClass", isAuth, isFaculty, facultyController.createClass);

router.get('/listTopics/:cid', isAuth, isFaculty,  facultyController.listTopics);

router.get("/listClasses", isAuth, isFaculty,  facultyController.getListClass);

router.get("/classDetails/:cid", isAuth, isFaculty,  facultyController.getDetailsClass);

router.get("/deleteClass/:cid", isAuth, isFaculty, facultyController.deleteClass);

router.get("/getCreateTopic/:cid", isAuth, isFaculty, facultyController.getCreateTopic);

router.post("/createTopic/:cid", isAuth, isFaculty, facultyController.createTopic);

router.get("/getTopicDetails/:cid/:tid", isAuth, isFaculty,  facultyController.getTopicDetails);

router.post("/updateTopic/:cid/:tid", isAuth, isFaculty,  facultyController.updateTopic);

router.get("/deleteTopic/:cid/:tid", isAuth, isFaculty,  facultyController.deleteTopic);



//***********************************************************************************/
                /** CRUD Questions... */
//***********************************************************************************/

router.get("/getCreateQuestion/:classId", isAuth, isFaculty,  questionBankController.getCreateQuestion);

router.post("/createQuestion/:classId", isAuth, isFaculty,  questionBankController.createQuestion)

router.get("/listQuestions/:classId", isAuth, isFaculty,  questionBankController.getListQuestions);

router.get("/questionDetails/:questionId", isAuth, isFaculty,  questionBankController.getDetailsQuestions);

router.post("/updateQuestion/:questionId", isAuth, isFaculty,  questionBankController.updateQuestion);

router.get("/deleteQuestion/:questionId/:classId", isAuth, isFaculty, questionBankController.deleteQuestion);



//***********************************************************************************/
/** CRUD Questions Paper... */
//***********************************************************************************/


router.get('/getGenerateQuestionpaper/:classId', isAuth, isFaculty,  questionPaperController.getGenerateQuestionPaper)

router.post('/generateQuestionPaper/:classId', isAuth, isFaculty,  questionPaperController.generateQuestionPaper)

router.post('/questionPaper', isAuth, isFaculty,  questionPaperController.createQuestionPaper)

router.post('/saveQuestionPaper', isAuth, isFaculty, questionPaperController.saveQuestionPapaer)

router.get('/listQuestionPapers/:classId', isAuth, isFaculty,  questionPaperController.listQuestionPaper)

router.get('/viewQuestionPaper/:qpId', isAuth, isFaculty,  questionPaperController.viewQuestionPaper)

//***********************************************************************************/

module.exports = router;
