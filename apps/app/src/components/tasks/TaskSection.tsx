import { useRouter } from "next/router";
import { useEffect } from "react";
import useTasks from "../../services/hooks/useTasks";

const TaskSection = () => {
	const router = useRouter();
	const { taskId } = router.query;
	const { findOne } = useTasks();

	const { data: task } = findOne(parseInt(`${taskId}`));

	return <section className="min-w-[20%] border-l-[1px] p-2 ml-10"></section>;
};

export default TaskSection;
