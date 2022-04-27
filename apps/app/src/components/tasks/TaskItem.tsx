import { FaCheckSquare, FaRegSquare, FaTrashAlt } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { completeTask, removeTask } from "../../services/api";
import { Task } from "../../types/task";

const TaskItem = ({ id, name, completed }: Task) => {
	const queryClient = useQueryClient();

	const deleteMutation = useMutation(removeTask, {
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries("tasks");
		},
	});

	const completeMutation = useMutation(completeTask, {
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries("tasks");
		},
	});

	return (
		<div
			className={`flex items-center justify-start bg-lightbackground my-3 h-10 rounded bg-opacity-70 hover:bg-opacity-90 cursor-pointer ${
				completed ? "opacity-70" : ""
			}`}
		>
			<button
				className="mx-3"
				onClick={() => completeMutation.mutate({ id, completed })}
			>
				{completed ? <FaCheckSquare /> : <FaRegSquare />}
			</button>
			<p className="py-2 pt-[12px]">{name}</p>
			<button
				className="p-3 ml-auto"
				onClick={() => deleteMutation.mutate(id)}
			>
				<FaTrashAlt />
			</button>
		</div>
	);
};

export default TaskItem;
