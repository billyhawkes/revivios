import { Controller, useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTask, CreateTaskSchema, Task } from "../../types/Task";
import DatePicker from "../components/DatePicker";
import { FaTrashAlt } from "react-icons/fa";
import type { NextPage } from "next";

const useTasks = () => {
	const utils = trpc.useContext();

	const createTask = trpc.proxy.tasks.create.useMutation({
		onMutate: async ({ name, date }) => {
			const newTask: Task = {
				id: "",
				userId: "",
				name,
				date,
				description: "",
				completed: false,
			};
			await utils.cancelQuery(["tasks.findAll"]);
			const previousTasks = utils.getQueryData(["tasks.findAll"]) || [];

			utils.setQueryData(["tasks.findAll"], (old) => {
				if (old) return [...old, newTask];
				else return [newTask];
			});

			return { previousTasks };
		},
		onError: (err, newTask, context) => {
			utils.setQueryData(["tasks.findAll"], context ? context.previousTasks : []);
		},
		onSettled: () => {
			utils.invalidateQueries(["tasks.findAll"]);
		},
	});

	const deleteTask = trpc.proxy.tasks.delete.useMutation({
		onMutate: async ({ id }) => {
			await utils.cancelQuery(["tasks.findAll"]);

			const previousTasks = utils.getQueryData(["tasks.findAll"]) || [];

			utils.setQueryData(["tasks.findAll"], (old) =>
				old ? old.filter((task) => task.id !== id) : []
			);

			return { previousTasks };
		},
		onError: (err, removedTask, context) => {
			utils.setQueryData(["tasks.findAll"], context ? context.previousTasks : []);
		},
		onSettled: () => {
			utils.invalidateQueries(["tasks.findAll"]);
		},
	});

	const tasks = trpc.proxy.tasks.findAll.useQuery();

	return { deleteTask, createTask, tasks };
};

const App: NextPage = () => {
	const { tasks, createTask, deleteTask } = useTasks();
	const { data } = tasks;
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		control,
	} = useForm<CreateTask>();
	({
		resolver: zodResolver(CreateTaskSchema),
		defaultValues: { name: "", date: null },
	});

	const onSubmit = (data: CreateTask) => {
		if (data.date === undefined) data.date = null;
		createTask.mutate(data);
		reset();
	};

	return (
		<div className="max-w-screen-lg m-auto px-20">
			<form onSubmit={handleSubmit(onSubmit)} className="my-8 flex items-center relative">
				<input
					type="text"
					id="name"
					{...register("name", { minLength: 1 })}
					className="bg-lightbackground px-4 py-2 rounded w-full h-12 pt-3"
					autoComplete="off"
				/>
				<Controller
					name="date"
					control={control}
					render={({ field: { onChange, value } }) => (
						<div className="h-12 absolute right-0">
							<DatePicker value={value} onChange={onChange} />
						</div>
					)}
				/>
				{errors.name && <p>{errors.name.message}</p>}
				{errors.date && <p>{errors.date.message}</p>}
			</form>

			<ul>
				{data &&
					data.map(({ name, id }, index) => (
						<li
							key={index}
							className="w-full h-12 bg-lightbackground mb-4 px-4 flex items-center rounded flex justify-between items-center hover:bg-opacity-80 transition"
						>
							<p className="mt-1">{name}</p>
							<button onClick={() => deleteTask.mutate({ id })} className="p-4 -mr-4">
								<FaTrashAlt />
							</button>
						</li>
					))}
			</ul>
		</div>
	);
};

export default App;
