import React, { useState } from "react";
import HealthAssesment from "./HeathAssesment";
import AdminForm from "./Admin Form/AdminForm";
import EditAdminForm from "./Admin Form/EditAdminForm";
import Card from "../UI/Card/Card";
import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";

function Admin() {
  const [formState, setFormState] = useState("none");

  const handleFormState = (event, newFormState) => {
    if (newFormState !== null) {
      setFormState(newFormState);
    } else {
      setFormState("none");
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "2em",
            marginBottom: "2rem",
          }}
        >
          Welcome back, admin!
        </h1>
      </div>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ToggleButtonGroup
          value={formState}
          exclusive
          onChange={handleFormState}
          aria-label="admin form toggle buttons"
          sx={{
            "& .MuiToggleButton-root.Mui-selected": {
              backgroundColor: "customColor.main",
              color: "#fff",
            },
          }}
        >
          <ToggleButton value="facultyCheckup" aria-label="faculty checkup">
            Faculty Checkup
          </ToggleButton>
          <ToggleButton
            value="addStudentReport"
            aria-label="add student report"
          >
            Add Student Report
          </ToggleButton>
          <ToggleButton
            value="editStudentReport"
            aria-label="edit student report"
          >
            Edit Student Report
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {formState === "facultyCheckup" && <HealthAssesment />}
      {formState === "addStudentReport" && (
        <Card style={{ width: "40%", margin: "auto", marginTop: "2rem" }}>
          <AdminForm />
        </Card>
      )}
      {formState === "editStudentReport" && (
        <Card style={{ width: "40%", margin: "auto", marginTop: "2rem" }}>
          <EditAdminForm />
        </Card>
      )}
    </div>
  );
}

export default Admin;
