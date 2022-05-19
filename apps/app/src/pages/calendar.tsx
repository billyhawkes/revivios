import dayjs from "dayjs";
import CalendarItem from "../components/Calendar/CalendarItem";
import Title from "../components/common/Layout/Title";
import { DAYS, MONTHS } from "../services/date";
import useDatePicker from "../services/hooks/useDatePicker";
import useTasks from "../services/hooks/useTasks";

const Calendar = () => {
	const { dates, monthYear, nextMonth, prevMonth } = useDatePicker(new Date());
	const { find } = useTasks();
	const { data: tasks } = find();

	return (
		<>
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
									date={dayjs(date).date()}
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
		</>
	);
};

export default Calendar;
