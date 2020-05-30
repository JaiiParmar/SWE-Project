const bcrypt = require("bcryptjs"); //for enrypting the password

const User = require("../models/user");

//render the login.ejs page.
exports.getLogin = (req, res, next) => {

  let mError = req.flash("error");
  let mOk = req.flash("info");

  if (mError.length > 0) {
    mError = mError[0];
    mOk = null
  } else if (mOk.length > 0) {
    mOk = mOk[0];
    mError = null
  }
  else {
    mError = mOk = null
  }
  
  res.render("login",{
    //path: "/login",
    pageTitle: "Login",
    errorMessage: mError,
    okMessage:mOk
  });

};

// Authenticate the user... Create the session...
/**
 */
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ _id: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              const user_details = {
                role: user.role,
                name: user.name,
                email: user._id
              }
                res.render("dashboard", {
                  user: user_details
                });
            });
          }
          req.flash("error", "Invalid email or password.");
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/");
        });
    })
    .catch((err) => console.log(err));
};


//logout.... end the session.
exports.postLogout = (req, res, next) => {
  req.flash("info", "Successfully Logged Out");
  req.session.destroy((err) => {
    res.redirect("/");
  });
};


