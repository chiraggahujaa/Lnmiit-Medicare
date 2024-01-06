import React from "react";
import {
  Grid,
  TextField,
  Typography,
  TextareaAutosize,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";

import { useState } from "react";

function AdminForm(props) {
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
      `Patient ${uniqueID} is ${isAdmitted? "admitted" : "checked"} for the problem of ${problem} and is being consulted by ${consultant}.`
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
            name="uniqueID"
            color="customColor"
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
        <Grid item xs={12} sx={{ marginTop: "15px" }}>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <Button
              variant="contained"
              color="customColor"
              onClick={() => handleProblemButtonClick("Headache")}
              style={{ color: "white" }}
            >
              Headache
            </Button>
            <Button
              variant="contained"
              color="customColor"
              onClick={() => handleProblemButtonClick("Cold")}
              style={{ marginLeft: "10px", color: "white" }}
            >
              Cold
            </Button>
            <Button
              variant="contained"
              color="customColor"
              onClick={() => handleProblemButtonClick("Cough")}
              style={{ marginLeft: "10px", color: "white" }}
            >
              Cough
            </Button>
            <Button
              variant="contained"
              color="customColor"
              onClick={() => handleProblemButtonClick("Body Pain")}
              style={{ marginLeft: "10px", color: "white" }}
            >
              Body Pain
            </Button>
          </div>
          <TextareaAutosize
            id="problem"
            name="Problem"
            placeholder="Problem"
            color="customColor"
            minRows={10}
            maxRows={15}
            style={{
              width: "95%",
              border: "1px solid #ccc",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              outline: "none",
            }}
            value={problem}
            onChange={(event) => setProblem(event.target.value)}
            variant="standard"
          />
        </Grid>
        <Grid sx={{ width: "100%", marginTop: "20px" }}>
          <div style={{ marginTop: "10px", marginLeft: "25px" }}>
            <Typography variant="h6">Admit Status:</Typography>
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAdmitted}
                      onChange={() => handleCheckboxChange(true)}
                      name="admitted"
                      color="customColor"
                    />
                  }
                  label="Admitted"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!isAdmitted}
                      onChange={() => handleCheckboxChange(false)}
                      name="notAdmitted"
                      color="customColor"
                    />
                  }
                  label="Not Admitted"
                />
              </FormGroup>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12} sx={{ width: "100%" }}>
          <FormControl variant="standard" sx={{ minWidth: 250 }}>
            <InputLabel
              id="demo-simple-select-standard-label"
              color="customColor"
            >
              Consultant
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={consultant}
              onChange={handleConsultantChange}
              label="Consultant"
            >
              <MenuItem value={"Dr. Chand"}>Dr. Chand</MenuItem>
              <MenuItem value={"Pushpa Devi"}>Pushpa Devi</MenuItem>
              <MenuItem value={"Nahar Singh Chaudhary"}>
                Nahar Singh Chaudhary
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="customColor"
            onClick={handleSubmit}
            style={{ color: "white" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default AdminForm;


