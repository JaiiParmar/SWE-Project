const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionPaperSchema = new Schema({
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "faculty",
  },
  program: {
    type: String,
    ref: "program",
  },
  course: {
    type: String,
    ref: "course",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  // Questions: [
  //   ,/** ...Array of Questions... */
  // /** ...file(pdf, word, etc..)*/
  // ],
   total_question: {
    type: Number,
    required: true,
  },
  total_mark: {
    type: Number,
    required: true,
  },
  avg_mark: {
    type: Number,
  },
  exam_date: {
    type: Date,
  },
  time_duration: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy",
  },
  instructions: [String],
  public: {
    type: Boolean,
    default: false,
  },
});

//Export model
module.exports = mongoose.model("questionPaper", questionPaperSchema);
