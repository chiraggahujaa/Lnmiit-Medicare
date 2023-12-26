const mongoose = require("mongoose");
const HealthReport = require("./HealthReport");
const Schema = mongoose.Schema;

const StudentRequestSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  teacherId: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  healthReport: {
    type: Schema.Types.ObjectId,
    ref: "HealthReport",
  },
  serialNo: {
    type : Number,
    require : true
  },
  status: {
    type: String,
    enum: ["initial", "waiting", "approved", "notapproved"],
    default: "initial",
    required: true,
  },
  customMakeup : {
    type : Boolean,
    default : false,
    required : true
  },
  attachment : {
    type : String,
    default : "",
  }
});

const StudentRequest = mongoose.model("StudentRequest", StudentRequestSchema);

module.exports = StudentRequest;