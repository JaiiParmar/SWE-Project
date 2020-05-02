const express = require('express');
const router = express.Router();

//login
router.get('/login',(req,res)=>res.render('/login.ejs'));
//about
router.get('/about',(req,res)=>res.send('Welcome to about page'));


module.exports = router;