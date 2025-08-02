export interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  type: string;
  priority: "low" | "medium" | "high";
  organizer?: string;
  maxAttendees?: number;
}
