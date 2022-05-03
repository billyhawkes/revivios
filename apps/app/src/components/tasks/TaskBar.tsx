import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addTask } from "../../services/api/tasks";
import DatePicker from "../date/DatePicker";

type FormInput = {
	name: string;
};

const TaskBar = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormInput>();
	const [date, setDate] = useState<Date>(new Date());

	const queryClient = useQueryClient();
	const mutation = useMutation(addTask, {
		onSuccess: () => {
			queryClient.invalidateQueries("tasks");
		},
	});

	const handleTask: SubmitHandler<FormInput> = async ({ name }) => {
		await mutation.mutate({ name, date });
		await reset();
	};

	return (
		<form onSubmit={handleSubmit(handleTask)} className="flex bg-lightbackground h-12">
			<input
				{...register("name", { required: true })}
				placeholder="Add Task to 'Today'"
				className="bg-lightbackground w-[100%] p-2 pt-[12px] rounded"
			/>
			<DatePicker date={date} onChange={(date: Date) => setDate(date)} />
		</form>
	);
};

export default TaskBar;
