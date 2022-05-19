import { FaCheckSquare, FaRegSquare, FaTrashAlt } from "react-icons/fa";
import useTasks from "../../services/tasks/useTasks";
import { Task } from "../../types/task";
import DatePicker from "../DatePicker";

const TaskItem = (task: Task) => {
	const { id, name, completed, date } = task;
	const { update, remove } = useTasks();

	return (
		<div
			className={`flex items-center justify-start bg-lightbackground my-3 h-10 rounded bg-opacity-70 hover:bg-opacity-90 cursor-pointer ${
				completed ? "opacity-70" : ""
			}`}
		>
			<button
				className="mx-3"
				onClick={() => update.mutate({ ...task, completed: !completed })}
			>
				{completed ? <FaCheckSquare /> : <FaRegSquare />}
			</button>
			<p className="py-2 pt-[12px]">{name}</p>
			<div className="ml-auto flex">
				<DatePicker
					startDate={date}
					onChange={(date) => update.mutate({ ...task, date })}
				/>
				<button className="p-3 ml-auto" onClick={() => remove.mutate(id)}>
					<FaTrashAlt />
				</button>
			</div>
		</div>
	);
};

export default TaskItem;
