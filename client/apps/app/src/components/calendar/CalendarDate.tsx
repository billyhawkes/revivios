import { Task } from "../../types/task";
import { useDrag, useDrop } from "react-dnd";
import TaskItem from "../tasks/TaskItem";
import CalendarTask from "./CalendarTask";
import dayjs from "dayjs";

type Props = {
	date: Date;
	tasks: Task[];
};

const CalendarItem = ({ date, tasks }: Props) => {
	const dateNum = dayjs(date).date();
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: "BOX",
		drop: () => ({
			newDate: date,
		}),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}));

	return (
		<div
			ref={drop}
			role={"Dustbin"}
			className={`flex flex-col border-[1px] p-2 min-h-[120px] ${
				isOver && canDrop && "bg-lightbackground"
			}`}
		>
			{dateNum}
			{tasks.map((task) => (
				<CalendarTask task={task} key={task.id} />
			))}
		</div>
	);
};

export default CalendarItem;
