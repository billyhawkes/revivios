import { format, isToday, isTomorrow } from "date-fns";

export const formatDate = (date: Date | null) => {
  if (!date) return "No date";
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return format(date, "dd/MM/yyyy");
};
