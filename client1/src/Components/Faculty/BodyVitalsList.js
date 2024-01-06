import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import Card from "../UI/Card/Card";
import { sort } from "ramda";
import { Sort as SortIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";

const BodyVitalsList = ({ bodyVitals }) => {
  
  useEffect(()=>{
    
  },[]);

  const [sortedBodyVitals, setSortedBodyVitals] = useState(bodyVitals);
  const [sortOrder, setSortOrder] = useState("desc");

  const { color } = useSelector((state) => state.color);

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    const sorted = sort(
      (a, b) =>
        sortOrder === "asc"
          ? a.date.getTime() - b.date.getTime()
          : b.date.getTime() - a.date.getTime(),
      bodyVitals
    );
    setSortedBodyVitals(sorted);
    setSortOrder(newSortOrder);
  };


  return (
    <List>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Your Body Vitals
        </Typography>
        <Button onClick={handleSort} size="small" sx={{color : color}}>
          <SortIcon />
          <Typography variant="button" sx={{ ml: 0.5 }}>
            Sort
          </Typography>
        </Button>
      </div>
      {sortedBodyVitals.map((vitals) => (
        <Card style={{ marginTop: "1rem" }}>
          <ListItem key={vitals.date}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" align="right">
                  {`${vitals.date.getDate()}/${
                    vitals.date.getMonth() + 1
                  }/${vitals.date.getFullYear()}`}
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="subtitle2" gutterBottom>
                    Height: {vitals.height} cm
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    Weight: {vitals.weight} kg
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    Systolic Blood Pressure: {vitals.systolic} mmHg
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    Diastolic Blood Pressure: {vitals.diastolic} mmHg
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    SpO2: {vitals.spO2}%
                  </Typography>
                  <Typography variant="subtitle2">
                    Blood Glucose: {vitals.bloodGlucose} mg/dL
                  </Typography>
                </>
              }
            />
          </ListItem>
        </Card>
      ))}
    </List>
  );
};

export const loader = async () => {
  try {
    const response = await axios.get("/api/bodyvitals", {
      params: 1,
    });
    return response.data;
  } catch (err) {
    console.error(err.message);
    throw new Error("Failed to get body vitals by uniqueId");
  }
};

export default BodyVitalsList;
