import { createFileRoute, Link, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  loader: () => {
    throw redirect({
      to: "/tasks",
    });
  },
});

function App() {
  return (
    <div className="text-center">
      <Link to="/tasks">Tasks</Link>
    </div>
  );
}
