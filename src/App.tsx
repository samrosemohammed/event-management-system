import { Box, Container, Typography } from "@mui/material";
import "./App.css";
import { EventForm } from "./components/event-form";
import { EventCard } from "./components/event-card";

function App() {
  return (
    <>
      <Container>
        <Box sx={{ py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.2rem",
                  md: "2.5rem",
                  lg: "3rem",
                },
              }}
              gutterBottom
            >
              Event Management System
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Organize and manage your events efficiently
            </Typography>
          </Box>
          <EventForm />
          <EventCard />
        </Box>
      </Container>
    </>
  );
}

export default App;
