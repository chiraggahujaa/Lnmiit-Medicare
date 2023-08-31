const mongoose = require("mongoose");
const BodyVitals = require("./BodyVitals");
const Schema = mongoose.Schema;

const TeacherSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  bodyVitals: [
    {
      type: Schema.Types.ObjectId,
      ref: "BodyVitals",
    },
  ],
  healthReport: [
    {
      type: Schema.Types.ObjectId,
      ref: "HealthReport",
    },
  ],
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;
