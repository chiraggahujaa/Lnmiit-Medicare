import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  Box,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const ApprovalPending = ({ requests, onApprove }) => {
  const { color } = useSelector((state) => state.color);
  return (
    <Box component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="center">Student ID</TableCell>
            <TableCell align="center">Problem</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Consulted by</TableCell>
            <TableCell align="center">Approve Makeup Request</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell component="th" scope="row">
                <Typography variant="body2" color="text.secondary">
                  {request.date.toLocaleDateString()}
                </Typography>
              </TableCell>
              <TableCell align="center">{request.studentId}</TableCell>
              <TableCell align="center">{request.problemText}</TableCell>
              <TableCell align="center">
                <Typography variant="body2" color="text.secondary">
                  {request.admitted ? "Admitted" : "Not Admitted"}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2" color="text.secondary">
                  {request.consultedBy}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onApprove(request.id)}
                  style={{ marginRight: "8px", backgroundColor: color }}
                >
                  Approve
                </Button>
                <Button variant="outlined" color="customColor">
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ApprovalPending;
