import TaskBar from "../components/tasks/TaskBar";
import { useQuery } from "react-query";
import TaskItem from "../components/tasks/TaskItem";
import { findAllOnDate } from "../services/api/tasks";
import { useContext } from "react";
import { UserContext } from "../services/user/UserContext";

const Inbox = () => {
	const { user } = useContext(UserContext);
	const { data } = useQuery(["tasks", "inbox"], () => findAllOnDate({ date: null, user }), {
		refetchOnWindowFocus: false,
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

export default Inbox;
