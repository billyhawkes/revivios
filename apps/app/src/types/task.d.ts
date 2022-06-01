import { User } from "./user.d";

export type Task = {
	id: number;
	name: string;
	completed: boolean;
	date: Date | null;
};
