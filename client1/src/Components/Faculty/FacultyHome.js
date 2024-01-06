import React from "react";
import { useState } from "react";

import { ToggleButtonGroup, Box, ToggleButton } from "@mui/material";
import Card from "../UI/Card/Card";
import BodyVitalsList from "./BodyVitalsList";
import ApprovalPending from "./ApprovalPending";

import { useSelector } from "react-redux";

const FacultyHome = () => {
  const bodyVitals = [
    {
      date: new Date(2022, 1, 14),
      height: 68,
      weight: 162,
      systolic: 122,
      diastolic: 81,
      spO2: 98,
      bloodGlucose: 80,
    },
    {
      date: new Date(2022, 3, 18),
      height: 68,
      weight: 166,
      systolic: 126,
      diastolic: 83,
      spO2: 95,
      bloodGlucose: 90,
    },
    {
      date: new Date(2022, 0, 15),
      height: 68,
      weight: 160,
      systolic: 120,
      diastolic: 80,
      spO2: 99,
      bloodGlucose: 85,
    },
    {
      date: new Date(2022, 2, 16),
      height: 68,
      weight: 164,
      systolic: 124,
      diastolic: 82,
      spO2: 96,
      bloodGlucose: 95,
    },
  ];

  const pendingMakeupApprovals = [
    {
      id: 1,
      studentId: "ABC123",
      problemText: "Missed exam due to illness",
      admitted: false,
      consultedBy: "John Doe",
      date: new Date("2022-03-01"),
    },
    {
      id: 2,
      studentId: "DEF456",
      problemText: "Missed assignment deadline due to family emergency",
      admitted: true,
      consultedBy: "Jane Smith",
      date: new Date("2022-03-05"),
    },
    {
      id: 3,
      studentId: "GHI789",
      problemText: "Missed lab session due to car breakdown",
      admitted: false,
      consultedBy: "Bob Johnson",
      date: new Date("2022-03-10"),
    },
    {
      id: 4,
      studentId: "JKL012",
      problemText: "Missed quiz due to technical difficulties",
      admitted: false,
      consultedBy: "Sarah Lee",
      date: new Date("2022-03-15"),
    },
    {
      id: 5,
      studentId: "MNO345",
      problemText: "Missed class due to family vacation",
      admitted: true,
      consultedBy: "David Kim",
      date: new Date("2022-03-20"),
    },
  ];

  const {color} = useSelector(state => state.color);

  const [formState, setFormState] = useState("none");

  const handleFormState = (event, newFormState) => {
    if (newFormState !== null) {
      setFormState(newFormState);
    } else {
      setFormState("none");
    }
  };

  const handleApproveReq = (id) => {
    console.log(id);
  }

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "2em",
            marginBottom: "2rem",
          }}
        >
          Welcome back, Faculty!
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
              backgroundColor: `${color}`,
              color: "#fff",
            },
          }}
        >
          <ToggleButton value="checkBodyVitals" aria-label="check body vitals">
            Check Body Vitals
          </ToggleButton>
          <ToggleButton value="pendingApproval" aria-label="pending approval">
            Pending Approval Request
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {formState === "checkBodyVitals" && (
        <Card style={{ width: "40%", margin: "auto", marginTop: "2rem" }}>
          <BodyVitalsList bodyVitals={bodyVitals} />
        </Card>
      )}
      {formState === "pendingApproval" && (
        <Card style={{ width: "80%", margin: "auto", marginTop: "2rem" }}>
          <ApprovalPending
            requests={pendingMakeupApprovals}
            onApprove={handleApproveReq}
          />
        </Card>
      )}
    </>
  );
};

export default FacultyHome;
