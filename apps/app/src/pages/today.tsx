import { collection, getDocs, query, where } from "firebase/firestore";
import TaskBar from "../components/tasks/TaskBar";
import { auth, db } from "../services/firebase";
import { useQuery } from "react-query";
import TaskItem, { Task } from "../components/tasks/TaskItem";

const getTasks = async () => {
	const querySnapshot = await getDocs(
		query(
			collection(db, "tasks"),
			where("uid", "==", auth.currentUser?.uid)
		)
	);
	const tasks: Task[] = [];

	await querySnapshot.forEach((doc) => {
		const task: any = doc.data();
		tasks.push({ id: doc.id, ...task });
	});

	return tasks;
};

const Today = () => {
	const { data } = useQuery("tasks", getTasks);

	return (
		<div>
			<TaskBar />
			{data && data.map((task) => <TaskItem key={task.id} {...task} />)}
		</div>
	);
};

export default Today;
