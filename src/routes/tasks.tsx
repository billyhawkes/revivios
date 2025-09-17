import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { taskCollection } from "@/lib/collections/tasks";
import { formatDate, isTodayWhere, isTomorrowWhere } from "@/lib/date";
import type { TaskType } from "@/lib/tasks";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";
import { Trash2Icon } from "lucide-react";
import z from "zod";

export const Route = createFileRoute("/tasks")({
  component: RouteComponent,
  validateSearch: z.object({
    view: z.enum(["list"]).optional(),
    filter: z.enum(["all", "inbox", "today", "tomorrow", "week"]).optional(),
  }),
  loader: async () => Promise.all([taskCollection.preload()]),
});

const Task = ({ task }: { task: TaskType }) => {
  const navigate = Route.useNavigate();

  return (
    <Button
      className="w-full p-4 h-auto justify-between text-lg"
      variant="outline"
      onClick={() =>
        navigate({ to: ".", search: { dialog: "task", id: task.id } })
      }
    >
      {task.title}
      <div className="flex items-center gap-1">
        <Badge variant="secondary">
          {task.date ? formatDate(task.date) : "No date"}
        </Badge>
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
    </Button>
  );
};

function RouteComponent() {
  const { view = "list", filter = "today" } = Route.useSearch();
  const { data: tasks } = useLiveQuery(
    (q) =>
      q.from({ task: taskCollection }).where(({ task }) => {
        switch (filter) {
          case "all":
            return eq(true, true);
          case "inbox":
            return eq(task.date, null);
          case "today":
            return isTodayWhere(task.date);
          case "tomorrow":
            return isTomorrowWhere(task.date);
        }
      }),
    [filter],
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
          <div className="w-full" key={task.id}>
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
