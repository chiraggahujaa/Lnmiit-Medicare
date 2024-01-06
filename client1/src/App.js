import React from "react";
import LoginPage from "./pages/LoginPage";
import StudentHome from "./Components/Student/StudentHome";
import AdminPage from "./pages/AdminPage";
import FaculyPage from "./pages/FaculyPage";
import RootLayout from "./pages/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loader as facultyBodyVitalLoader } from "./Components/Faculty/BodyVitalsList";

const theme = createTheme({
  palette: {
    customColor: {
      main: "#A80109",
      text: "#ffffff",
    },
  },
});

const router = createBrowserRouter([
  {
    index: "/",
    element: <HomePage />,
  },
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "student", element: <StudentHome /> },
      { path: "admin", element: <AdminPage /> },
      {
        path: "faculty",
        element: <FaculyPage />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
