import { autoPlacement, useFloating } from "@floating-ui/react-dom";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import React from "react";
import { useEffect, useReducer, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import useOnClickOutside from "../hooks/useOnClickOutside";

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

const ReadableDate = ({ date }: { date: Date }) => {
	const overdue = dayjs(date).isBefore(dayjs().startOf("day"));

	return (
		<div className={`items-center pt-1 whitespace-nowrap ${overdue && "text-error"}`}>
			{SHORTMONTHS[dayjs(date).month()]} {dayjs(date).date()}
		</div>
	);
};

type Props = {
	value: Date | null;
	onChange: (date: Date) => void;
};

const DatePicker = ({ value, onChange }: Props) => {
	const { dates, monthYear, nextMonth, prevMonth } = useCalendar(value);
	const [open, setOpen] = useState<boolean>(false);
	const ref = React.createRef<HTMLDivElement>();
	const { x, y, reference, floating, strategy } = useFloating({
		placement: "bottom-end",
		middleware: [autoPlacement({ allowedPlacements: ["top-end", "bottom-end"] })],
	});

	useOnClickOutside(ref, () => setOpen(false));

	return (
		<div className="relative flex flex-1" ref={ref}>
			<div
				className="px-4 flex z-10 items-center cursor-pointer justify-center flex-1"
				onClick={() => setOpen(!open)}
				ref={reference}
			>
				{value ? <ReadableDate date={value} /> : <FaCalendarAlt />}
			</div>
			{open && (
				<div
					ref={floating}
					className="bg-lightbackground mt-2 p-6 rounded shadow-lg w-64"
					style={{
						position: strategy,
						top: y ?? 0,
						left: x ?? 0,
					}}
				>
					<div className="flex justify-between">
						<div className="cursor-pointer" onClick={prevMonth}>
							Prev
						</div>
						{MONTHS[monthYear.month]} {monthYear.year}
						<div className="cursor-pointer" onClick={nextMonth}>
							Next
						</div>
					</div>
					<hr className="my-4 rounded" />
					<div className="flex">
						{DAYS.map((day, index) => (
							<div key={index} className="flex justify-center items-center w-8 h-8">
								{day}
							</div>
						))}
					</div>
					<div className="flex flex-wrap">
						{dates &&
							dates.map((date, index) => {
								const day = dayjs(date).date();
								if (date)
									return (
										<div
											key={index}
											onClick={() => onChange(date)}
											className={`flex justify-center items-center w-8 h-8 rounded cursor-pointer hover:opacity-80 ${
												value && day === dayjs(value).date()
													? "bg-primary"
													: day === dayjs().date()
													? "border border-[#ccc]"
													: ""
											}`}
										>
											{dayjs(date).date()}
										</div>
									);
								else return <div key={index} className="w-8 h-8"></div>;
							})}
					</div>
				</div>
			)}
		</div>
	);
};

export default DatePicker;
