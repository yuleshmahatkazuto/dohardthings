import React, { useEffect, useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";

type Workout = {
  title: string;
  content: string;
  id: Number;
  completed: boolean;
};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type Props = {
  date: Value;
};
const home = ({ date }: Props) => {
  const [workout, setWorkout] = useState<Workout>({
    title: "",
    content: "",
    id: 0,
    completed: false,
  });
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

  async function handleMark() {
    const year = date instanceof Date ? date.getFullYear() : null;
    const month =
      date instanceof Date
        ? (date.getMonth() + 1).toString().padStart(2, "0")
        : null;
    const day =
      date instanceof Date ? date.getDate().toString().padStart(2, "0") : null;
    const localDateString = `${year}-${month}-${day}`;
    console.log("The Date is" + localDateString);
    try {
      const response = await axios.post("api/mark", {
        id: workout.id,
        date: localDateString,
      });
    } catch (error) {
      console.log(error);
    }
  }

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
        <Button
          variant="contained"
          sx={{ backgroundColor: "#bd512f" }}
          onClick={handleMark}
        >
          Mark Complete
        </Button>
      </Box>
    </Container>
  );
};

export default home;
