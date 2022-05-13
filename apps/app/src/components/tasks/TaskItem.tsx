import dayjs from "dayjs";
import { useContext } from "react";
import { FaCheckSquare, FaRegSquare, FaTrashAlt } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { deleteTask, updateTask } from "../../services/api/tasks";
import { UserContext } from "../../services/user/UserContext";
import { Task } from "../../types/task";
import DatePicker from "../date/DatePicker";

const TaskItem = (task: Task) => {
	const { id, name, completed, date } = task;
	const queryClient = useQueryClient();
	const { user } = useContext(UserContext);

	// TODO: dont refetch, only change on client if successful
	const deleteMutation = useMutation(deleteTask, {
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries("tasks");
		},
	});

	const updateMutation = useMutation(updateTask, {
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries("tasks");
		},
	});

	const update = async (newTask: Task) => {
		await updateMutation.mutate({ newTask, user });
	};

	return (
		<div
			className={`flex items-center justify-start bg-lightbackground my-3 h-10 rounded bg-opacity-70 hover:bg-opacity-90 cursor-pointer ${
				completed ? "opacity-70" : ""
			}`}
		>
			<button
				className="mx-3"
				onClick={() => update({ id, name, completed: !completed, date })}
			>
				{completed ? <FaCheckSquare /> : <FaRegSquare />}
			</button>
			<p className="py-2 pt-[12px]">{name}</p>
			<div className="ml-auto flex">
				<DatePicker
					date={date}
					onChange={(date) => update({ id, name, completed, date })}
				/>
				<button className="p-3 ml-auto" onClick={() => deleteMutation.mutate({ id, user })}>
					<FaTrashAlt />
				</button>
			</div>
		</div>
	);
};

export default TaskItem;
