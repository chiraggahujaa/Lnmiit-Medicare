const mongoose = require("mongoose");

const BodyVitalsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  systolicBP: {
    type: Number,
    required: true,
  },
  diastolicBP: {
    type: Number,
    required: true,
  },
  spo2: {
    type: Number,
    required: true,
  },
  bloodGlucose: {
    type: Number,
    required: true,
  },
});

const BodyVitals = mongoose.model("BodyVitals", BodyVitalsSchema);

module.exports = BodyVitals;
