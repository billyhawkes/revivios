import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Draggable, { DraggableEventHandler } from "react-draggable";
import { FaCheckSquare, FaRegSquare, FaTrashAlt } from "react-icons/fa";
import useTasks from "../../services/hooks/useTasks";
import { Task } from "../../types/task";
import DatePicker from "../common/DatePicker";

type Props = {
	task: Task;
};

const TaskItem = ({ task }: Props) => {
	const router = useRouter();
	const { id, name, completed, date } = task;
	const { update, remove } = useTasks();

	const calendar = router.pathname.includes(`calendar`);

	// const handleClick = () => {
	// 	router.push(pathname + `?id=${id}`, undefined, { shallow: true });
	// };

	return (
		<div
			className={`flex items-center justify-start bg-lightbackground h-10 rounded bg-opacity-70 hover:bg-opacity-90 cursor-pointer ${
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
				{!calendar && (
					<DatePicker
						selected={date}
						onChange={(date) => update.mutate({ ...task, date })}
					/>
				)}
				<button className="p-3 ml-auto" onClick={() => remove.mutate(id)}>
					<FaTrashAlt />
				</button>
			</div>
		</div>
	);
};

export default TaskItem;
