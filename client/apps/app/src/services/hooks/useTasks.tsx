import { gql } from "graphql-request";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Task } from "../../types/task";
import { client } from "../api/graphqlClient";

/* FIND TASKS */
const findTasksQuery = gql`
	{
		tasks {
			id
			name
			completed
			date
		}
	}
`;
const findTasks = async (): Promise<Task[]> => {
	const data = await client.request(findTasksQuery);
	const tasks = await data.tasks;
	return tasks;
};

/* DELETE TASK */
const deleteTaskMutation = gql`
	mutation Task($id: Int!) {
		deleteTask(id: $id) {
			id
			name
			completed
			date
		}
	}
`;
const deleteTask = async (id: number): Promise<Task> => {
	const data = await client.request(deleteTaskMutation, { id });
	const task: Task = await data.deleteTask;
	return task;
};

/* CREATE TASK */
type CreateTask = {
	name: string;
	date: Date | null;
};
const createTaskMutation = gql`
	mutation Task($name: String!, $date: DateTime) {
		createTask(createTaskInput: { name: $name, date: $date }) {
			id
			name
			completed
			date
		}
	}
`;
const createTask = async ({ name, date }: CreateTask): Promise<Task> => {
	const data = await client.request(createTaskMutation, { name, date });
	const task: Task = await data.createTask;
	return task;
};

/* UPDATE TASK */
const updateTaskMutation = gql`
	mutation Task($id: Float!, $name: String!, $completed: Boolean!, $date: DateTime) {
		updateTask(updateTaskInput: { id: $id, name: $name, completed: $completed, date: $date }) {
			id
			name
			completed
			date
		}
	}
`;
const updateTask = async (newTask: Task): Promise<Task> => {
	const data = await client.request(updateTaskMutation, newTask);
	const task: Task = await data.updateTask;
	return task;
};

/* FIND ONE */
const findOneQuery = gql`
	query Task($id: Float!) {
		task(id: $id) {
			id
			name
			completed
			date
		}
	}
`;
const findOneTask = async (id: number): Promise<Task> => {
	const data = await client.request(findOneQuery, id);
	const task: Task = await data.task;
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
