import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { categories, type EventFormData } from "../types/event";

export const EventForm = () => {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<EventFormData>({
    defaultValues: {
      category: "",
      dateTime: dayjs(),
    },
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data: EventFormData) => {
    console.log("Form submitted: ", data);
    const existingEvents = JSON.parse(localStorage.getItem("events") || "[]");
    console.log("Existing event : ", existingEvents);

    const newEvent = {
      ...data,
      dateTime: data.dateTime.toISOString(),
    };

    localStorage.setItem(
      "events",
      JSON.stringify([...existingEvents, newEvent])
    );
    console.log("Event saved to local storage:", newEvent);
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Create a New Event
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create a New Event</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>
            Please fill out the event information below.
          </DialogContentText>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 2 }}
          >
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              {...register("description", {
                required: "Description is required",
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="Venue"
              fullWidth
              margin="normal"
              {...register("venue", { required: "Venue is required" })}
              error={!!errors.venue}
              helperText={errors.venue?.message}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="dateTime"
                control={control}
                rules={{ required: "Date and time is required" }}
                render={({ field }) => (
                  <DateTimePicker
                    {...field}
                    label="Event Date & Time"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: "normal",
                        error: !!errors.dateTime,
                        helperText: errors.dateTime?.message,
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select {...field} labelId="category-label" label="Category">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {categories.map((c) => (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <TextField
              label="Max Attendance"
              fullWidth
              margin="normal"
              type="number"
              {...register("maxAttendance", {
                min: {
                  value: 1,
                  message: "Must be at least 1",
                },
              })}
              error={!!errors.maxAttendance}
              helperText={errors.maxAttendance?.message}
            />

            <DialogActions sx={{ mt: 1 }}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Add Event
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
