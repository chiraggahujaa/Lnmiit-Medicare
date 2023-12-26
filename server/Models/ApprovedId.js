const mongoose = require("mongoose");

const ApprovedIdSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
  },
  serialNo: {
    type: Number,
    required: true,
  },
});

const ApprovedId = mongoose.model("ApprovedId", ApprovedIdSchema);

module.exports = ApprovedId;