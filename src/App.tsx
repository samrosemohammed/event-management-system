import { Container } from "@mui/material";
import "./App.css";
import { EventForm } from "./components/event-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container>
          <EventForm />
        </Container>
      </LocalizationProvider>
    </>
  );
}

export default App;
