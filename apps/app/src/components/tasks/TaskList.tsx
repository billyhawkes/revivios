import { useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
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
			{name !== "" && (
				<div
					className="cursor-pointer flex items-center my-2 p-1 transition"
					onClick={() => setOpen(!open)}
				>
					{open ? <FaAngleDown /> : <FaAngleRight />}
					<h3 className="ml-2 mt-1">{name}</h3>
				</div>
			)}
			{open && tasks.map((task) => <TaskItem key={task.id} task={task} />)}
		</div>
	);
};

export default TaskList;
