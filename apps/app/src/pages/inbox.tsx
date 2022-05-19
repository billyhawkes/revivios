import Title from "../components/common/Layout/Title";
import TaskBar from "../components/tasks/TaskBar";
import TaskList from "../components/tasks/TaskList";
import TaskSection from "../components/tasks/TaskSection";
import useTasks from "../services/hooks/useTasks";

const Inbox = () => {
	const { find } = useTasks();
	const { data: tasks } = find();

	if (!tasks) {
		return <p>no Tasks</p>;
	}

	const inbox = tasks.filter((task) => task.date === null && !task.completed);

	return (
		<div className="flex h-[100%]">
			<section className="flex-1 min-w-[30%]">
				<Title name="Inbox" />
				<TaskBar startDate={null} />
				<TaskList name="" tasks={inbox} />
			</section>
			<TaskSection />
		</div>
	);
};

export default Inbox;
