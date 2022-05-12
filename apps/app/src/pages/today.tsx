import TaskBar from "../components/tasks/TaskBar";
import { useQuery } from "react-query";
import TaskItem from "../components/tasks/TaskItem";
import { findAll } from "../services/api/tasks";
import { useContext, useEffect } from "react";
import { UserContext } from "../services/user/UserContext";

const Today = () => {
	const { user } = useContext(UserContext);

	const { data } = useQuery("tasks", () => findAll({ user }), {
		refetchOnWindowFocus: true,
		enabled: !!user,
	});

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
