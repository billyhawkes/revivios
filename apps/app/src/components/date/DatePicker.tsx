import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { DAYS, getMonthArray, MONTHS } from "../../services/date";
import DateItem from "./DateItem";

type Props = {
	date: Dayjs;
	onChange: (date: Dayjs) => void;
};

const DatePicker = ({ date, onChange }: Props) => {
	const [open, setOpen] = useState(false);
	const [month, setMonth] = useState<number>(dayjs(date).month());
	const [year, setYear] = useState<number>(dayjs(date).year());
	const [monthDates, setMonthDates] = useState<(Dayjs | null)[]>([]);

	useEffect(() => {
		setMonthDates(getMonthArray(dayjs(`${year}-${month + 1}-1`)));
	}, [date, month, year]);

	const nextMonth = () => {
		if (month >= 11) {
			setMonth(0);
			setYear(year + 1);
		} else {
			setMonth(month + 1);
		}
	};
	const prevMonth = () => {
		if (month <= 0) {
			setMonth(11);
			setYear(year - 1);
		} else {
			setMonth(month - 1);
		}
	};

	return (
		<div className="p-3 flex items-center relative z-10">
			<FaCalendarAlt className="cursor-pointer" onClick={() => setOpen(!open)} />
			{open && (
				<div className="absolute right-0 top-14 bg-background p-6 rounded shadow-lg">
					<div className="flex justify-between">
						<div className="cursor-pointer" onClick={prevMonth}>
							Prev
						</div>
						{MONTHS[month]} {year}
						<div className="cursor-pointer" onClick={nextMonth}>
							Next
						</div>
					</div>
					<hr className="my-4" />
					<WeekdayRow />
					<div className="flex flex-wrap">
						{monthDates.map((dateItem, index) =>
							dateItem ? (
								<DateItem
									key={index}
									date={dateItem.date()}
									current={dateItem.isSame(date, "day")}
									onClick={() => onChange(dateItem)}
								/>
							) : (
								<div className="w-8 h-8"></div>
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
