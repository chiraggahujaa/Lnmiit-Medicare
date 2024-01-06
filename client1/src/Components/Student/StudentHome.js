import React, { useState } from "react";
import StudentList from "./StudentList";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "./StudentHome.module.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";

const DUMMY_DATA = [
  {
    id: 1,
    date: new Date("2020-01-01"),
    consultant: "Dr. Chand",
    problem:
      "A child suffering from loose motions: The first entry in the dummy data represents a child who is experiencing loose motions. The consultation is with Dr. Chand, and the admission status is not admitted.",
    iv: false,
  },
  {
    id: 2,
    date: new Date("2021-02-01"),
    consultant: "Dr. Smith",
    problem:
      "A teenager with a high fever: This entry describes a teenager with a high fever. The consultation is with Dr. Singh, and the admission status is admitted for intravenous (IV) treatment.",
    iv: true,
  },
  {
    id: 3,
    date: new Date("2022-03-01"),
    consultant: "Dr. Lee",
    problem:
      "A young adult with a broken arm: This entry is about a young adult who has a broken arm. The consultation is with Dr. Patel, and the admission status is not admitted.",
    iv: true,
  },
  {
    id: 4,
    date: new Date("2023-04-01"),
    consultant: "Dr. Kim",
    problem:
      "An elderly patient with breathing difficulties: This entry is about an elderly patient who has difficulty breathing. The consultation is with Dr. Lee, and the admission status is admitted for IV treatment.",
    iv: false,
  },
  {
    id: 5,
    date: new Date("2023-05-01"),
    consultant: "Dr. Patel",
    problem:
      "A child with a severe headache: This entry describes a child who is experiencing a severe headache. The consultation is with Dr. Kumar, and the admission status is not admitted.",
    iv: false,
  },
];

const departments = ["CSE", "ECE", "MME"];
const instructors = ["John Doe", "Jane Smith", "Bob Johnson"];

function StudentHome(props) {
  const [selectedYear, setSelectedYear] = useState("");
  const [open, setOpen] = useState(false);
  const [newMakeup, setNewMakeup] = useState({
    id: "",
    date: "",
    problem: "",
    department: "",
    instructor: "",
  });

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMakeupChange = (event) => {
    setNewMakeup({
      ...newMakeup,
      [event.target.name]: event.target.value,
    });
  };

  const handleMakeupSubmit = () => {
    // TODO: Add the new makeup request to the data
    setOpen(false);
  };

  const filteredData = selectedYear
    ? DUMMY_DATA.filter(
        (data) => data.date.getFullYear() === Number(selectedYear)
      )
    : DUMMY_DATA;

  return (
    <>
      <div className={styles.outer}>
        <Card className={styles.studentsCard}>
          <div
            className={styles.filters}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <FormControl
              variant="outlined"
              className={styles.filter}
              sx={{ minWidth: 100 }}
            >
              <InputLabel htmlFor="year-select" color="customColor">
                Year
              </InputLabel>
              <Select
                defaultValue="All"
                value={selectedYear}
                onChange={handleYearChange}
                label="Year"
                inputProps={{
                  id: "year-select",
                }}
                color="customColor"
              >
                <MenuItem value="" color="customColor">
                  All
                </MenuItem>
                <MenuItem value="2020">2020</MenuItem>
                <MenuItem value="2021">2021</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleOpen}>
              Custom Makeup Request
            </Button>
          </div>

          {filteredData.map((data) => (
            <StudentList
              key={data.id}
              date={data.date}
              consultant={data.consultant}
              iv={data.iv}
              problem={data.problem}
            />
          ))}
        </Card>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Custom Makeup Request</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex" }}>
            <TextField
              autoFocus
              margin="dense"
              id="id"
              label="Unique ID"
              type="text"
              fullWidth
              style={{ marginRight: "1rem" }}
              onChange={handleMakeupChange}
              name="id"
            />
            <TextField
              margin="dense"
              id="date"
              label="Date"
              type="text"
              fullWidth
              onChange={handleMakeupChange}
              name="date"
            />
          </div>
          <TextField
            margin="dense"
            id="problem"
            label="Problem"
            multiline
            rows={4}
            fullWidth
            onChange={handleMakeupChange}
          />
          <div style={{ display: "flex", marginTop: "1rem" }}>
            <FormControl
              fullWidth
              style={{ marginRight: "1rem" }}
              onChange={handleMakeupChange}
            >
              <InputLabel htmlFor="department-select">Department</InputLabel>
              <Select id="department-select">
                {departments.map((dept) => (
                  <MenuItem value={dept}>{dept}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth onChange={handleMakeupChange}>
              <InputLabel htmlFor="instructor-select">
                Course Instructor
              </InputLabel>
              <Select id="instructor-select">
                {instructors.map((inst) => (
                  <MenuItem value={inst}>{inst}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleMakeupSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default StudentHome;
