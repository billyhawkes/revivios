import { useMutation, useQuery, useQueryClient } from "react-query";
import { Task } from "../../types/task";
import api from "../api/axios";

/* FIND TASKS */
const findTasks = async (): Promise<Task[]> => {
	const res = await api.get("/tasks");
	const tasks: Task[] = await res.data;
	return tasks;
};

/* DELETE TASK */
const deleteTask = async (id: number): Promise<Task> => {
	const res = await api.delete(`/tasks/${id}`);
	const task: Task = await res.data;
	return task;
};

/* CREATE TASK */
type CreateTask = {
	name: string;
	date: Date | null;
};
const createTask = async ({ name, date }: CreateTask): Promise<Task> => {
	const res = await api.post("/tasks", { name, date });
	const task: Task = await res.data;
	return task;
};

/* UPDATE TASK */
const updateTask = async (newTask: Task): Promise<Task> => {
	const res = await api.put("/tasks", newTask);
	const task: Task = await res.data;
	return task;
};

/* FIND ONE */
const findOneTask = async (id: number): Promise<Task> => {
	const res = await api.get(`/tasks/${id}`);
	const task: Task = await res.data;
	return task;
};

const useTasks = () => {
	const queryClient = useQueryClient();

	const remove = useMutation(deleteTask, {
		onSuccess: (removedTask) => {
			queryClient.setQueryData("tasks", (currentTasks: any) =>
				currentTasks.filter((task: any) => task.id !== removedTask.id)
			);
		},
	});

	const create = useMutation(createTask, {
		onSuccess: (newTask) => {
			queryClient.setQueryData("tasks", (currentTasks: any) => [newTask, ...currentTasks]);
		},
	});

	const update = useMutation(updateTask, {
		onSuccess: (updatedTask) => {
			queryClient.setQueryData("tasks", (current: any) =>
				current.map((tasksItem: any) =>
					tasksItem.id === updatedTask.id ? updatedTask : tasksItem
				)
			);
			queryClient.invalidateQueries("user");
		},
	});

	const find = () =>
		useQuery("tasks", findTasks, {
			refetchOnWindowFocus: false,
		});

	const findOne = (id: number) =>
		useQuery(["task", id], () => findOneTask(id), {
			refetchOnWindowFocus: false,
		});

	return { find, findOne, remove, create, update };
};

export default useTasks;
