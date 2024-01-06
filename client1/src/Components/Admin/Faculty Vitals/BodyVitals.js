import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function BodyVitals({ bodyVitals, setBodyVitals }) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [systolicBP, setSystolicBP] = useState("");
  const [diastolicBP, setDiastolicBP] = useState("");
  const [spo2, setSpo2] = useState("");
  const [bloodGlucose, setBloodGlucose] = useState("");

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
    setBodyVitals((prevBodyVitals) => ({
      ...prevBodyVitals,
      height: Number(event.target.value),
    }));
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
    setBodyVitals((prevBodyVitals) => ({
      ...prevBodyVitals,
      weight: Number(event.target.value),
    }));
  };

  const handleSystolicBPChange = (event) => {
    setSystolicBP(event.target.value);
    setBodyVitals((prevBodyVitals) => ({
      ...prevBodyVitals,
      systolicBP: Number(event.target.value),
    }));
  };

  const handleDiastolicBPChange = (event) => {
    setDiastolicBP(event.target.value);
    setBodyVitals((prevBodyVitals) => ({
      ...prevBodyVitals,
      diastolicBP: Number(event.target.value),
    }));
  };

  const handleSpo2Change = (event) => {
    setSpo2(event.target.value);
    setBodyVitals((prevBodyVitals) => ({
      ...prevBodyVitals,
      spo2: Number(event.target.value),
    }));
  };

  const handleBloodGlucoseChange = (event) => {
    setBloodGlucose(event.target.value);
    setBodyVitals((prevBodyVitals) => ({
      ...prevBodyVitals,
      bloodGlucose: Number(event.target.value),
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle form submission
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Body Vitals
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="sp02"
            name="sp02"
            label="SpO2"
            fullWidth
            variant="standard"
            value={spo2}
            onChange={handleSpo2Change}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="bloodGlucose"
            name="bloodGlucose"
            label="Blood Glucose Level"
            fullWidth
            variant="standard"
            value={bloodGlucose}
            onChange={handleBloodGlucoseChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="systolicBP"
            name="systolicBP"
            label="Systolic Blood Pressure"
            fullWidth
            variant="standard"
            value={systolicBP}
            onChange={handleSystolicBPChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="diastolicBP"
            name="diastolicBP"
            label="Diastolic Blood Pressure"
            fullWidth
            variant="standard"
            value={diastolicBP}
            onChange={handleDiastolicBPChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="height"
            name="height"
            label="Height (cm)"
            fullWidth
            variant="standard"
            value={height}
            onChange={handleHeightChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="weight"
            name="weight"
            label="Weight (kg)"
            fullWidth
            variant="standard"
            value={weight}
            onChange={handleWeightChange}
          />
        </Grid>
      </Grid>
    </form>
  );
}
