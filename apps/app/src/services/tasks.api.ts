import { Task } from "../types/task";
import { request, gql, GraphQLClient } from "graphql-request";

const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`, { headers: {} });

/* CREATE TASK */
const addTaskMutation = gql`
	mutation Task($name: String!, $date: DateTime) {
		createTask(createTaskInput: { name: $name, date: $date }) {
			id
			name
			completed
			date
		}
	}
`;
export const addTask = async ({ name, date }: { name: string; date: Date }): Promise<Task> => {
	const data = await client.request(addTaskMutation, { name, date });
	const task: Task = await data.task;
	return task;
};

/* REMOVE TASK */
const removeTaskMutation = gql`
	mutation Task($id: Int!) {
		remove(id: $id) {
			id
			name
			completed
			date
		}
	}
`;
export const removeTask = async (id: number) => {
	const data = await client.request(removeTaskMutation, { id });
	const task: Task = await data.task;
	return task;
};

/* TOGGLE COMPLETE */
type completeTaskType = {
	id: Task["id"];
	completed: Task["completed"];
};
export const completeTask = async ({ id, completed }: completeTaskType) => {
	// await setDoc(doc(db, "tasks", id), { completed: !completed }, { merge: true });
};

/* FIND ALL */
const findAllQuery = gql`
	{
		tasks {
			id
			name
			completed
			date
		}
	}
`;
export const findAll = async (): Promise<Task[]> => {
	const data = await request(`${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`, findAllQuery);
	const tasks: Task[] = await data.tasks;
	return tasks;
};
