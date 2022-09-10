import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { Controller, useForm } from "react-hook-form";
import { CreateTask, CreateTaskSchema, Task } from "../../../types/tasks";
import { trpc } from "../../../utils/trpc";
import { authOptions } from "../../api/auth/[...nextauth]";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "../../../components/DatePicker";
import { FaTrashAlt } from "react-icons/fa";

// const useTasks = () => {
// 	const utils = trpc.useContext();

// 	const createTask = trpc.tasks.create.useMutation({
// 		onSuccess: (task) => utils.tasks.findAll.setData((old) => (old ? [...old, task] : [])),
// 	});

// 	const updateTask = trpc.tasks.update.useMutation({
// 		onSuccess: (task) =>
// 			utils.tasks.findAll.setData((old) =>
// 				old ? old.map((oldTask) => (oldTask.id === task.id ? task : oldTask)) : []
// 			),
// 	});

// 	const deleteTask = trpc.tasks.delete.useMutation({
// 		onSuccess: ({ id }) =>
// 			utils.tasks.findAll.setData((old) => (old ? old.filter((task) => task.id !== id) : [])),
// 	});

// 	const tasks = trpc.tasks.findAll.useQuery();

// 	const task = (id: string) => trpc.tasks.findOne.useQuery({ id });

// 	return { deleteTask, createTask, updateTask, tasks, task };
// };

const TaskItem = ({ task }: { task: Task }) => {
	const utils = trpc.useContext();
	const deleteTask = trpc.tasks.delete.useMutation({
		onSuccess: ({ id }) =>
			utils.tasks.findAll.setData((old) => (old ? old.filter((task) => task.id !== id) : [])),
	});
	const updateTask = trpc.tasks.update.useMutation({
		onSuccess: (task) =>
			utils.tasks.findAll.setData((old) =>
				old ? old.map((oldTask) => (oldTask.id === task.id ? task : oldTask)) : []
			),
	});

	return (
		<div
			key={task.id}
			className="pl-4 pr-2 py-1 border border-lightbackground flex justify-between rounded items-center mt-4"
		>
			<p className="mt-1">{task.name}</p>
			<div className="flex">
				<DatePicker
					onChange={(date) => updateTask.mutate({ ...task, date })}
					value={task.date}
				/>
				{/* <div className="p-2 cursor-pointer mr-1 flex items-center justify-center">
					<FaEdit />
				</div> */}
				<div
					className="p-2 cursor-pointer flex items-center justify-center"
					onClick={() => deleteTask.mutate({ id: task.id })}
				>
					<FaTrashAlt />
				</div>
			</div>
		</div>
	);
};

type Props = {
	page: string | string[] | undefined;
	session: Session;
};

const Tasks = ({}: /*page, session*/ InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const utils = trpc.useContext();
	const { data: tasks } = trpc.tasks.findAll.useQuery();
	const createTask = trpc.tasks.create.useMutation({
		onSuccess: (task) => utils.tasks.findAll.setData((old) => (old ? [...old, task] : [])),
	});

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
		<main className="px-24 py-12">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-lightbackground flex rounded border border-lightbackground"
				autoComplete="off"
			>
				<input
					type="text"
					id="name"
					{...register("name")}
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
			{tasks && tasks.map((task) => <TaskItem key={task.id} task={task} />)}
		</main>
	);
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
	const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: "/auth/signin",
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
			page: ctx.params?.page,
		},
	};
};

export default Tasks;
