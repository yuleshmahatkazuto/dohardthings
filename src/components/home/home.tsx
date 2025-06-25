import React, { useEffect, useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";

const home = () => {
  type Workout = {
    title: string;
    content: string;
  };
  const [workout, setWorkout] = useState<Workout>({ title: "", content: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWorkout = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/generate");
      setWorkout(res.data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
        gap: "20px",
      }}
    >
      <Typography
        sx={{
          width: "fit-content",
          fontSize: "2.5rem",
          color: "#bd512f",
          alignSelf: "flex-start",
        }}
      >
        {workout.title}
      </Typography>
      <Typography sx={{ width: "fit-content" }}>{workout.content}</Typography>

      <Box sx={{ display: "flex", gap: "15px" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={fetchWorkout}
          loading={loading}
        >
          Another Challenge
        </Button>
        <Button variant="contained" sx={{ backgroundColor: "#bd512f" }}>
          Mark Complete
        </Button>
      </Box>
    </Container>
  );
};

export default home;
