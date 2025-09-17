import { and, gte, lte, type Ref } from "@tanstack/react-db";
import {
  endOfTomorrow,
  format,
  isToday,
  isTomorrow,
  startOfToday,
  startOfTomorrow,
} from "date-fns";

export const isTodayWhere = (date: Ref<Date> | null) => {
  const start = startOfToday();
  const end = startOfTomorrow();
  return and(gte(date, start), lte(date, end));
};

export const isTomorrowWhere = (date: Ref<Date> | null) => {
  const start = startOfTomorrow();
  const end = endOfTomorrow();
  return and(gte(date, start), lte(date, end));
};

export const formatDate = (date: Date | null) => {
  if (!date) return "No date";
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return format(date, "dd/MM/yyyy");
};
