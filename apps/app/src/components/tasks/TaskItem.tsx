import dayjs from "dayjs";
import { FaCheckSquare, FaRegSquare, FaTrashAlt } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { changeDate, completeTask, removeTask } from "../../services/api/tasks";
import { Task } from "../../types/task";
import DatePicker from "../date/DatePicker";

const TaskItem = ({ id, name, completed, date }: Task) => {
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

	const dateMutation = useMutation(changeDate, {
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
			<button className="mx-3" onClick={() => completeMutation.mutate(id)}>
				{completed ? <FaCheckSquare /> : <FaRegSquare />}
			</button>
			<p className="py-2 pt-[12px]">{name}</p>
			<div className="ml-auto flex">
				<DatePicker date={date} onChange={(date) => dateMutation.mutate(date)} />
				<button
					className="p-3 ml-auto"
					onClick={() => {
						deleteMutation.mutate(id);
					}}
				>
					<FaTrashAlt />
				</button>
			</div>
		</div>
	);
};

export default TaskItem;
