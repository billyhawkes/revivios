import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useCreateTask } from "../hooks/tasks";
import { CreateTask, CreateTaskSchema } from "../types/tasks";
import DatePicker from "./DatePicker";

type Props = {
	default: CreateTask;
};

const TaskBar = ({}: Props) => {
	const createTask = useCreateTask();
	const { handleSubmit, register, control, reset } = useForm<CreateTask>({
		defaultValues: {
			name: "",
			date: null,
		},
		resolver: zodResolver(CreateTaskSchema),
	});

	const onSubmit = (data: CreateTask) => {
		createTask.mutate(data);
		reset();
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="bg-lightbackground flex rounded border border-lightbackground"
			autoComplete="off"
		>
			<input
				type="text"
				id="name"
				{...register("name")}
				placeholder="Task name"
				className="bg-lightbackground w-full py-2 px-4 outline-none mt-1"
			/>
			<Controller
				name="date"
				control={control}
				render={({ field: { onChange, value } }) => (
					<DatePicker onChange={onChange} value={value} />
				)}
			/>
			<button type="submit" />
		</form>
	);
};

export default TaskBar;
