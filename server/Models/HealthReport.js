const mongoose = require("mongoose");

const HealthReportSchema = new mongoose.Schema({
  problem: {
    type: String,
    required: true,
  },
  isAdmitted: {
    type: Boolean,
    default: false,
  },
  consultant: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const HealthReport = mongoose.model("HealthReport", HealthReportSchema);

module.exports = HealthReport;
