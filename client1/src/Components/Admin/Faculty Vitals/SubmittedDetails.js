import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {Box} from "@mui/material";

export default function SubmittedDetails({ facultyDetails, bodyVitals }) {
  console.log(facultyDetails);
  console.log(bodyVitals);
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Faculty Details
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: "30px" }}>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Faculty Name:</strong>{" "}
            {facultyDetails.firstName + " " + facultyDetails.lastName}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Department:</strong> {facultyDetails.department}
          </Typography>
        </Grid>
        {facultyDetails.gender !== "Prefer not to say" && (
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Gender:</strong> {facultyDetails.gender}
            </Typography>
          </Grid>
        )}
      </Grid>

      <Typography variant="h6" gutterBottom>
        Body Vitals
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Height:</strong> {bodyVitals.height} cm
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Weight:</strong> {bodyVitals.weight} kg
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Systolic Blood Pressure:</strong> {bodyVitals.systolicBP}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Diastolic Blood Pressure:</strong> {bodyVitals.diastolicBP}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}