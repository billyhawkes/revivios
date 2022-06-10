import dayjs from "dayjs";
import { DndProvider } from "react-dnd";
import CalendarItem from "../components/calendar/CalendarDate";
import Title from "../components/common/Layout/Title";
import { DAYS, MONTHS } from "../services/date";
import useCalendar from "../services/hooks/useCalendar";
import useTasks from "../services/hooks/useTasks";
import { HTML5Backend } from "react-dnd-html5-backend";

const Calendar = () => {
	const { dates, monthYear, nextMonth, prevMonth } = useCalendar(new Date());
	const { find } = useTasks();
	const { data: tasks } = find();

	return (
		<>
			<DndProvider backend={HTML5Backend}>
				<Title name="Calendar" />
				<div className="flex flex-col max-w-[90vw] m-auto">
					<div className="flex justify-between my-8">
						<div className="cursor-pointer text-lg" onClick={prevMonth}>
							Prev
						</div>
						<h3 className="text-2xl">
							{MONTHS[monthYear.month]} {monthYear.year}
						</h3>
						<div className="cursor-pointer text-lg" onClick={nextMonth}>
							Next
						</div>
					</div>
					<div className="grid grid-cols-7">
						{DAYS.map((day, index) => (
							<div key={index} className="flex justify-center items-center my-3">
								{day}
							</div>
						))}
						{dates &&
							dates.map((date, index) =>
								date ? (
									<CalendarItem
										key={index}
										date={date}
										tasks={
											tasks
												? tasks.filter((task) =>
														dayjs(task.date).isSame(date, "day")
												  )
												: []
										}
									/>
								) : (
									<div key={index}></div>
								)
							)}
					</div>
				</div>
			</DndProvider>
		</>
	);
};

export default Calendar;
