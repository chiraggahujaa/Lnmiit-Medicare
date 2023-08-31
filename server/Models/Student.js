const mongoose = require("mongoose");
const HealthReport = require("./HealthReport");
const Schema = mongoose.Schema;

const StudentSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  healthReport: [
    {
      type: Schema.Types.ObjectId,
      ref: "HealthReport",
    },
  ],
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
