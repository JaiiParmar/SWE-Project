const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//import models.
const User = require("./models/user");
const Program = require("./models/program");
const Course = require("./models/course");
const Faculty = require("./models/faculty");

//database connection details
const host = "localhost";
const port = "27017";
const db = "paper_generator"; // database namenod
//set url
const url = `mongodb://${host}:${port}/${db}`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.Promise = global.Promise;
//get connection.
const db_con = mongoose.connection;

//if an error occurs.
db_con.on("error", console.error.bind(console, "MongoDB connection error:"));
db_con.once("open", () => {
  //if all works fine..
  console.log("*** MongoDB got connected ***");
  console.log(`Our Current Database Name : ${db} \n\n`);
});

//************************************************ */
//function that create an object for users' collecion. pass it to the 'user' model and execute the query... on success print the message otherwise the error.
function createUser(mUser) {
  bcrypt.hash(mUser.pass, 12).then((hashedPassword) => {
        const id = mUser._id
          const user = new User({
            _id :mUser._id,
            password: hashedPassword,
            name:mUser.name,
            role:mUser.role
          });
      Faculty({ _id: id })
        .save().catch((err) => {
          console.log(err);
        })
        user.save();
      })
    .catch((err) => {
      console.log(err);
    })
}

function populateUsers() {
  //Array of Users.................
  const users = [
    // {
    //   _id: "jaiparmar207@gmail.com",
    //   name: "Jayesh Parmar",
    //   pass: "jaiparmar207@123",
    //   role: "admin",
    // },
    {
      _id: "admin@gmail.com",
      name: "IAmAdmin",
      pass: "admin@123",
      role: "admin",
    },
  ];

  users.forEach((user) => {
    createUser(user);
  });

  console.log("User are in the DB! Woohooo!!\n\n");
  //users inserted... now insert programs...
  populatePrograms();
}

function createProgram(mProgram) {
  const program_details = {
    _id: mProgram.id,
    name: mProgram.name,
    duration: mProgram.duration,
  };

  const program = new Program(program_details);
  program.save((err) => {
    if (err) {
      console.log("ERROR WHILE ADDING PROGRAM : " + err);
      return;
    }
    console.log("**** NEW PROGRAM CREATED **** :" + program.name);
  });
}

function populatePrograms() {
  const programs = [
    {
      id: "MSCIT",
      name:"Master in Science - Information Technology",
      duration: "2",
    },
    {
      id: "BTECH",
      name: "Bachelor blah blah..",
      duration: "4",
    },
    {
      id: "MTECH",
      name: "Master blah lbha..",
      duration: "2",
    },
    {
      id: "MDES",
      name: "Master in Blah blah blah..",
      duration: "2",
    },
    {
      id: "PHD",
      name: "Live you life, by not doing this...",
      duration: "5",
    },
  ];

  programs.forEach((program) => {
    createProgram(program);
  });
  console.log("Programs are in the DB! Woohooo!!\n\n");

  //programs inserted... now insert courses...
  populateCourses();
}

function createCourse(mCourse) {
  const course_details = {
    _id: mCourse.code,
    name: mCourse.name,
  };

  const course = new Course(course_details);
  course.save((err) => {
    if (err) {
      console.log("ERROR WHILE ADDING COURSE : " + err);
      return;
    }
    console.log("**** NEW COURSE CREATED **** :" + course.name);
  });
}

function populateCourses() {
  const courses = [
    {
      code: "IT110",
      name: "SWE",
    },
    {
      code: "IT111",
      name: "OOP",
    },
    {
      code: "IT112",
      name: "WEB",
    },
    {
      code: "IT113",
      name: "SP",
    },
    {
      code: "IT114",
      name: "MATH",
    },
    {
      code: "IT115",
      name: "SWE",
    },
    {
      code: "IT116",
      name: "OOP",
    },
    {
      code: "IT117",
      name: "WEB",
    },
    {
      code: "IT118",
      name: "SP",
    },
    {
      code: "IT119",
      name: "MATH",
    },
    {
      code: "CS110",
      name: "DBMS",
    },
    {
      code: "CS111",
      name: "VSLI",
    },
    {
      code: "CS112",
      name: "STATES",
    },
    {
      code: "CS113",
      name: "NET",
    },
    {
      code: "CS114",
      name: "ML",
    },
    {
      code: "ICT110",
      name: "ICT_DBMS",
    },
    {
      code: "ICT111",
      name: "ICT_VSLI",
    },
    {
      code: "ICT112",
      name: "ICT_STATES",
    },
    {
      code: "ICT113",
      name: "ICT_NET",
    },
    {
      code: "ICT114",
      name: "ICT_ML",
    },
    {
      code: "MD110",
      name: "MD_XX",
    },
    {
      code: "MD111",
      name: "MD_YY",
    },
    {
      code: "MD112",
      name: "MD_ZZ",
    },
    {
      code: "MD113",
      name: "MD_QQ",
    },
    {
      code: "MD114",
      name: "MD_PP",
    },
    {
      code: "C110",
      name: "PDH_DBMS",
    },
    {
      code: "C111",
      name: "PDH_VSLI",
    },
    {
      code: "C112",
      name: "PHD_STATES",
    },
    {
      code: "C113",
      name: "PHD_NET",
    },
    {
      code: "C114",
      name: "PHD_MATH",
    },
  ];

  courses.forEach((course) => {
    createCourse(course);
  });

  console.log("Courses are in the DB! Woohooo!!\n\n");
}

function populateDatabase() {
  populateUsers();
 // mongoose.connection.close();sh
}
//populate Database....
populateDatabase();
