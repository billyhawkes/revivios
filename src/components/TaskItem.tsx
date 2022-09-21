import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDeleteTask, useUpdateTask } from "../hooks/tasks";
import { Task, UpdateTask, UpdateTaskSchema } from "../types/tasks";
import DatePicker from "./DatePicker";

const TaskItem = ({ task }: { task: Task }) => {
	const updateTask = useUpdateTask();
	const deleteTask = useDeleteTask();
	const [editMode, setEditMode] = useState(false);
	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { isValid },
	} = useForm<UpdateTask>({
		defaultValues: task,
		resolver: zodResolver(UpdateTaskSchema),
	});

	useEffect(() => {
		reset(task);
	}, [task, reset]);

	const onSubmit = (data: UpdateTask) => {
		updateTask.mutate(data, { onSuccess: () => setEditMode(false) });
	};

	return (
		<>
			{!editMode ? (
				<div className="pl-4 pr-2 py-1 border border-lightbackground flex justify-between rounded items-center mt-4">
					<div>
						<p className="mt-1">{task.name}</p>
						<p className="mt-1 opacity-70 text-sm">{task.description}</p>
					</div>
					<div className="flex">
						<DatePicker
							onChange={(date) => updateTask.mutate({ ...task, date })}
							value={task.date}
						/>
						<div
							className="p-2 cursor-pointer mr-1 flex items-center justify-center"
							onClick={() => setEditMode(true)}
						>
							<FaEdit />
						</div>
						<div
							className="p-2 cursor-pointer flex items-center justify-center"
							onClick={() => deleteTask.mutate({ id: task.id })}
						>
							<FaTrashAlt />
						</div>
					</div>
				</div>
			) : (
				<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
					<div className="border border-lightbackground rounded mt-4 flex">
						<div className="flex-1">
							<input
								type="text"
								id="name"
								placeholder="Task name"
								{...register("name")}
								className="bg-background w-full py-2 px-4 outline-none mt-1"
							/>
							<input
								type="text"
								id="description"
								placeholder="Task description"
								{...register("description")}
								className="bg-background w-full py-2 px-4 outline-none mt-1"
							/>
						</div>
						<Controller
							name="date"
							control={control}
							render={({ field: { onChange, value } }) => (
								<div className="flex border-l border-lightbackground">
									<DatePicker onChange={onChange} value={value} />
								</div>
							)}
						/>
					</div>
					<div className="flex mt-3 flex-row-reverse justify-start">
						<button
							className={`btn ${isValid ? "" : "opacity-70 cursor-not-allowed"}`}
							onClick={() => {
								if (isValid) handleSubmit(onSubmit)();
							}}
						>
							Save
						</button>
						<button className="gbtn mr-3" onClick={() => setEditMode(false)}>
							Close
						</button>
					</div>
				</form>
			)}
		</>
	);
};

export default TaskItem;
