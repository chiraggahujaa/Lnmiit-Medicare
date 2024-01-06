import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import FacultyDetails from "./Faculty Vitals/FacultyDetails";
import BodyVitals from "./Faculty Vitals/BodyVitals";
import SubmittedDetails from "./Faculty Vitals/SubmittedDetails";
import Card from "../UI/Card/Card";
import axios from "axios";

const steps = ["Faculty Details", "Body Vitals", "Submitted Body Vitals"];

export default function HealthAssesment() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [facultyDetails, setFacultyDetails] = React.useState({});
  const [bodyVitals, setBodyVitals] = React.useState({});

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <FacultyDetails
            facultyDetails={facultyDetails}
            setFacultyDetails={setFacultyDetails}
          />
        );
      case 1:
        return (
          <BodyVitals bodyVitals={bodyVitals} setBodyVitals={setBodyVitals} />
        );
      case 2:
        return <SubmittedDetails facultyDetails={facultyDetails} bodyVitals={bodyVitals}/>;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

   const handleSubmit = async (e) => {
     e.preventDefault();

     try {
      const {
        uniqueId,
        firstName,
        lastName,
        department,
        gender,
        
      } = facultyDetails;

      const { height, weight, systolicBP, diastolicBP, spo2, bloodGlucose } =
        bodyVitals;

       const body = {
         uniqueId,
         name: firstName + lastName,
         dept: department,
         gender,
         height,
         weight,
         systolicBP,
         diastolicBP,
         spo2,
         bloodGlucose,
       };

       console.log(body);
       await axios.post("/api/faculty/create", body);

       console.log("Body vitals saved successfully");
     } catch (err) {
       console.error(err.message);
     }

     setActiveStep(activeStep + 1);
   };

  return (
    <>
      <CssBaseline />
      <Card style={{ width: "40%", margin: "auto", marginTop: "2rem" }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Health Assessment
          </Typography>
          <Stepper
            activeStep={activeStep}
            sx={{
              pt: 3,
              pb: 5,
              "& .MuiStepIcon-root": {
                color: "grey",
              },
              "& .MuiStepIcon-root.active": {
                color: "customColor.main",
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography>
                Your Body Vitals Data has been submitted :)
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button
                    onClick={handleBack}
                    sx={{ mt: 3, ml: 1 }}
                    color="customColor"
                  >
                    Back
                  </Button>
                )}

                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: 3, ml: 1, color: "white" }}
                    color="customColor"
                  >
                    Submit Details
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1, color: "white" }}
                    color="customColor"
                  >
                    Next
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Card>
    </>
  );
}
