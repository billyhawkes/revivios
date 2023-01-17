import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { useEffect, useReducer, useState } from "react";

dayjs.extend(isToday);

export const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const SHORTMONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Days of month array

export const getMonthArray = (date: Date): (Date | null)[] => {
  const datejs = dayjs(date);
  const year = datejs.year();
  const month = datejs.month();

  const dates = [];
  for (let i = 0; i < datejs.day(); i++) {
    dates.push(null);
  }
  for (let i = 1; i <= datejs.daysInMonth(); i++) {
    dates.push(dayjs(`${year}-${month + 1}-${i}`).toDate());
  }

  return dates;
};

type MonthYear = {
  month: number;
  year: number;
};

enum Actions {
  NextMonth = "nextMonth",
  PrevMonth = "prevMonth",
}

type Action = {
  type: Actions;
  payload: MonthYear;
};

const reducer = (state: MonthYear, action: Action) => {
  switch (action.type) {
    case Actions.NextMonth:
      if (state.month >= 11) {
        return { month: 0, year: state.year + 1 };
      } else {
        return { ...state, month: state.month + 1 };
      }
    case Actions.PrevMonth:
      if (state.month <= 0) {
        return { month: 11, year: state.year - 1 };
      } else {
        return { ...state, month: state.month - 1 };
      }
  }
};

const useCalendar = (date: Date | null) => {
  date = date ?? new Date();
  const [monthYear, dispatch] = useReducer(reducer, {
    month: dayjs(date).month(),
    year: dayjs(date).year(),
  });
  const [dates, setDates] = useState<(Date | null)[]>();

  useEffect(() => {
    setDates(
      getMonthArray(
        dayjs(`${monthYear.year}-${monthYear.month + 1}-1`).toDate()
      )
    );
  }, [monthYear]);

  const nextMonth = () => {
    dispatch({ type: Actions.NextMonth, payload: monthYear });
  };

  const prevMonth = () => {
    dispatch({ type: Actions.PrevMonth, payload: monthYear });
  };

  return { dates, monthYear, nextMonth, prevMonth };
};

export default useCalendar;
