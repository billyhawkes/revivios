import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addTask } from "../../services/api";

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
		<form onSubmit={handleSubmit(handleTask)}>
			<input
				{...register("name", { required: true })}
				placeholder="Add Task to 'Today'"
				className="bg-lightbackground w-[100%] p-2 pt-[12px] rounded"
			/>
		</form>
	);
};

export default TaskBar;
