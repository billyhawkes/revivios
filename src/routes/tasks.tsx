import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { taskCollection } from "@/lib/collections/tasks";
import { formatDate } from "@/lib/date";
import { TaskSearchSchema, type TaskType } from "@/lib/tasks";
import { useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";
import { isToday, isTomorrow } from "date-fns";
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
  const { data: rootTasks } = useLiveQuery((q) =>
    q.from({ task: taskCollection }),
  );

  const tasks = useMemo(() => {
    return rootTasks.filter((task) => {
      switch (filter) {
        case "all":
          return true;
        case "inbox":
          return task.date === null;
        case "today":
          return task.date && isToday(task.date);
        case "tomorrow":
          return task.date && isTomorrow(task.date);
      }
    });
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
