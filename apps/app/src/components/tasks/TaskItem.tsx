import { deleteDoc, doc } from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { db } from "../../services/firebase";

const removeTask = async (id: string) => {
	await deleteDoc(doc(db, "tasks", id));
};

export type Task = {
	id: string;
	name: string;
};

const TaskItem = ({ id, name }: Task) => {
	const queryClient = useQueryClient();

	const deleteMutation = useMutation(removeTask, {
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries("tasks");
		},
	});

	return (
		<div className="p-2 pt-[10px] bg-lightbackground my-3 h-10 rounded">
			{name}
			<button onClick={() => deleteMutation.mutate(id)} className="">
				X
			</button>
		</div>
	);
};

export default TaskItem;
