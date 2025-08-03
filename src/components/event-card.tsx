import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Chip,
  Divider,
  Avatar,
} from "@mui/material";
import {
  CalendarToday,
  DeleteOutline,
  Edit,
  History,
  LocationOn,
  People,
} from "@mui/icons-material";
import dayjs from "dayjs";
import type { EventFormData } from "../types/event";
import { useState } from "react";
import { EventForm } from "./event-form";
import { AlertDialog } from "./alert-dialog";
import { AppSnackbar } from "./app-snackbar";

export const EventCard = () => {
  const events = JSON.parse(localStorage.getItem("events") || "[]");
  const [showToast, setShowToast] = useState(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<EventFormData | undefined>(
    undefined
  );
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [eventToDelete, setEventToDelete] = useState<EventFormData | null>(
    null
  );
  if (events.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
          mt: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            fontStyle: "italic",
          }}
        >
          No events found.
        </Typography>
      </Box>
    );
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      conference: "primary",
      workshop: "secondary",
      meeting: "success",
      social: "warning",
      training: "info",
      default: "default",
    };
    return colors[category?.toLowerCase()] || colors.default;
  };

  const getCategoryIcon = (category: string) => {
    return category?.charAt(0)?.toUpperCase() || "E";
  };

  const handleCloseEdit = () => setEdit(false);

  const handleDeleteConfirmed = () => {
    if (!eventToDelete) return;
    const existingEvents: EventFormData[] = JSON.parse(
      localStorage.getItem("events") || "[]"
    );
    const updatedEvents = existingEvents.filter(
      (e) => e.id !== eventToDelete.id
    );
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setAlertOpen(false);
    setShowToast(true);
    setEventToDelete(null);
  };

  return (
    <Box sx={{ mt: 3 }}>
      {events.map((event: EventFormData, index: number) => {
        const isPastEvent = dayjs(event.dateTime).isBefore(dayjs());

        return (
          <Card
            key={index}
            sx={{
              maxWidth: "100%",
              mb: 3,
              borderRadius: 2,
              opacity: isPastEvent ? 0.6 : 1, // Dim past events
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              },
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: 600,
                      color: "primary.main",
                      mb: 1,
                    }}
                  >
                    {event.title}
                  </Typography>
                  {isPastEvent && (
                    <Chip
                      icon={<History />}
                      label="Past Event"
                      color="default"
                      variant="outlined"
                      size="small"
                      sx={{
                        fontSize: "0.75rem",
                        height: "24px",
                        color: "text.secondary",
                        borderColor: "grey.400",
                      }}
                    />
                  )}
                </Box>

                {event.category && (
                  <Chip
                    avatar={
                      <Avatar
                        sx={{
                          bgcolor: `${getCategoryColor(event.category)}.main`,
                          color: "white",
                          fontSize: "0.8rem",
                        }}
                      >
                        {getCategoryIcon(event.category)}
                      </Avatar>
                    }
                    label={event.category}
                    color={getCategoryColor(event.category) as any}
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>

              {event.description && (
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    mb: 2,
                    lineHeight: 1.6,
                  }}
                >
                  {event.description}
                </Typography>
              )}

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarToday
                    sx={{ color: "primary.main", fontSize: "1.2rem" }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {dayjs(event.dateTime).format("MMMM D, YYYY h:mm A")}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn
                    sx={{ color: "error.main", fontSize: "1.2rem" }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {event.venue}
                  </Typography>
                </Box>

                {event.maxAttendance && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <People
                      sx={{ color: "success.main", fontSize: "1.2rem" }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Max Attendance: {event.maxAttendance}
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>

            <CardActions
              sx={{
                px: 3,
                pb: 2,
                pt: 0,
                justifyContent: "space-between",
              }}
            >
              <Button
                variant={isPastEvent ? "outlined" : "contained"}
                size="small"
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                }}
                disabled={isPastEvent}
              >
                {isPastEvent ? "Event Completed" : "View Details"}
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                  onClick={() => {
                    setEdit(true);
                    setSelectedEvent(event);
                  }}
                >
                  <Edit fontSize="inherit" />
                  Edit
                </Button>
                <Button
                  variant="text"
                  size="small"
                  color="error"
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                  onClick={() => {
                    setAlertOpen(true);
                    setEventToDelete(event);
                  }}
                >
                  <DeleteOutline fontSize="inherit" />
                  Delete
                </Button>
              </Box>
            </CardActions>
          </Card>
        );
      })}
      {edit && (
        <EventForm
          isEditMode={edit}
          onClose={handleCloseEdit}
          defaultValues={selectedEvent}
        />
      )}
      {alertOpen && (
        <AlertDialog
          open={alertOpen}
          onClose={() => {
            setAlertOpen(false);
            setEventToDelete(null);
          }}
          title="Confirm Deletion"
          description="Are you sure you want to delete this event? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          showCancel={true}
          onConfirm={handleDeleteConfirmed}
        />
      )}
      <AppSnackbar
        open={showToast}
        onClose={() => setShowToast(false)}
        message={"Event Deleted"}
        severity="success"
      />
    </Box>
  );
};
