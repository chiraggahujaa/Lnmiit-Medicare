import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material/";

export default function FacultyDetails({ facultyDetails, setFacultyDetails }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [uniqueId, setUniqueId] = React.useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setFacultyDetails({
      ...facultyDetails,
      firstName: event.target.value,
    });
  };

  const handleUniqueIdChange = (event) => {
    setUniqueId(event.target.value);
    setFacultyDetails({
      ...facultyDetails,
      uniqueId: event.target.value,
    });
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setFacultyDetails({
      ...facultyDetails,
      lastName: event.target.value,
    });
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    setFacultyDetails({
      ...facultyDetails,
      department: event.target.value,
    });
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setFacultyDetails({
      ...facultyDetails,
      gender: event.target.value,
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Faculty Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ display: "flex" }}>
          <TextField
            required
            id="uniqueId"
            name="uniqueId"
            label="Unique ID"
            autoComplete="off"
            variant="standard"
            value={uniqueId}
            onChange={handleUniqueIdChange}
            sx={{ width: "100%", marginRight: "1rem" }}
          />
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={firstName}
            onChange={handleFirstNameChange}
            sx={{ marginRight: "1rem" }}
          />
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex" }}>
          
          
          <FormControl
            variant="standard"
            sx={{ minWidth: 220, marginRight: "1rem" }}
          >
            <InputLabel id="demo-simple-select-standard-label">
              Department
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={department}
              label="Dept"
              onChange={handleDepartmentChange}
            >
              <MenuItem value={"CSE"}>CSE</MenuItem>
              <MenuItem value={"ECE"}>ECE</MenuItem>
              <MenuItem value={"ECE"}>ECE</MenuItem>
              <MenuItem value={"Mathematics"}>Mathematics</MenuItem>
              <MenuItem value={"Physics"}>Physics</MenuItem>
              <MenuItem value={"HSS"}>HSS</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ minWidth: 230 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Gender
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={gender}
              label="Gender"
              onChange={handleGenderChange}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
              <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
