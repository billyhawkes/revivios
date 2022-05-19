import TaskBar from "../components/tasks/TaskBar";
import TaskList from "../components/tasks/TaskList";
import useTasks from "../services/hooks/useTasks";

const Inbox = () => {
	const { find } = useTasks();
	const { data: tasks } = find();

	if (!tasks) {
		return <p>no Tasks</p>;
	}

	const inbox = tasks.filter((task) => task.date === null && !task.completed);

	return (
		<div>
			<h1 className="text-3xl">Inbox</h1>
			<hr className="my-4 opacity-70" />
			<TaskBar startDate={null} />
			<TaskList name="" tasks={inbox} />
		</div>
	);
};

export default Inbox;
