const express = require("express");
const router = express.Router();
const Student = require("../Models/Student");
const HealthReport = require("../Models/HealthReport");

router.post("/report", async (req, res) => {
  const { uniqueId, problem, isAdmitted, consultant } = req.body;
  try {
    let student = await Student.findOne({ uniqueId });

    if (!student) {
      student = new Student({ uniqueId });
    }

    const healthReport = new HealthReport({
      problem,
      isAdmitted,
      consultant,
      date : new Date()
    });

    await healthReport.save();
    
    await student.healthReport.push(healthReport);
    await student.save();
    console.log("Health report of " + uniqueId + " saved to database");

    res.json({
      message: "Health report of " + uniqueId + " saved to database",
      status: 1,
    });
  } catch (err) {
    res.send({
      message: err.message,
      status: 0,
    });
  }
});

router.get("/report/:uniqueId", async (req, res) => {
  const { uniqueId } = req.params;

  try {
    const student = await Student.findOne({ uniqueId });
    if (!student) {
      res.json({
        message: "Student not found",
        status: 404,
      });
      return;
    }

    const healthReportIds = student.healthReport;
    const healthReport = await Promise.all(
      healthReportIds.map(async (objId) => {
        const [hr] = await HealthReport.find({ _id: objId });
        return hr;
      })
    );
    console.log(healthReport);
    res.json(healthReport);
  } catch (err) {
    res.contentType("json");
    res.status(500).send({ error: err.message });
  }
});

router.patch("/report/:objId", async (req, res) => {
  const { objId } = req.params;
  const { consultant, problem, isAdmitted, date } = req.body;

  try {
    console.log({ consultant, problem, isAdmitted, date });
    const updatedHealthReport = await HealthReport.findByIdAndUpdate(objId, {
      consultant,
      problem,
      isAdmitted,
      date,
    });

    if (!updatedHealthReport) {
      res.json({
        message: "No such health report found",
        status: 404,
      });
    }

    res.json(updatedHealthReport);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
