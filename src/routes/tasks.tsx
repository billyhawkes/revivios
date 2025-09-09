import { taskCollection } from "@/lib/collections/tasks";
import { useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks")({
  component: RouteComponent,
  loader: async () => Promise.all([taskCollection.preload()]),
});

function RouteComponent() {
  const { data: tasks } = useLiveQuery(taskCollection);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}
