import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useTasks from "../../services/tasks/useTasks";
import DatePicker from "../DatePicker";

type FormInput = {
	name: string;
	date: Date | null;
};

type Props = {
	startDate: Date | null;
};

const TaskBar = ({ startDate }: Props) => {
	const { register, watch, setValue, handleSubmit, resetField } = useForm<FormInput>();
	const { create } = useTasks();

	useEffect(() => {
		setValue("date", startDate);
	}, []);

	const handleTask: SubmitHandler<FormInput> = async ({ name, date }) => {
		await create.mutate({ name, date });
		await resetField("name");
	};

	return (
		<form onSubmit={handleSubmit(handleTask)} className="flex bg-lightbackground h-12">
			<input
				{...register("name", { required: true })}
				placeholder="Add Task"
				className="bg-lightbackground w-[100%] p-2 pt-[12px] rounded"
			/>
			<DatePicker startDate={startDate} onChange={(date: Date) => setValue("date", date)} />
		</form>
	);
};

export default TaskBar;
