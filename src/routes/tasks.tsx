import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { taskCollection } from "@/lib/collections/tasks";
import { formatDate } from "@/lib/date";
import { TaskSearchSchema, taskStatuses, type TaskType } from "@/lib/tasks";
import { cn } from "@/lib/utils";
import { useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";
import { isBefore, isToday, isTomorrow, startOfToday } from "date-fns";
import { Trash2Icon } from "lucide-react";
import { useMemo } from "react";

export const Route = createFileRoute("/tasks")({
  component: RouteComponent,
  validateSearch: TaskSearchSchema,
  loader: async () => Promise.all([taskCollection.preload()]),
});

const Task = ({ task }: { task: TaskType }) => {
  const navigate = Route.useNavigate();

  return (
    <Button
      className={cn(
        "w-full p-4 h-auto justify-between text-lg",
        task.status === "complete" && "opacity-60",
      )}
      variant="outline"
      onClick={() =>
        navigate({ to: ".", search: { dialog: "task", id: task.id } })
      }
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.status === "complete"}
          className="size-5"
          onClick={(e) => {
            e.stopPropagation();
          }}
          onCheckedChange={(checked) => {
            taskCollection.update(task.id, (draft) => {
              draft.status = checked ? "complete" : "pending";
            });
          }}
        />
        {task.title}
      </div>
      <div className="flex items-center gap-1">
        <Badge
          variant={
            task.date && isBefore(task.date, startOfToday())
              ? "destructive"
              : "secondary"
          }
        >
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
  const { filter = "today" } = Route.useSearch();
  const { data: rootTasks } = useLiveQuery((q) =>
    q.from({ task: taskCollection }),
  );

  const tasks = useMemo(() => {
    return rootTasks
      .filter((task) => {
        switch (filter) {
          case "all":
            return true;
          case "inbox":
            return task.date === null;
          case "today":
            return (
              task.date &&
              // Date is today or before and incomplete
              (isToday(task.date) ||
                (isBefore(task.date, startOfToday()) &&
                  task.status !== "complete"))
            );
          case "tomorrow":
            return task.date && isTomorrow(task.date);
        }
      })
      .sort(
        (a, b) =>
          taskStatuses.indexOf(a.status) - taskStatuses.indexOf(b.status),
      );
  }, [rootTasks, filter]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-xl w-full gap-2 flex flex-col items-center">
        {!tasks.length && (
          <div className="w-full text-center">
            <h1 className="text-xl">No tasks found</h1>
          </div>
        )}
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
