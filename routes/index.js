const express = require('express');
const router = express.Router();
const moongose = require('mongoose');
const User = moongose.model('user');
const Course = moongose.model('course');
const Faculty = moongose.model('faculty');
const Program = moongose.model('program');
const Student = moongose.model('student');
const Question = moongose.model('question');

var doc = "";
var message = "";

router.get('/', (req, res) => res.render('login'));

function requireLogin (req, res, next) {
    if (!req.user) {
      res.redirect('/');
    } else {
      next();
    }
  };
//functions for pages

router.get('/admin_dashboard',requireLogin,(req,res)=>res.render('admin_dashboard'))
router.get('/addcourse',(req,res)=>res.render('AddCourse',{docs: doc}))
router.get('/addfaculty',(req,res)=>res.render('AddFaculty',{docs: doc}))
router.get('/addprogram',(req,res)=>res.render('AddProgram',{docs: doc}))
router.get('/addquestion_faculty',(req,res)=>res.render('AddQuestion_Faculty',{docs: doc}))
router.get('/addquestions',(req,res)=>res.render('AddQuestions',{docs: doc}))
router.get('/addstudent',(req,res)=>res.render('AddStudent',{docs: doc}))
router.get('/contact',(req,res)=>res.render('contact',{docs: doc}))
router.get('/faculty_getstarted',requireLogin,(req,res)=>res.render('Faculty_GetStarted',{docs: doc}))
router.get('/generate_questionpaper',(req,res)=>res.render('Generate_QuestionPaper',{docs: doc}))
router.get('/generate_questionpaper_faculty',(req,res)=>res.render('Generate_QuestionPaper_Faculty',{docs: doc}))
router.get('/old_questionpapers',(req,res)=>res.render('Old_QuestionPapers',{docs: doc}))
router.get('/removecourse',(req,res)=>{course.find({},function(err, docs) {
  if(JSON.stringify(docs)!=null){
    //console.log(JSON.stringify(docs));
    res.render('RemoveCourse',{
    allCourses: docs,
    docs: doc
  })}
  else{console.log("Course not found!!");}
});})


router.get('/removefaculty',(req,res)=>{
  User.find({role: "faculty", active: true},function(err, docs) { //chnage role to user_type
  if(JSON.stringify(docs)!=null){
    res.render('RemoveFaculty',{
      allFaculty: docs,
    docs: doc
    })}
  else{console.log("Faculty not found!!");}
});
})
router.get('/removeprogram',(req,res)=>{Program.find({},function(err, docs) {
  if(JSON.stringify(docs)!=null){
    //console.log(JSON.stringify(docs));
    res.render('RemoveProgram',{
    allProgram: docs,
    docs: doc
  })}
  else{console.log("Course not found!!");}
});})

router.get('/removequestion_faculty',(req,res)=>res.render('RemoveQuestion_Faculty',{docs: doc}))
router.get('/removequestion',(req,res)=>res.render('RemoveQuestion',{docs: doc}))
router.get('/removestudent',(req,res)=>{
  User.find({role: "student",active: true},function(err, docs) { //chnage role to user_type
  if(JSON.stringify(docs)!=null){
    res.render('RemoveStudent',{
      allStudent: docs,
      docs: doc
    })}
  else{console.log("Student not found!!");}
});
})
router.get('/review_questionpaper_faculty',(req,res)=>res.render('Review_QuestionPaper_Faculty',{docs: doc}))

router.post('/',(req,res) =>{
    console.log(req.body);
    checkUser(req,res);
});

function checkUser(req,res){

    //create obj of employee schema
    //var User = new users();
    if(req.body.uname != null){
    User.findOne({_id: req.body.uname},function(err, docs) {
        console.log("Username " + JSON.stringify(docs));
        if(JSON.stringify(docs)!=null){
            //if(docs.userid == req.body.uname)
            if(docs._id=== req.body.uname && docs.password === req.body.password && docs.active === true)
            {
                doc = docs;
                console.log("Authentication Done!!!")
                if(docs.role=="admin")
                {
                  res.render('admin_dashboard',{docs: docs});
                }
                else if(docs.role=="faculty")
                {
                  res.render('faculty_getstarted',{docs: docs})
                }
            }
        }
        else{
            console.log("UserId not found!!");
        }
      })
    }
    else{
        res.redirect('/');
    }
}

//---------Add course begin-----------------------
router.post('/addCourses',(req,res)=>{
  console.log("Add course called");
  addCourse(req,res);
})

//Addcourse
function addCourse(req,res){
    var course = new Course({
      _id : req.body.ccode,
      name : req.body.cname
    });
    course.save()
    .then((res)=>{
      console.log(res);
      JSAlert.alert("record added sucsessfully!!!");
      res.render("addcourse", { message: 'Course Added Successfully!' });
    })
    .catch((e)=>{
      console.log(e)
      JSAlert.alert("record not added");
      res.render("addcourse", { message: 'Course not added!' });
    }    );
}

//---------------End Add Course -----------------------------------

//---------Add program begin-----------------------
router.post('/addProgram',(req,res)=>{
  console.log("Add Program called");
  addProgram(req,res);
})
//AddProgram


function addProgram(req,res){
    var program = new Program({
      name : req.body.pname,
      duration : req.body.duration
    });
    program.save()
    .then((res)=>{
      console.log(res);
      JSAlert.alert("record added sucsessfully!!!");
     message='Program Added Successfully!';
    })
    .catch((e)=>{
      console.log(e)
      JSAlert.alert("record not added");
      message='Program not added!';
    }    );
    res.render("addprogram",{message:message});



}

//---------------End Add Program -----------------------------------


router.get('/list',(req,res) =>{
    res.json('from list');
});
module.exports = router;