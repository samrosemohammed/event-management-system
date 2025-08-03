import type dayjs from "dayjs";

export type EventFormData = {
  title: string;
  description: string;
  venue: string;
  category?: string;
  dateTime: dayjs.Dayjs;
  maxAttendance?: number;
};

export const categories = ["Conference", "Workshop", "Meetup", "Webinar"];
