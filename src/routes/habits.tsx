import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { habitCollection, habitLogCollection } from "@/lib/collections/habits";
import type { HabitLogType, HabitsType } from "@/lib/habits";
import { useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";
import {
  differenceInDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  isSameDay,
  startOfWeek,
} from "date-fns";
import { useMemo } from "react";

export const Route = createFileRoute("/habits")({
  component: RouteComponent,
});

const Habit = ({
  habit,
  habitLogs,
}: {
  habit: HabitsType;
  habitLogs: HabitLogType[];
}) => {
  const navigate = Route.useNavigate();

  const weekdays = eachDayOfInterval({
    start: startOfWeek(new Date(), {
      weekStartsOn: 1,
    }),
    end: endOfWeek(new Date(), {
      weekStartsOn: 1,
    }),
  }).map((date) => ({
    date,
    dayOfWeek: format(date, "iii").toUpperCase(),
    habitLog: habitLogs.find((log) => isSameDay(log.date, date)),
  }));

  let title = useMemo(() => {
    if (habit.type === "do") {
      return `${habit.title} (${weekdays.filter(({ habitLog }) => !!habitLog).length} / ${habit.frequency})`;
    }
    if (habit.type === "avoid") {
      return habit.title;
    }
  }, [habit, habitLogs]);

  return (
    <Button
      key={habit.id}
      variant="outline"
      className="flex flex-col gap-4 border rounded-lg p-8 w-full items-center h-auto"
      onClick={() =>
        navigate({ to: ".", search: { dialog: "habit", id: habit.id } })
      }
    >
      {habit.type === "do" && (
        <div className="flex gap-2 justify-between w-full">
          {weekdays.map(({ date, dayOfWeek, habitLog }) => (
            <div key={dayOfWeek} className="flex flex-col gap-2 flex-1">
              <p className="font-medium">{dayOfWeek}</p>
              <Checkbox
                className="w-full aspect-square h-auto"
                iconClassName="size-[50%]"
                checked={!!habitLog}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onCheckedChange={(checked) => {
                  if (checked) {
                    habitLogCollection.insert({
                      id: "tmp",
                      habitId: habit.id,
                      date,
                      updatedAt: new Date(),
                      createdAt: new Date(),
                    });
                  } else {
                    if (habitLog) {
                      habitLogCollection.delete(habitLog.id);
                    }
                  }
                }}
              />
            </div>
          ))}
        </div>
      )}
      {habit.type === "avoid" && (
        <h2 className="text-8xl font-bold">
          {habit.startDate
            ? differenceInDays(new Date(), habit.startDate)
            : habit.title}
        </h2>
      )}
      <p className="text-lg text-muted-foreground uppercase">{title}</p>
    </Button>
  );
};

function RouteComponent() {
  const { data: habits } = useLiveQuery((q) =>
    q.from({
      habit: habitCollection,
    }),
  );

  const { data: habitLogs } = useLiveQuery((q) =>
    q.from({
      habitLog: habitLogCollection,
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
          <Habit
            key={habit.id}
            habit={habit}
            habitLogs={habitLogs.filter((log) => log.habitId === habit.id)}
          />
        ))}
      </div>
    </div>
  );
}
