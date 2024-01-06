import React from "react";
import { useState } from "react";

import {
  Button,
  Typography,
  Grid,
  CardContent,
  Card,
  IconButton,
  Tooltip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AttachmentIcon from "@mui/icons-material/Attachment";
import ClearIcon from "@mui/icons-material/Clear";

const theme = createTheme({
  spacing: 6,
  palette: {
    primary: {
      main: "#1976d2",
    },
    success: {
      main: "#4caf50",
    },
    error: {
      main: "#f44336",
    },
  },
});

function StudentList(props) {
  const { date, consultant, iv, problem } = props;
  const [attachment, setAttachment] = useState(null);

  const handleFileUpload = (event) => {
    setAttachment(event.target.files[0]);
  };

  const handleClearAttachment = () => {
    setAttachment(null);
  };

  const isAttachmentSelected = !!attachment;
  const attachmentText = isAttachmentSelected ? attachment.name : "Attach file";
  const requestMakeupDisabled = !isAttachmentSelected;

  return (
    <>
      <Card sx={{ marginBottom: theme.spacing(2) }}>
        <CardContent>
          <div
            style={{ marginBottom: "10px" }}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: theme.spacing(1),
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
            </Typography>
            <Typography sx={{ fontStyle: "italic" }}>
              by {consultant}
            </Typography>
          </div>
          <Typography sx={{ marginBottom: "10px" }}>{problem}</Typography>
          <Typography sx={{ marginBottom: "5px", fontWeight: "bold" }}>
            {iv ? (
              <span sx={{ color: theme.palette.success.main }}>Admitted</span>
            ) : (
              <span sx={{ color: theme.palette.error.main }}>Not Admitted</span>
            )}
          </Typography>
          <Grid
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "10px",
            }}
            alignItems="center"
          >
            <Tooltip title={attachmentText}>
              <IconButton
                sx={{
                  color: attachment ? theme.palette.success.main : "inherit",
                }}
                component="label"
                // disabled={isAttachmentSelected}
                onClick={handleClearAttachment} // move the event listener here
              >
                {attachment ? <ClearIcon /> : <AttachmentIcon />}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </IconButton>
            </Tooltip>

            <Button
              variant="contained"
              color="customColor"
              sx={{
                color: "white",
                marginLeft: theme.spacing(1),
              }}
              disabled={requestMakeupDisabled}
            >
              {requestMakeupDisabled
                ? "Attach file to request makeup"
                : "Request Makeup"}
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default StudentList;
