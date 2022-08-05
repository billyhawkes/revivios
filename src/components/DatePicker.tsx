import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { useEffect, useReducer, useRef, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Menu, Popover, Transition } from "@headlessui/react";
import { usePopper } from "react-popper";

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

	let dates = [];
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
		<div className={`flex items-center pt-1 ${overdue && "text-error"}`}>
			{MONTHS[dayjs(date).month()]} {dayjs(date).date()}
		</div>
	);
};

type Props = {
	value: Date | null;
	onChange: (date: Date) => void;
};

const DatePicker = ({ value, onChange }: Props) => {
	const { dates, monthYear, nextMonth, prevMonth } = useCalendar(value);
	let [referenceElement, setReferenceElement] = useState<any>();
	let [popperElement, setPopperElement] = useState<any>();
	let { styles, attributes } = usePopper(referenceElement, popperElement);

	return (
		<Popover className="relative">
			<Popover.Button ref={setReferenceElement}>
				<div className="p-4 flex z-10 items-center cursor-pointer h-12">
					{value ? <ReadableDate date={value} /> : <FaCalendarAlt />}
				</div>
			</Popover.Button>
			<Transition
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<Popover.Panel ref={setPopperElement} style={styles.popper} {...attributes.popper}>
					<div className="bg-lightbackground mt-2 p-6 rounded shadow-lg">
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
								<div
									key={index}
									className="flex justify-center items-center w-8 h-8"
								>
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
				</Popover.Panel>
			</Transition>
		</Popover>
	);
};

export default DatePicker;
