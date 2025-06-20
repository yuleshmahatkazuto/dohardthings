import React, { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import axios from "axios";

const home = () => {
  type Workout = {
    title: string;
    content: string;
  };
  const [workout, setWorkout] = useState<Workout>({ title: "", content: "" });

  const fetchWorkout = async () => {
    const res = await axios.get("/api/generate");
    setWorkout(res.data.result);
  };

  useEffect(() => {
    fetchWorkout();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        gap: "20px",
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{
          color: "#2979ff",
          fontFamily: "Edu NSW ACT Cursive, Cursive",
        }}
      >
        Your Daily Challenge
      </Typography>
      <Typography sx={{ width: "fit-content" }}>{workout.title}</Typography>
      <Typography sx={{ width: "fit-content" }}>{workout.content}</Typography>
      <Button variant="contained" color="secondary" onClick={fetchWorkout}>
        Another Challenge
      </Button>
    </Container>
  );
};

export default home;
