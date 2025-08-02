import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";

const fields = [
  { id: "title", label: "Event Title", type: "text" },
  { id: "description", label: "Description", type: "text" },
  { id: "venue", label: "Event Venue", type: "text" },
  { id: "category", label: "Category", type: "select" },
  { id: "attendance", label: "Max Attendance", type: "text" },
];

export const EventForm = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Create a New Event
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Event</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>
            Please fill out the event information below.
          </DialogContentText>
          <form>
            {fields.map(({ id, label, type }) => {
              if (type === "select") {
                return (
                  <FormControl key={id} sx={{ width: "100%", mt: 2 }}>
                    <InputLabel id={`${id}-label`}>{label}</InputLabel>
                    <Select
                      labelId={`${id}-label`}
                      id={id}
                      label={label}
                      // onChange and value can be added here
                    >
                      <MenuItem value="ten">Ten</MenuItem>
                      <MenuItem value="twenty">Twenty</MenuItem>
                    </Select>
                  </FormControl>
                );
              }

              const fieldComponent = (
                <TextField
                  key={id}
                  autoFocus={id === "name"}
                  margin="dense"
                  id={id}
                  name={id}
                  label={label}
                  type={type}
                  fullWidth
                  variant="outlined"
                />
              );

              if (id === "venue") {
                return (
                  <div key={id}>
                    {fieldComponent}
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker label="Event Date & Time" />
                    </DemoContainer>
                  </div>
                );
              }

              return fieldComponent;
            })}

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add Event</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
