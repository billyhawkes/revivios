import { Task } from "../../types/task";
import TaskList from "../tasks/TaskList";

type Props = {
	date: number;
	tasks: Task[];
};

const CalendarItem = ({ date, tasks }: Props) => {
	return (
		<div className="flex flex-col border-[1px] p-2 min-h-[120px]">
			{date}
			<TaskList name="" tasks={tasks} />
		</div>
	);
};

export default CalendarItem;
