const path = require("path");

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const User = require('./models/user');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

//const errorController = require('./controllers/error');

//const csrf = require("csurf");
const flash = require("connect-flash");

const host = "localhost";
const port = "27017";
const db = "paper_generator"; // database name
//set url

const MONGODB_URI = `mongodb://${host}:${port}/${db}`;
const app = express();
//const csrfProtection = csrf();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

//Set template engine as ejs
app.use(expressLayouts);
app.set('view engine' , 'ejs');
app.use(express.static(__dirname + '/public'));

const authRoutes = require("./routes/auth");
const adminRoutes = require('./routes/admin');
const facultyRoutes = require('./routes/faculty');
const errorController = require('./controllers/error')

//body-parser
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());
//app.use(csrfProtection);
app.use(flash());

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      res.locals.user = {
        role : user.role,
        email : user._id,
        name : user.name
      }
     //console.log(res.locals.user);
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;  //to use with every request.
  //res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/', adminRoutes);
app.use('/', authRoutes);
app.use('/', facultyRoutes);

//if no routes found.
// app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI, { useUnifiedTopology: true, useCreateIndex: true,useNewUrlParser: true })
  .then(result => {         //if database is connected.
    //Start the SERVER
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, console.log(`Server started on port ${PORT}`))
  })
  .catch(err => {
    console.error();
    (err);
});


