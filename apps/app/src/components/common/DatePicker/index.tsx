import dayjs, { Dayjs } from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { useRef, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { MONTHS } from "../../../services/date";
import useCalendar from "../../../services/hooks/useCalendar";
import useOnClickOutside from "../../../services/hooks/useOnClickOutside";
import DateItem from "./DateItem";
import ReadableDate from "./ReadableDate";
import WeekdayRow from "./WeekdayRow";

dayjs.extend(isToday);

type Props = {
	selected: Date | null;
	onChange: (date: Date) => void;
};

const DatePicker = ({ selected, onChange }: Props) => {
	// Open Close
	const ref = useRef<any>();
	const [open, setOpen] = useState(false);
	useOnClickOutside(ref, () => setOpen(false));

	// Functionality
	const { dates, monthYear, nextMonth, prevMonth } = useCalendar(selected);

	return (
		<div className="relative" ref={ref}>
			<div
				onClick={() => setOpen(!open)}
				className="p-3 flex z-10 items-center cursor-pointer h-12"
			>
				{selected ? <ReadableDate date={selected} /> : <FaCalendarAlt />}
			</div>
			{open && (
				<div className="absolute z-20 right-0 top-14 bg-background p-6 rounded shadow-lg">
					<div className="flex justify-between">
						<div className="cursor-pointer" onClick={prevMonth}>
							Prev
						</div>
						{MONTHS[monthYear.month]} {monthYear.year}
						<div className="cursor-pointer" onClick={nextMonth}>
							Next
						</div>
					</div>
					<hr className="my-4" />
					<WeekdayRow />
					<div className="flex flex-wrap">
						{dates &&
							dates.map((date, index) =>
								date ? (
									<DateItem
										key={index}
										date={dayjs(date).date()}
										current={dayjs(date).isSame(selected, "day")}
										onClick={() => onChange(date)}
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

export default DatePicker;
