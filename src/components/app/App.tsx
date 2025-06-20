"use client";
import Home from "../home/home";
import { Box } from "@mui/material";
import Calendar from "../calendar/Calendar";

const App = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        minHeight: "100vh",
        gap: "20px",
        width: "100%",
        margin: "20px",
      }}
    >
      <Calendar />
      <Home />
    </Box>
  );
};

export default App;
