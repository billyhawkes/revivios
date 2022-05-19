import TaskBar from "../components/tasks/TaskBar";
import TaskItem from "../components/tasks/TaskItem";
import useTasks from "../services/tasks/useTasks";

const Inbox = () => {
	const { find } = useTasks();
	const { data: tasks } = find();

	if (!tasks) {
		return <p>no Tasks</p>;
	}

	return (
		<div>
			<TaskBar startDate={null} />
			{tasks
				.filter((task) => task.date === null && !task.completed)
				.map((task) => (
					<TaskItem key={task.id} {...task} />
				))}
		</div>
	);
};

export default Inbox;
