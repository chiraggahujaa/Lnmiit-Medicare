import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import Card from "./UI/Card/Card";

import lnmiit from "../Images/lnmiit.jpg";
import cp from "../Images/cp.jpg";
import bg from "../Images/bg.jpg";
import logo from "../Images/logo.png";

const HeroPage = () => {
  const navigate = useNavigate();
  const [bgImage, setBgImage] = useState(bg);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (bgImage === lnmiit) {
        setBgImage(cp);
      } else if (bgImage === cp) {
        setBgImage(bg);
      } else {
        setBgImage(lnmiit);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [bgImage]);

  const getStartedHandler = () => {
    navigate("/login");
  };

  const style = useMemo(
    () => ({
      display: "flex",
      minHeight: "100vh",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      animation: "slideShow 15s linear infinite",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: `url(${bgImage})`,
    }),
    [bgImage]
  );

 

  return (
    <div style={style}>
    
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "3rem",
          paddingRight: "1.5rem",
          paddingLeft: "1.5rem",
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "16px",
        }}
      >
        <img
          src={logo}
          alt="Logo :)"
          style={{ width: "100%", maxWidth: "300px" }}
        />
        <Box sx={{display : "flex", flexDirection : "column", justifyContent:"center", alignItems:"center" }}>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            style={{ fontWeight: 700 }}
          >
            LNMIIT Medicare
          </Typography>
          <Button
            variant="contained"
            color="customColor"
            size="large"
            onClick={getStartedHandler}
            style={{ fontWeight: 700, color: "white" }}
          >
            Get Started
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default HeroPage;
