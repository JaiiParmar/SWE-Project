const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  faculty: {
    type: mongoose.Types.Schema.ObjectId,
    ref: "faculty",
  },
  program: {
    type: mongoose.Types.Schema.ObjectId,
    ref: "program",
  },
  course: {
    type: mongoose.Types.Schema.ObjectId,
    ref: "course",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  text: {
    type: String,
    required: true,
  },
  images: [ ],
  note: {
    type: String,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy",
  },
  mark: {
    type: Number,
    min: 1,
    required: true,
  },
  type: {
    type: String,
    enum: ["theory", "MCQ", "true/false", "yes/no" /**or any other*/],
    default: "theory",
  },
  options: {
    type: Array,
    required: function () {
      return this.type !== "theory";
    },
    default: function () {
      if (this.type === "true/false") return ["true", "false"];
      if (this.typp === "yes/no") return ["yes", "no"];
      return undefined;
    },
  },
  answer: {
    type: String,
  },
  public: {
    type: Boolean,
    default: false,
  },
});

//Export model
module.exports = mongoose.model("question", questionSchema);
