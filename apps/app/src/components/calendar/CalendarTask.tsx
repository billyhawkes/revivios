import { useDrag } from "react-dnd";
import useTasks from "../../services/hooks/useTasks";
import { Task } from "../../types/task";
import TaskItem from "../tasks/TaskItem";

type Props = {
	task: Task;
};

type DropResult = {
	newDate: Date;
};

const CalendarTask = ({ task }: Props) => {
	const { update } = useTasks();
	const [{ isDragging }, drag] = useDrag(() => ({
		type: "BOX",
		item: { task },
		end: ({ task }, monitor) => {
			const dropResult = monitor.getDropResult<DropResult>();
			if (task && dropResult) {
				update.mutate({ ...task, date: dropResult.newDate });
			}
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	return (
		<div className="my-1" ref={drag}>
			<TaskItem key={task.id} task={task} />
		</div>
	);
};

export default CalendarTask;
