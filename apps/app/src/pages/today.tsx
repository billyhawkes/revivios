import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import Spinner from "../components/common/Spinner";
import TaskBar from "../components/tasks/TaskBar";
import TaskList from "../components/tasks/TaskList";
import useTasks from "../services/hooks/useTasks";
import { TaskState } from "../types/task";
dayjs.extend(isToday);

const Today = () => {
	const { find } = useTasks();
	const { data: tasks } = find();

	if (!tasks) {
		return <p>no Tasks</p>;
	}

	const today = tasks.filter((task) => dayjs(task.date).isToday() && !task.completed);
	const completed = tasks.filter((task) => dayjs(task.date).isToday() && task.completed);
	const overdue = tasks.filter(
		(task) => dayjs(task.date).isBefore(dayjs().startOf("day")) && !task.completed
	);

	return (
		<div>
			<h1 className="text-3xl">Today</h1>
			<hr className="my-4 opacity-70" />
			<TaskBar startDate={new Date()} />
			{overdue.length !== 0 && <TaskList name="Overdue" tasks={overdue} />}
			{today.length !== 0 && <TaskList name="Today" tasks={today} />}
			{completed.length !== 0 && <TaskList name="Completed" tasks={completed} />}
		</div>
	);
};

export default Today;
