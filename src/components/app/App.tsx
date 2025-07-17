"use client";
import Home from "../home/home";
import { Box, Typography } from "@mui/material";
import Calendar from "../calendar/Calendar";
import react, { useState } from "react";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const App = () => {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{
          color: "#9C27B0",
          fontFamily: "Edu NSW ACT Cursive, Cursive",
          padding: "20px",
          textAlign: "center",
        }}
      >
        Your Daily Challenge
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "20px",
          height: "100%",
        }}
      >
        <Calendar date={selectedDate} setDate={setSelectedDate} />
        <Home date={selectedDate} />
      </Box>
    </Box>
  );
};

export default App;
