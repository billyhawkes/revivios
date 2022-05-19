import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import TaskBar from "../components/tasks/TaskBar";
import TaskItem from "../components/tasks/TaskItem";
import TaskList from "../components/tasks/TaskList";
import { useAuth } from "../services/auth/use-auth";
import useTasks from "../services/tasks/useTasks";
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
			<TaskBar startDate={new Date()} />
			{overdue.length !== 0 && <TaskList name="Overdue" tasks={overdue} />}
			{today.length !== 0 && <TaskList name="Today" tasks={today} />}
			{completed.length !== 0 && <TaskList name="Completed" tasks={completed} />}
		</div>
	);
};

export default Today;
