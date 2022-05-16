import { Task } from "../../types/task";
import { request, gql, GraphQLClient } from "graphql-request";
import { User } from "../../types/user";

const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`, { headers: {} });

const buildHeader = (token: string) => {
	return { Authorization: `Bearer ${token}` };
};

/* CREATE TASK */
type CreateTask = {
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
export const createTask = async ({ name, date, user }: CreateTask): Promise<Task> => {
	const data = await client.request(createTaskMutation, { name, date }, buildHeader(user.token));
	const task: Task = await data.createTask;
	return task;
};

/* REMOVE TASK */
type DeleteTask = {
	id: number;
	user: User;
};
const deleteTaskMutation = gql`
	mutation Task($id: Int!) {
		delete(id: $id) {
			id
			name
			completed
			date
		}
	}
`;
export const deleteTask = async ({ id, user }: DeleteTask): Promise<Task> => {
	const data = await client.request(deleteTaskMutation, { id }, buildHeader(user.token));
	const task: Task = await data.delete;
	return task;
};

/* UPDATE TASK */
type UpdateTask = {
	newTask: Task;
	user: User;
};
const updateTaskMutation = gql`
	mutation Task($id: Float!, $name: String!, $completed: Boolean!, $date: DateTime) {
		update(updateTaskInput: { id: $id, name: $name, completed: $completed, date: $date }) {
			id
			name
			completed
			date
		}
	}
`;
export const updateTask = async ({ newTask, user }: UpdateTask): Promise<Task> => {
	const data = await client.request(updateTaskMutation, newTask, buildHeader(user.token));
	const task: Task = await data.update;
	return task;
};

/* FIND ALL */
type FindAllOnDate = {
	date: Date | null;
	user: User;
};
const findAllOnDateQuery = gql`
	query Task($date: DateTime) {
		tasks(tasksInput: { date: $date }) {
			id
			name
			completed
			date
		}
	}
`;
export const findAllOnDate = async ({ date, user }: FindAllOnDate): Promise<Task[]> => {
	const data = await client.request(findAllOnDateQuery, date, buildHeader(user.token));
	const tasks = await data.tasks;
	return tasks;
};

type FindToday = {
	user: User;
};
type FindTodayResponse = {
	tasks: Task[];
	overdue: Task[];
};
const findTodayQuery = gql`
	query Task($date: DateTime) {
		tasks(tasksInput: { date: $date }) {
			id
			name
			completed
			date
		}
		overdue {
			id
			name
			completed
			date
		}
	}
`;
export const findToday = async ({ user }: FindToday): Promise<FindTodayResponse> => {
	const data = await client.request(
		findTodayQuery,
		{ date: new Date() },
		buildHeader(user.token)
	);
	return await data;
};
