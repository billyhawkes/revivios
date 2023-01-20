import { api } from "../utils/api";

export const useUpdateTask = () => {
  const utils = api.useContext();
  return api.tasks.update.useMutation({
    onMutate: async (newTask) => {
      await utils.tasks.getTasks.cancel();
      const previousTasks = utils.tasks.getTasks.getData();
      utils.tasks.getTasks.setData(undefined, (old) =>
        old
          ? old.map((task) =>
              task.id === newTask.id ? { ...task, ...newTask } : task
            )
          : []
      );
      return { previousTasks };
    },
    onError: (e, newTask, context) => {
      utils.tasks.getTasks.setData(undefined, context?.previousTasks);
    },
    onSettled: async () => {
      await utils.tasks.getTasks.invalidate();
    },
  });
};

export const useDeleteTask = () => {
  const utils = api.useContext();
  return api.tasks.delete.useMutation({
    onMutate: async (newTask) => {
      await utils.tasks.getTasks.cancel();
      const previousTasks = utils.tasks.getTasks.getData();
      utils.tasks.getTasks.setData(undefined, (old) =>
        old ? old.filter((task) => task.id !== newTask.id) : []
      );
      return { previousTasks };
    },
    onError: (e, newTask, context) => {
      utils.tasks.getTasks.setData(undefined, context?.previousTasks);
    },
    onSettled: async () => {
      await utils.tasks.getTasks.invalidate();
    },
  });
};

export const useCreateTask = () => {
  const utils = api.useContext();
  return api.tasks.create.useMutation({
    onMutate: async (newTask) => {
      await utils.tasks.getTasks.cancel();
      const previousTasks = utils.tasks.getTasks.getData();
      utils.tasks.getTasks.setData(undefined, (old) =>
        old
          ? [
              ...old,
              {
                id: "temp",
                userId: "temp",
                createdAt: new Date(),
                updatedAt: new Date(),
                completed: false,
                description: "",
                ...newTask,
              },
            ]
          : []
      );
      return { previousTasks };
    },
    onError: (e, newTask, context) => {
      utils.tasks.getTasks.setData(undefined, context?.previousTasks);
    },
    onSettled: async () => {
      await utils.tasks.getTasks.invalidate();
    },
  });
};
