import dayjs, { Dayjs } from "dayjs";
import { DAYS, getMonthArray } from "../../services/date";
import { useEffect, useReducer, useState } from "react";

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

const useDatePicker = (date: Date | null) => {
	date = date ?? new Date();
	const [monthYear, dispatch] = useReducer(reducer, {
		month: dayjs(date).month(),
		year: dayjs(date).year(),
	});
	const [dates, setDates] = useState<(Date | null)[]>();

	useEffect(() => {
		setDates(getMonthArray(dayjs(`${monthYear.year}-${monthYear.month + 1}-1`).toDate()));
	}, [monthYear]);

	const nextMonth = () => {
		dispatch({ type: Actions.NextMonth, payload: monthYear });
	};

	const prevMonth = () => {
		dispatch({ type: Actions.PrevMonth, payload: monthYear });
	};

	return { dates, monthYear, nextMonth, prevMonth };
};

export default useDatePicker;
