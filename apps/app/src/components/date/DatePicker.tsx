import dayjs, { Dayjs } from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { DAYS, getMonthArray, MONTHS } from "../../services/date";
import DateItem from "./DateItem";

dayjs.extend(isToday);

type Props = {
	date: Date | null;
	onChange: (date: Date) => void;
};

type CurrentMonthYear = {
	month: number;
	year: number;
	dates: (Dayjs | null)[];
};

const DatePicker = ({ date, onChange }: Props) => {
	const [open, setOpen] = useState(false);
	const [currentMonthYear, setCurrentMonthYear] = useState<CurrentMonthYear>({
		month: dayjs(date).month(),
		year: dayjs(date).year(),
		dates: [],
	});

	useEffect(() => {
		setCurrentMonthYear({
			...currentMonthYear,
			dates: getMonthArray(dayjs(`${currentMonthYear.year}-${currentMonthYear.month + 1}-1`)),
		});
	}, [currentMonthYear.month, currentMonthYear.year]);

	const nextMonth = () => {
		if (currentMonthYear.month >= 11) {
			setCurrentMonthYear({ ...currentMonthYear, month: 0, year: currentMonthYear.year + 1 });
		} else {
			setCurrentMonthYear({ ...currentMonthYear, month: currentMonthYear.month + 1 });
		}
	};
	const prevMonth = () => {
		if (currentMonthYear.month <= 0) {
			setCurrentMonthYear({
				...currentMonthYear,
				month: 11,
				year: currentMonthYear.year - 1,
			});
		} else {
			setCurrentMonthYear({ ...currentMonthYear, month: currentMonthYear.month - 1 });
		}
	};

	return (
		<div className="relative">
			<div
				onClick={() => setOpen(!open)}
				className="p-3 flex z-10 items-center cursor-pointer h-12"
			>
				<FaCalendarAlt />
				{dayjs(date).isToday() && <p className="ml-2 pt-1">Today</p>}
			</div>
			{open && (
				<div className="absolute z-20 right-0 top-14 bg-background p-6 rounded shadow-lg">
					<div className="flex justify-between">
						<div className="cursor-pointer" onClick={prevMonth}>
							Prev
						</div>
						{MONTHS[currentMonthYear.month]} {currentMonthYear.year}
						<div className="cursor-pointer" onClick={nextMonth}>
							Next
						</div>
					</div>
					<hr className="my-4" />
					<WeekdayRow />
					<div className="flex flex-wrap">
						{currentMonthYear.dates.map((dateItem, index) =>
							dateItem ? (
								<DateItem
									key={index}
									date={dateItem.date()}
									current={dateItem.isSame(date, "day")}
									onClick={() => onChange(dateItem.toDate())}
								/>
							) : (
								<div key={index} className="w-8 h-8"></div>
							)
						)}
					</div>
				</div>
			)}
		</div>
	);
};

const WeekdayRow = () => {
	return (
		<div className="flex">
			{DAYS.map((day, index) => (
				<div key={index} className="flex justify-center items-center w-8 h-8">
					{day}
				</div>
			))}
		</div>
	);
};

export default DatePicker;
