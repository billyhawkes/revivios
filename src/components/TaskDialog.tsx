import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskFormSchema, type TaskFormType } from "@/lib/tasks";
import { useForm } from "@tanstack/react-form";
import { taskCollection } from "@/lib/collections/tasks";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { VisuallyHidden } from "radix-ui";
import { startOfToday, startOfTomorrow } from "date-fns";
import { DatePicker } from "./DatePicker";

export const TaskForm = ({
  defaultValues,
  mode,
  onSubmit,
}: {
  defaultValues?: TaskFormType;
  mode: "create" | "edit";
  onSubmit: (value: TaskFormType) => Promise<any>;
}) => {
  const search = useSearch({
    from: "/tasks",
    shouldThrow: false,
  });

  const form = useForm({
    validators: {
      onSubmit: TaskFormSchema,
    },
    defaultValues: {
      title: "",
      date:
        search?.filter === "today"
          ? startOfToday()
          : search?.filter === "tomorrow"
            ? startOfTomorrow()
            : undefined,
      ...defaultValues,
    } as TaskFormType,
    onSubmit: ({ value }) => onSubmit(value),
    listeners: {
      onChangeDebounceMs: 500,
      onChange: ({ formApi }) =>
        mode === "edit" &&
        formApi.state.isValid &&
        onSubmit(formApi.state.values),
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4"
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
      <form.Field name="date">
        {(field) => (
          <DatePicker
            date={field.state.value ?? undefined}
            onDateChange={(date) => field.handleChange(date)}
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
      search: { dialog: open ? "task" : undefined, id: open ? id : undefined },
    });
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={dialog === "task"}>
      <VisuallyHidden.Root>
        <DialogHeader>
          <DialogTitle>{id ? "Edit Task" : "New Task"}</DialogTitle>
          <DialogDescription>
            {id ? "Edit task" : "Create a new task"}
          </DialogDescription>
        </DialogHeader>
      </VisuallyHidden.Root>
      <DialogContent className="p-4">
        <TaskForm
          key={id}
          mode={id ? "edit" : "create"}
          defaultValues={task.length > 0 ? task[0] : undefined}
          onSubmit={async (task) => {
            if (id) {
              taskCollection.update(id, (draft) => {
                draft.title = task.title;
                draft.description = task.description ?? null;
                draft.date = task.date ?? null;
                draft.updatedAt = new Date();
              });
            } else {
              const insert = taskCollection.insert({
                id: "tmp",
                title: task.title,
                description: task.description ?? null,
                status: "pending",
                date: task.date ?? null,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
              if (insert.state !== "failed") {
                onOpenChange(false);
              }
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
