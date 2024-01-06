import {
  Avatar,
  Button,
  Link,
  Grid,
  Box,
  CssBaseline,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
} from "@mui/material";

import axios from "axios";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const emailClickHandler = (event) => {
    setEmail(event.target.value);
    console.log(event.target.value);
  };

  const passwordClickHandler = (event) => {
    setPassword(event.target.value);
    console.log(event.target.value);
  };

  const roleClickHandler = (event) => {
    setRole(event.target.value);
  };

  
  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(email + password);

    // make POST request to server with user email and password

    const login = async (email, password, role) => {
      try {
        const res = await axios.post("http://localhost:5000/api/users/login", {
          email,
          password,
          role,
        });
        return res.data.payload;
      } catch (err) {
        console.error(err.response.data);
      }
    };

    // Call the login function with the user credentials
    const payload = await login(email, password,role);

    if (payload.user) {
      switch (payload.user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "teacher":
          navigate("/faculty");
          break;
        case "student":
        default:
          navigate("/student");
          break;
      }
    }

  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "white",
          }}
        >
          <Avatar sx={{ m: 1, backgroundColor: "white" }}>
            <LockOutlinedIcon color="customColor" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              color="customColor"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={emailClickHandler}
            />
            <TextField
              margin="normal"
              color="customColor"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={passwordClickHandler}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="customColor" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="customColor"
              sx={{ mt: 3, mb: 2, color: "white" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs sx={{ textAlign: "center" }}>
                <Link href="#" variant="body2" color="#A80109">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
