import TaskBar from "../components/tasks/TaskBar";
import { useQuery } from "react-query";
import TaskItem from "../components/tasks/TaskItem";
import { findAllOnDate, findToday } from "../services/api/tasks";
import { useContext } from "react";
import { UserContext } from "../services/user/UserContext";

const Today = () => {
	const { user } = useContext(UserContext);

	const { data } = useQuery(["tasks", "today:overdue"], () => findToday({ user }), {
		refetchOnWindowFocus: false,
		enabled: !!user,
	});

	return (
		<div>
			<TaskBar />
			<h3 className="my-3">Overdue</h3>
			{data?.overdue && data.overdue.map((task) => <TaskItem key={task.id} {...task} />)}
			<h3 className="my-3">Today</h3>
			{data?.tasks &&
				data.tasks
					.filter((task) => !task.completed)
					.map((task) => <TaskItem key={task.id} {...task} />)}
			<h3 className="my-3">Completed</h3>
			{data?.tasks &&
				data.tasks
					.filter((task) => task.completed)
					.map((task) => <TaskItem key={task.id} {...task} />)}
		</div>
	);
};

export default Today;
