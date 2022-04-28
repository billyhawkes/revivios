import TaskBar from "../components/tasks/TaskBar";
import { useQuery } from "react-query";
import TaskItem from "../components/tasks/TaskItem";
import { findAll } from "../services/tasks.api";

const Today = () => {
	const { data } = useQuery("tasks", findAll);

	return (
		<div>
			<TaskBar />
			{data &&
				data
					.filter((task) => !task.completed)
					.map((task) => <TaskItem key={task.id} {...task} />)}
			<h3 className="my-3">Completed</h3>
			{data &&
				data
					.filter((task) => task.completed)
					.map((task) => <TaskItem key={task.id} {...task} />)}
		</div>
	);
};

export default Today;
