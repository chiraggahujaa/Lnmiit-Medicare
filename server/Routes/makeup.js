const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../server/UploadedImages");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });
const imagePath = path.join(__dirname, "../UploadedImages");

// model
const StudentRequest = require("../Models/StudentRequest");
const ApprovedId = require("../Models/ApprovedId");
const HealthReport = require("../Models/HealthReport");

// sends students request to database
router.post("/request/:studentId", upload.single("file"), async (req, res) => {
  try {
    const { studentId } = req.params;
    const { teacherId, course, consultant, problem, date,  serialNo } = req.body;

    const healthReport = await HealthReport.findOne({
      consultant: consultant,
      problem: problem
    });

    if(!healthReport){
      res
        .status(401)
        .json({ message: "Not able to process this student request", err });
        return;
      }

    const request = new StudentRequest({
      studentId,
      teacherId,
      course,
      healthReport,
      serialNo,
      status: "initial",
      attachment: req.file.filename,
    });
    await request.save().then(res => {console.log("Request Saved.")}).catch(err => {console.log("Request not saved.", err)});

    res
      .status(200)
      .json({ id: request._id, message: "Successfully created a request!" });
  } catch (err) {
    res
      .status(401)
      .json({ message: "Not able to process this student request", err });
  }
});

// Get request data from studentId
router.get("/studentRequest/:studentId", async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const studentReq = await StudentRequest.find({ studentId });
    if(!studentReq)
      res.status(500).json({ error: "Internal Server Error" });

    const newReq = await Promise.all(
      studentReq.map(async (request) => {
        const healthReport = await HealthReport.findById(request.healthReport);
        return { ...healthReport._doc, ...request._doc, _id: request._id };
      })
    );

    res.status(200).json(newReq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// create custom makeup
router.post(
  "/customMakeup/:studentId",
  upload.single("file"),
  async (req, res) => {
    try {
      const { studentId } = req.params;
      const { date, consultant, problem, teacherId, course, isAdmitted } =
        req.body;
      console.log(date, consultant, problem, teacherId, course, isAdmitted);

      const healthReport = new HealthReport({
        consultant,
        problem,
        date,
        isAdmitted,
      });
      await healthReport
        .save()
        .then((a) => console.log("Health Report Created"))
        .catch((err) => console.log(err.message));

      const request = new StudentRequest({
        studentId,
        teacherId,
        healthReport,
        status: "initial",
        customMakeup: true,
        course,
        attachment: req.file.filename,
      });
      await request.save();

      res
        .status(200)
        .json({ id: request._id, message: "Successfully created a request!" });
    } catch (err) {
      res
        .status(401)
        .json({ message: "Not able to process this student request", err });
    }
  }
);

// admin create approved {serialNo, uniqueId}
router.post("/create", async (req, res) => {
  try {
    const { serialNo, uniqueId } = req.body;

    const data = await ApprovedId.find({ uniqueId, serialNo });
    if (data.length != 0) {
      res.status(200).json({ msg: "Approval request already exist." });
    } else {
      const approved = new ApprovedId({
        serialNo,
        uniqueId,
      });
      await approved.save();

      res.status(200).json({ msg: "Serial ID approval created successfully." });
    }
  } catch (err) {
    res
      .status(401)
      .json({ msg: `Not able to approve this serial ID because ${err}` });
  }
});

// Serve the image
router.get("/getImage/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(imagePath, filename);
  console.log(filePath);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ msg: "Image not found" });
  }
});

// retrives data from teacherId => to display it
router.get("/request/:teacherId", async (req, res) => {
  const { teacherId } = req.params;
  console.log(teacherId);

  StudentRequest.find({ teacherId })
    .then(async (data) => {
      
      const newData = await Promise.all(
        data.map(async (obj) => {
          const imageURL = obj.attachment
            ? `/getImage/${obj.attachment}`
            : "";
          const report = await HealthReport.findById(obj.healthReport);
          return {
            ...report._doc,
            ...obj._doc,
            _id: obj._doc._id,
            date: new Date(report._doc.date),
            url : imageURL
          };
        })
      );

      console.log(newData);
      res.status(200).json(newData);
    })
    .catch((err) => {
      res.status(401).json({ msg: "Data not found" });
    });
});

// approve request
router.put("/:requestId/approve", async (req, res) => {
  try {
    const { requestId } = req.params;

    const studentReq = await StudentRequest.findById(requestId);

    studentReq.status = "approved";
    await studentReq.save();

    res.status(200).json({ message: "Request Approved" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Internal Server Error" });
  }
});
// not approve request
router.put("/:requestId/cancel", async (req, res) => {
  try {
    const { requestId } = req.params;
    const studentReq = await StudentRequest.findById(requestId);

    studentReq.status = "notapproved";
    await studentReq.save();

    res.status(200).json({ message: "Request NotApproved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// teacher checks serial no when approving the request
router.get("/checkSerialNo/:serialNo/:uniqueId", async (req, res) => {
  const { serialNo, uniqueId } = req.params;
  // console.log(serialNo, uniqueId);
  try {
    const data = await ApprovedId.find({ uniqueId, serialNo });
    // console.log(data);
    res.status(200).json({ approved: data.length != 0, data });
  } catch (err) {
    res.status(401).json({ msg: `Error Approving your request : ${err}` });
  }
});

module.exports = router;
