import { eq, type Ref } from "@tanstack/react-db";

export const isToday = (date: Ref<Date> | null) => {
  if (!date) return false;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return eq(date, today);
};
