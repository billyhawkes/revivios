import { trpc } from "../utils/trpc";

export const useTasks = () => trpc.tasks.findAll.useQuery();

export const useTask = (id: string) => trpc.tasks.findOne.useQuery({ id });

export const useCreateTask = () => {
	const utils = trpc.useContext();
	return trpc.tasks.create.useMutation({
		onSuccess: (task) => {
			utils.tasks.findAll.setData((old) => (old ? [...old, task] : []));
			utils.tasks.findAll.invalidate();
		},
	});
};

export const useDeleteTask = () => {
	const utils = trpc.useContext();
	return trpc.tasks.delete.useMutation({
		onSuccess: ({ id }) => {
			utils.tasks.findAll.setData((old) => (old ? old.filter((task) => task.id !== id) : []));
			utils.tasks.findAll.invalidate();
		},
	});
};

export const useUpdateTask = () => {
	const utils = trpc.useContext();
	return trpc.tasks.update.useMutation({
		onSuccess: (task) => {
			utils.tasks.findAll.setData((old) =>
				old ? old.map((oldTask) => (oldTask.id === task.id ? task : oldTask)) : []
			);
			utils.tasks.findAll.invalidate();
		},
	});
};
