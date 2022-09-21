import { autoPlacement, useFloating } from "@floating-ui/react-dom";
import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import useCalendar, { DAYS, MONTHS, SHORTMONTHS } from "../hooks/useCalendar";
import useOnClickOutside from "../hooks/useOnClickOutside";

const ReadableDate = ({ date }: { date: Date }) => {
	const overdue = dayjs(date).isBefore(dayjs().startOf("day"));

	return (
		<div
			className={`items-center pt-1 whitespace-nowrap ${
				overdue && "text-error"
			} w-12 text-center`}
		>
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
					className="bg-lightbackground mt-2 p-6 rounded shadow-lg w-64 z-20"
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
								const isToday = dayjs(date).isToday();
								if (date)
									return (
										<div
											key={index}
											onClick={() => onChange(date)}
											className={`flex justify-center items-center w-8 h-8 rounded cursor-pointer hover:opacity-80 ${
												value && day === dayjs(value).date()
													? "bg-primary"
													: ""
											}
											${isToday ? "border border-[#ccc]" : ""}
											`}
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
