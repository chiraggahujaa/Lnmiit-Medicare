const express = require("express");
const router = express.Router();
const Teacher = require("../Models/Teacher");
const BodyVitals = require("../Models/BodyVitals");
const HealthReport = require("../Models/HealthReport");

// Create a new body vitals entry
router.post("/create", async (req, res) => {
  try {
    const {
      uniqueId,
      name,
      dept,
      gender,
      height,
      weight,
      systolicBP,
      diastolicBP,
      spo2,
      bloodGlucose,
    } = req.body;

    let teacher = await Teacher.findOne({ uniqueId });
    if (!teacher) {
      // If teacher with given uniqueId does not exist, create new teacher
      teacher = new Teacher({
        uniqueId,
      });
    }

    // Create a new body vitals object
    const bodyVitals = new BodyVitals({
      name,
      dept,
      gender,
      height,
      weight,
      systolicBP,
      diastolicBP,
      spo2,
      bloodGlucose,
      date: new Date(),
    });

    // Save the body vitals to the database
    await bodyVitals.save();

    // Push the body vitals object to the teacher's bodyVitals array
    teacher.bodyVitals.push(bodyVitals);

    // Save the teacher to the database
    await teacher.save();

    console.log("Body vitals saved successfully for " + uniqueId);

    res.json({ msg: "Body vitals saved successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all body vitals entries for a given unique id
router.get("/:uniqueId", async (req, res) => {
  try {
    // console.log(req.params.uniqueId);
    const teacher = await Teacher.findOne({
      uniqueId: req.params.uniqueId,
    });
    console.log(teacher);
    if (!teacher) {
      return res.status(404).json({ msg: "Teacher not found" });
    }

    const bodyVitalIds = teacher.bodyVitals;
    const bodyVitals = await Promise.all(
      bodyVitalIds.map(async (objId) => {
        const [bv] = await BodyVitals.find({ _id: objId });
        return bv;
      })
    );
    res.json(bodyVitals);
  } catch (err) {
    // console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/report", async (req,res)=> {
  const { uniqueId, problem, isAdmitted, consultant } = req.body;
  console.log({ uniqueId, problem, isAdmitted, consultant });
  try {
    let teacher = await Teacher.findOne({ uniqueId });

    if (!teacher) {
      teacher = new Teacher({ uniqueId });
    }

    const healthReport = new HealthReport({
      problem,
      isAdmitted,
      consultant,
      date: new Date(),
    });

    await healthReport.save();
    await teacher.healthReport.push(healthReport);
    await teacher.save();

    console.log("Health report of " + uniqueId + " saved to database");
    res.json({
      message: "Health report of " + uniqueId + " saved to database",
      status: 1,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
      status: 0,
    });
  }
});

router.get("/report/:uniqueId", async (req, res) => {
  const { uniqueId } = req.params;

  try {
    const teacher = await Teacher.findOne({ uniqueId });
    if (!teacher) {
      res.json({
        message: "Teacher not found",
        status: 404,
      });
      return;
    }

    const healthReportIds = teacher.healthReport;
    const healthReport = await Promise.all(
      healthReportIds.map(async (objId) => {
        const [hr] = await HealthReport.find({ _id: objId });
        return hr;
      })
    );
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
