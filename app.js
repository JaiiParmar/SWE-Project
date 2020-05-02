require('./models/db')
const express = require('express');
const app = express();
const path = require("path");
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

app.use(expressLayouts);
//Set template engine as ejs
app.set('view engine' , 'ejs');
app.use(express.static(__dirname + '/public'));

//Routes
app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(bodyparser.json());
app.use('/',require('./routes/index.js'));
app.use('/user',require('./routes/user.js'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));