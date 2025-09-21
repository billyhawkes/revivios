import { format, isToday, isTomorrow, isYesterday } from "date-fns";

export const formatDate = (date: Date | null) => {
  if (!date) return "No date";
  if (isYesterday(date)) return "Yesterday";
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return format(date, "dd/MM/yyyy");
};
