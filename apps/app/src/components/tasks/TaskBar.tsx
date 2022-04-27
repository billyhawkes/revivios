import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addTask } from "../../services/api";
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
	const [date, setDate] = useState<Dayjs>(dayjs());

	const queryClient = useQueryClient();
	const mutation = useMutation(addTask, {
		onSuccess: () => {
			queryClient.invalidateQueries("tasks");
		},
	});

	const handleTask: SubmitHandler<FormInput> = async ({ name }) => {
		await mutation.mutate(name);
		await reset();
	};

	return (
		<form onSubmit={handleSubmit(handleTask)} className="flex bg-lightbackground">
			<input
				{...register("name", { required: true })}
				placeholder="Add Task to 'Today'"
				className="bg-lightbackground w-[100%] p-2 pt-[12px] rounded"
			/>
			<DatePicker date={date} onChange={(date: Dayjs) => console.log(date.date())} />
		</form>
	);
};

export default TaskBar;
