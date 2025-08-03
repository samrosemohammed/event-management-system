import { Container } from "@mui/material";
import "./App.css";
import { EventForm } from "./components/event-form";
import { EventCard } from "./components/event-card";

function App() {
  return (
    <>
      <Container>
        <EventForm />
        <EventCard />
      </Container>
    </>
  );
}

export default App;
