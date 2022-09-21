import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import Sidebar from "../../../components/Sidebar";
import dayjs from "dayjs";
import TaskItem from "../../../components/TaskItem";
import Calendar from "../../../components/Calendar";
import TaskBar from "../../../components/TaskBar";
import { useTasks } from "../../../hooks/tasks";

type Props = {
	page: string | string[] | undefined;
	session: Session;
};

const Tasks = ({ page }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const { data: tasks } = useTasks();

	if (page !== "inbox" && page !== "today" && page !== "calendar") return <Sidebar />;

	return (
		<>
			<Sidebar />
			<main className="pr-16 pl-[104px] py-12 h-[100vh] flex flex-col max-w-screen-xl m-auto">
				{tasks && page === "inbox" && (
					<>
						<h1 className="text-3xl mb-8">Inbox</h1>
						<TaskBar default={{ name: "", date: null }} />
						{tasks.map((task) => (
							<TaskItem key={task.id} task={task} />
						))}
					</>
				)}
				{tasks && page === "today" && (
					<>
						<h1 className="text-3xl mb-8">Today</h1>
						<TaskBar default={{ name: "", date: new Date() }} />
						{tasks
							.filter((task) => dayjs(task.date).isToday() && !task.completed)
							.map((task) => (
								<TaskItem key={task.id} task={task} />
							))}
					</>
				)}
				{tasks && page === "calendar" && <Calendar tasks={tasks} />}
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
