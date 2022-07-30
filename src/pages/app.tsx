import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { CreateTask, CreateTaskSchema, Task } from "../../types/Task";

const TaskItem = ({ task: { id, name } }: { task: Task }) => {
	const utils = trpc.useContext();
	const deleteTask = trpc.proxy.tasks.delete.useMutation({
		onSuccess: () =>
			utils.setQueryData(["tasks.findAll"], (old) =>
				old ? old.filter((value) => value.id !== id) : []
			),
	});

	return (
		<li className="w-full h-[40px] bg-lightbackground mb-4 px-4 flex items-center rounded">
			{name}
			<button onClick={() => deleteTask.mutate({ id })}>X</button>
		</li>
	);
};

const App = () => {
	const { data } = trpc.proxy.tasks.findAll.useQuery();
	const utils = trpc.useContext();
	const createTask = trpc.proxy.tasks.create.useMutation({
		onSuccess: () => utils.invalidateQueries("tasks.findAll"),
	});
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreateTask>();
	({
		resolver: zodResolver(CreateTaskSchema),
		defaultValues: { name: "", date: null },
	});

	const onSubmit = (data: CreateTask) => {
		createTask.mutate(data);
		reset();
	};

	const [parent] = useAutoAnimate<HTMLUListElement>();

	return (
		<div className="max-w-screen-lg m-auto">
			<form onSubmit={handleSubmit(onSubmit)} className="my-8 flex">
				<input
					type="text"
					id="name"
					{...register("name", { minLength: 1 })}
					className="bg-lightbackground px-4 py-2 rounded w-full"
					autoComplete="off"
				/>
				<input type="submit" value="Add Task" className="btn" />
				{errors.name && <p>{errors.name.message}</p>}
				{errors.date && <p>{errors.date.message}</p>}
			</form>

			<ul ref={parent}>
				{data && data.map((task, index) => <TaskItem key={index} task={task} />)}
			</ul>
		</div>
	);
};

export default App;
