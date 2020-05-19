require('./models/db')
const express = require('express');
const path = require("path");
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const session = require('client-sessions');
const User = mongoose.model('user');

const app = express();

//Set template engine as ejs
app.use(expressLayouts);
app.set('view engine' , 'ejs');
app.use(express.static(__dirname + '/public'));

//body-parser
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());

// session
app.use(session({
  cookieName: 'session',
  secret: 'secret',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

// checking sessions exists
app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    User.findOne({ _id: req.session.user._id }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});

//Routes
app.use('/',require('./routes/index.js'));
app.use('/user',require('./routes/user.js'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));