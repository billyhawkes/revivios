import { useNavigate, useSearch } from "@tanstack/react-router";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TaskFormSchema, type TaskFormType } from "@/lib/tasks";
import { useForm } from "@tanstack/react-form";
import { taskCollection } from "@/lib/collections/tasks";
import { eq, useLiveQuery } from "@tanstack/react-db";

export const TaskForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: TaskFormType;
  onSubmit: (value: TaskFormType) => Promise<any>;
}) => {
  const form = useForm({
    validators: {
      onSubmit: TaskFormSchema,
    },
    defaultValues: {
      title: "",
      ...defaultValues,
    } as TaskFormType,
    onSubmit: ({ value }) => onSubmit(value),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4 p-2"
    >
      <form.Field name="title">
        {(field) => (
          <input
            className="outline-none font-medium text-lg"
            placeholder="Task title"
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      </form.Field>
      <form.Field name="description">
        {(field) => (
          <textarea
            className="outline-none flex min-h-16 field-sizing-content max-h-[50svh]"
            placeholder="Task description"
            value={field.state.value ?? ""}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                form.handleSubmit();
              }
            }}
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
  const { dialog, id } = useSearch({
    from: "__root__",
  });

  const { data: task } = useLiveQuery(
    (q) =>
      q.from({ task: taskCollection }).where(({ task }) => eq(task.id, id)),
    [id],
  );

  const onOpenChange = (open: boolean) => {
    navigate({
      to: ".",
      search: { dialog: open ? "task" : undefined },
    });
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={dialog === "task"}>
      <DialogContent className="p-4">
        <TaskForm
          defaultValues={task.length > 0 ? task[0] : undefined}
          onSubmit={async (task) => {
            const insert = taskCollection.insert({
              id: "tmp",
              title: task.title,
              description: task.description ?? null,
              status: "pending",
              date: null,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
            console.log(insert);
            if (insert.state !== "failed") {
              onOpenChange(false);
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
