import React from "react";
import { Button, Container, Typography } from "@mui/material";
const App = () => {
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
      <Typography sx={{ width: "fit-content" }}>
        <p>20 pushpups</p>
      </Typography>
      <Button variant="contained" color="secondary">
        Another Challenge
      </Button>
    </Container>
  );
};

export default App;
