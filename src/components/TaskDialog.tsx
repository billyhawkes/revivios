import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateTaskSchema, type CreateTask } from "@/lib/tasks";
import { useForm } from "@tanstack/react-form";
import { Input } from "./ui/input";
import { taskCollection } from "@/lib/collections/tasks";

export const TaskForm = ({
  onSubmit,
}: {
  onSubmit: (value: CreateTask) => Promise<any>;
}) => {
  const form = useForm({
    validators: {
      onSubmit: CreateTaskSchema,
    },
    defaultValues: {
      title: "",
    } as CreateTask,
    onSubmit: ({ value }) => onSubmit(value),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-6"
    >
      <form.Field name="title">
        {(field) => (
          <Input
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      </form.Field>
    </form>
  );
};

export const TaskDialog = () => {
  const navigate = useNavigate();
  const { dialog } = useSearch({
    from: "__root__",
  });

  const onOpenChange = (open: boolean) => {
    navigate({
      to: ".",
      search: { dialog: open ? "task" : undefined },
    });
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={dialog === "task"}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Create a new task to keep track of
          </DialogDescription>
        </DialogHeader>
        <TaskForm
          onSubmit={async (task) => {
            taskCollection.insert({
              id: "tmp",
              title: task.title,
              description: task.description ?? null,
              status: "pending",
              createdAt: new Date(),
              updatedAt: new Date(),
            });
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
