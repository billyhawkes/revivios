import { Button } from "@/components/ui/button";
import { habitCollection } from "@/lib/collections/habits";
import { useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";
import { differenceInDays } from "date-fns";

export const Route = createFileRoute("/habits")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { data: habits } = useLiveQuery((q) =>
    q.from({
      habit: habitCollection,
    }),
  );

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-xl w-full gap-2 flex flex-col items-center">
        {!habits.length && (
          <div className="w-full text-center">
            <h1 className="text-xl">No habits found</h1>
          </div>
        )}
        {habits.map((habit) => (
          <Button
            key={habit.id}
            variant="outline"
            className="flex flex-col gap-2 border rounded-lg p-8 w-full items-center h-auto"
            onClick={() =>
              navigate({ to: ".", search: { dialog: "habit", id: habit.id } })
            }
          >
            <h2 className="text-8xl font-bold">
              {habit.type === "avoid" && habit.startDate
                ? differenceInDays(new Date(), habit.startDate)
                : habit.title}
            </h2>
            <p className="text-lg text-muted-foreground uppercase">
              {habit.title}
            </p>
          </Button>
        ))}
      </div>
    </div>
  );
}
