import { Task } from "../../types/task";
import { request, gql, GraphQLClient } from "graphql-request";
import { User } from "../../types/user";

const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`, { headers: {} });

const buildHeader = (token: string) => {
	return { Authorization: `Bearer ${token}` };
};

/* CREATE TASK */
type Create = {
	name: string;
	date: Date;
	user: User;
};
const createTaskMutation = gql`
	mutation Task($name: String!, $date: DateTime) {
		create(createTaskInput: { name: $name, date: $date }) {
			id
			name
			completed
			date
		}
	}
`;
export const createTask = async ({ name, date, user }: Create): Promise<Task> => {
	const data = await client.request(createTaskMutation, { name, date }, buildHeader(user.token));
	const task: Task = await data.createTask;
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
	const task: Task = await data.remove;
	return task;
};

/* TOGGLE COMPLETE */
const toggleCompleteMutation = gql`
	mutation Task($id: Int!) {
		toggleComplete(id: $id) {
			id
			name
			completed
			date
		}
	}
`;
export const completeTask = async (id: number) => {
	const data = await client.request(toggleCompleteMutation, { id });
	const task: Task = await data.toggleComplete;
	return task;
};

/* FIND ALL */
type FindAll = {
	user: User;
};
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
export const findAll = async ({ user }: FindAll) => {
	const data = await client.request(findAllQuery, undefined, buildHeader(user.token));
	const tasks: Task[] = await data.tasks;
	return tasks;
};

/* CHANGE DATE */
const changeDateMutation = gql`
	mutation Task($date: Date!) {
		changeDate(date: $date) {
			id
			name
			completed
			date
		}
	}
`;
export const changeDate = async (date: Date) => {
	const data = await client.request(changeDateMutation, { date });
	const task: Task = await data.changeDate;
	return task;
};
