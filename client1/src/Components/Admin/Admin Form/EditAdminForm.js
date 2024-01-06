import React from "react";
import {
  Grid,
  TextField,
  Typography,
  TextareaAutosize,
  Button,
} from "@mui/material";

import { useState } from "react";
import Card from "../../UI/Card/Card";

function EditAdminForm(props) {
  const [uniqueID, setUniqueId] = useState("");
  const [isAdmitted, setIsAdmitted] = useState(false);
  const [problem, setProblem] = useState("");
  const [consultant, setConsultant] = useState("Dr. Chand");

  const handleProblemButtonClick = (textToAdd) => {
    setProblem(textToAdd);
  };

  const handleCheckboxChange = (admit) => {
    setIsAdmitted(admit);
  };

  const handleConsultantChange = (event) => {
    setConsultant(event.target.value);
  };

  const handleSubmit = () => {
    window.alert(
      `Patient ${uniqueID} is ${
        isAdmitted ? "admitted" : "checked"
      } for the problem of ${problem} and is being consulted by ${consultant}.`
    );
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Add Student Detials
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="uniqueID"
            color ="customColor"
            name="uniqueID"
            label="Unique ID"
            fullWidth
            autoComplete="uniqueID"
            variant="standard"
            value={uniqueID}
            onChange={(event) => {
              setUniqueId(event.target.value);
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color ="customColor" onClick={handleSubmit} sx={{color:"white"}}>
            Find Record
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default EditAdminForm;
