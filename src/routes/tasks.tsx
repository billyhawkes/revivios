import { Button } from "@/components/ui/button";
import { taskCollection } from "@/lib/collections/tasks";
import { isToday } from "@/lib/date";
import type { TaskType } from "@/lib/tasks";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";
import { Trash2Icon } from "lucide-react";
import z from "zod";

export const Route = createFileRoute("/tasks")({
  component: RouteComponent,
  validateSearch: z.object({
    view: z.enum(["list"]).optional(),
    date: z.enum(["inbox", "today", "tomorrow", "week"]).optional(),
  }),
  loader: async () => Promise.all([taskCollection.preload()]),
});

const Task = ({ task }: { task: TaskType }) => {
  const navigate = Route.useNavigate();

  return (
    <div
      className="p-4 flex items-center gap-2 justify-between"
      onClick={() =>
        navigate({ to: ".", search: { dialog: "task", id: task.id } })
      }
    >
      {task.title}
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          taskCollection.delete(task.id);
        }}
      >
        <Trash2Icon
          className="size-5"
          onClick={() => taskCollection.delete(task.id)}
        />
      </Button>
    </div>
  );
};

function RouteComponent() {
  const { view = "list", date = "today" } = Route.useSearch();
  const { data: tasks } = useLiveQuery(
    (q) => {
      switch (date) {
        case "inbox":
          return q
            .from({ task: taskCollection })
            .where(({ task }) => eq(task.date, null));
        case "today":
          return q
            .from({ task: taskCollection })
            .where(({ task }) => isToday(task.date));
        default:
          return q.from({ task: taskCollection });
      }
    },
    [date],
  );

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-xl w-full gap-2 flex flex-col items-center">
        {!tasks.length && (
          <div className="w-full text-center">
            <h1 className="text-xl">No tasks found</h1>
          </div>
        )}
        {tasks.map((task, index) => (
          <div className="w-full">
            <Task key={task.id} task={task} />
            {tasks.length - 1 !== index && (
              <div className="h-px w-full bg-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
