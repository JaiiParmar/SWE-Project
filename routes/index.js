const express = require('express');
const router = express.Router();
const moongose = require('mongoose');
const users = moongose.model('users')

router.get('/',(req,res)=>res.render('login'));

router.post('/',(req,res) =>{
    console.log(req.body);
    checkUser(req,res);
});

// function checkUser(req,res){
//     //create obj of employee schema
//     var user = new users();
//     if(req.body.uname != null){
//     users.findOne({userid: req.body.uname},function(err, docs) {
//         console.log("Username " + JSON.stringify(docs));
//         if(JSON.stringify(docs)!=null){
//             //if(docs.userid == req.body.uname)
//             if(docs.userid === req.body.uname && docs.password === req.body.password && docs.status === "enable"){
//                 console.log("Authentication Done!!!")
//                 res.redirect('/admin/AddCourse.ejs');
//             }
//         }
//         else{
//             console.log("UserId not found!!");
//         }

//       })
//     }
//     else{
//         res.redirect('/');
//     }
// }
function checkUser(req, res) {
    //create obj of employee schema
    var user = new users();
    if (req.body.uname != null) {
        users.findOne({ email: req.body.uname }, function (err, docs) {
            console.log("Username " + JSON.stringify(docs));
            if (JSON.stringify(docs) != null) {
                //if(docs.userid == req.body.uname)
                if (docs.email === req.body.uname && docs.password === req.body.password && docs.active === true) {
                    console.log("Authentication Done!!!")
                    res.redirect('/admin/AddCourse.ejs');
                }
            }
            else {
                console.log("UserId not found!!");
            }
        })
    }
    else {
        res.redirect('/');
    }
}
router.get('/list',(req,res) =>{
    res.json('from list');
});
module.exports = router;