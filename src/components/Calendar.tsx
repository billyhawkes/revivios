import dayjs from "dayjs";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import useCalendar, { DAYS, MONTHS } from "../hooks/useCalendar";
import { Task, UpdateTaskSchema } from "../types/tasks";
import { DndContext, DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { useUpdateTask } from "../hooks/tasks";

type Props = {
	tasks: Task[];
};
const CalendarTask = ({ task }: { task: Task }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: task.id,
		data: task,
	});
	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined;

	return (
		<div
			className="bg-lightbackground rounded py-1 px-2 w-full cursor-pointer"
			style={style}
			ref={setNodeRef}
			{...listeners}
			{...attributes}
		>
			<p className="mt-1 text-ellipsis overflow-hidden w-full">{task.name}</p>
		</div>
	);
};

const CalendarDate = ({ tasks, date }: { tasks: Task[]; date: Date }) => {
	const dateNum = dayjs(date).date();
	const { isOver, setNodeRef } = useDroppable({
		id: dateNum,
		data: { date },
	});

	return (
		<div
			className={`flex-1 flex flex-col items-center rounded pt-8 border-[#ccc] border-[1px] relative px-2 ${
				isOver ? "bg-lightbackground bg-opacity-10" : ""
			}`}
			ref={setNodeRef}
		>
			<div className="absolute top-2 right-2">{dateNum}</div>
			{tasks.map((task) => (
				<CalendarTask task={task} key={task.id} />
			))}
		</div>
	);
};

const Calendar = ({ tasks }: Props) => {
	const updateTask = useUpdateTask();
	const { dates, monthYear, nextMonth, prevMonth } = useCalendar(null);

	const handleDropEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		const newTask = UpdateTaskSchema.parse({
			...active.data.current,
			date: over?.data.current?.date,
		});
		updateTask.mutate(newTask);
	};

	return (
		<div className="flex flex-wrap w-[100%] flex-1 flex-col">
			<div className="flex items-center">
				<div className="cursor-pointer p-2" onClick={prevMonth}>
					<FaAngleLeft size={24} />
				</div>
				<div className="cursor-pointer p-2" onClick={nextMonth}>
					<FaAngleRight size={24} />
				</div>
				<h1 className="text-3xl ml-4 mt-1">
					{MONTHS[monthYear.month]} {monthYear.year}
				</h1>
			</div>
			<hr className="my-4 rounded" />
			<div className="flex my-2">
				{DAYS.map((day, index) => (
					<div key={index} className="flex-1 justify-center items-center text-center">
						{day}
					</div>
				))}
			</div>
			<DndContext onDragEnd={handleDropEnd}>
				<div className="grid flex-1 grid-cols-7 auto-cols-auto">
					{dates &&
						dates.map((date, index) => {
							const isToday = dayjs(date).isToday();
							if (date)
								return (
									<CalendarDate
										tasks={tasks.filter((task) =>
											dayjs(task.date).isSame(dayjs(date), "day")
										)}
										date={date}
										key={index}
									/>
								);
							else return <div key={index} className="flex-1"></div>;
						})}
				</div>
			</DndContext>
		</div>
	);
};

export default Calendar;
