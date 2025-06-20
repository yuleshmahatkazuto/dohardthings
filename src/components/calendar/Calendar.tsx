"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Reactcalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar = () => {
  const [date, setDate] = useState<Value>(new Date());
  return (
    <Box>
      <Typography>Workout Calendar</Typography>
      <Reactcalendar onChange={setDate} value={date} />
      <Typography>
        Selected Date:{" "}
        {Array.isArray(date)
          ? `${date[0]?.toDateString() ?? "unknown"} to ${
              date[1]?.toDateString() ?? "unknown"
            }`
          : date instanceof Date
          ? date.toDateString()
          : "No date selected"}
      </Typography>
    </Box>
  );
};

export default Calendar;
