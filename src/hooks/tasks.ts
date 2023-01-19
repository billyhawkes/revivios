import { api } from "../utils/api";

export const useUpdateTask = () => {
  const utils = api.useContext();
  return api.tasks.update.useMutation({
    onSuccess: async () => {
      await utils.tasks.getTasks.invalidate();
    },
  });
};

export const useDeleteTask = () => {
  const utils = api.useContext();
  return api.tasks.delete.useMutation({
    onSuccess: async () => {
      await utils.tasks.getTasks.invalidate();
    },
  });
};
