import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import { Task } from "../types/task";
import { auth, db } from "./firebase";

export const addTask = async ({ name, date }: { name: string; date: Date }) => {
	await addDoc(collection(db, "tasks"), {
		uid: auth?.currentUser?.uid,
		name,
		completed: false,
		date,
	});
};

export const removeTask = async (id: string) => {
	await deleteDoc(doc(db, "tasks", id));
};

type completeTaskType = {
	id: Task["id"];
	completed: Task["completed"];
};
export const completeTask = async ({ id, completed }: completeTaskType) => {
	await setDoc(doc(db, "tasks", id), { completed: !completed }, { merge: true });
};

export const getTasks = async () => {
	const querySnapshot = await getDocs(
		query(collection(db, "tasks"), where("uid", "==", auth.currentUser?.uid))
	);
	const tasks: Task[] = [];

	await querySnapshot.forEach((doc) => {
		const task: any = doc.data();
		const { date } = task;
		if (date) task.date = date.toDate();
		tasks.push({ id: doc.id, ...task });
	});

	return tasks;
};
