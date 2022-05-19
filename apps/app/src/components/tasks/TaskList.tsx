import { useState } from "react";
import { Task } from "../../types/task";
import TaskItem from "./TaskItem";

type Props = {
	name: string;
	tasks: Task[];
};

const TaskList = ({ name, tasks }: Props) => {
	const [open, setOpen] = useState(true);

	return (
		<div>
			<h3 className="my-3 hover:bg-lightbackground">{name}</h3>
			{tasks.map((task) => (
				<TaskItem key={task.id} {...task} />
			))}
		</div>
	);
};

export default TaskList;
