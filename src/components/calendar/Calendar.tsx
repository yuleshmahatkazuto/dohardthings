"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Reactcalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type Props = {
  date: Value;
  setDate: React.Dispatch<React.SetStateAction<Value>>;
};

const Calendar = ({ date, setDate }: Props) => {
  const [workoutDates, setWorkoutDates] = useState<Date[]>([]);
  return (
    <Box>
      <Typography>Workout Calendar</Typography>
      <Reactcalendar
        onChange={setDate}
        value={date}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const matched = workoutDates.find(
              (d) =>
                d.getFullYear() === date.getFullYear() &&
                d.getMonth() === date.getMonth() &&
                d.getDate() === date.getDate()
            );
            return matched ? "workout-day" : null;
          }
        }}
      />
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
