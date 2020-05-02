const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true,
    //specify reg-ex.
  },
  password: {
    type: String,
    maxlength: 50,
    required: true,
    //spedify reg-ex.
  },
  user_type: {
    type: String,
    enum: ["admin", "faculty", "student"],
    required: true,
  },
  reg_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});

//Export model
module.exports = mongoose.model("users", userSchema);
