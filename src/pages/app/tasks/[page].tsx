import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { Controller, useForm } from "react-hook-form";
import {
	CreateTask,
	CreateTaskSchema,
	Task,
	UpdateTask,
	UpdateTaskSchema,
} from "../../../types/tasks";
import { trpc } from "../../../utils/trpc";
import { authOptions } from "../../api/auth/[...nextauth]";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "../../../components/DatePicker";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import dayjs from "dayjs";

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

type Props = {
	page: string | string[] | undefined;
	session: Session;
};

const Tasks = ({ page }: /*session*/ InferGetServerSidePropsType<typeof getServerSideProps>) => {
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

	if (page !== "inbox" && page !== "today") return <Sidebar />;

	const inbox = tasks.filter((task) => task.date === null && !task.completed);

	return (
		<>
			<Sidebar />
			<main className="pr-16 pl-[104px] py-12">
				<h1 className="text-3xl mb-8">{page.charAt(0).toUpperCase() + page.slice(1)}</h1>
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
				{tasks &&
					page === "inbox" &&
					tasks
						.filter((task) => task.date === null && !task.completed)
						.map((task) => <TaskItem key={task.id} task={task} />)}
				{tasks &&
					page === "today" &&
					tasks
						.filter((task) => dayjs(task.date).isToday() && !task.completed)
						.map((task) => <TaskItem key={task.id} task={task} />)}
			</main>
		</>
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
