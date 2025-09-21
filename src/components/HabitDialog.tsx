import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HabitFormSchema, type HabitFormType } from "@/lib/habits";
import { useForm } from "@tanstack/react-form";
import { habitCollection } from "@/lib/collections/habits";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { VisuallyHidden } from "radix-ui";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { ArrowLeft, Trash } from "lucide-react";
import { DatePicker } from "./DatePicker";

export const HabitForm = ({
  defaultValues,
  mode,
  onSubmit,
  onDelete,
}: {
  defaultValues?: HabitFormType;
  mode: "create" | "edit";
  onSubmit: (value: HabitFormType) => Promise<any>;
  onDelete?: (id: string) => Promise<any>;
}) => {
  const form = useForm({
    validators: {
      onSubmit: HabitFormSchema,
    },
    defaultValues: {
      title: "",
      description: "",
      type: undefined,
      frequency: 3,
      ...defaultValues,
    } as HabitFormType,
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
      <form.Subscribe selector={(form) => form.values.type}>
        {(type) => (
          <>
            {!type && (
              <div className="flex flex-col gap-2 my-6">
                <Card onClick={() => form.setFieldValue("type", "do")}>
                  <CardHeader>
                    <CardTitle>Completion Habit</CardTitle>
                    <CardDescription>
                      Habit you complete a certain amount of times a week
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card onClick={() => form.setFieldValue("type", "avoid")}>
                  <CardHeader>
                    <CardTitle>Avoidance Habit</CardTitle>
                    <CardDescription>Avoiding a bad habit</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            )}
            {type && (
              <>
                <Button
                  variant="link"
                  className="-ml-3 absolute top-4 left-4 p-0 h-auto text-muted-foreground"
                  onClick={() => form.resetField("type")}
                >
                  <ArrowLeft />
                  Back
                </Button>
                <form.Field name="title">
                  {(field) => (
                    <input
                      className="outline-none font-medium text-lg mt-8"
                      placeholder="Habit title"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          form.handleSubmit();
                        }
                      }}
                    />
                  )}
                </form.Field>
                <form.Field name="description">
                  {(field) => (
                    <textarea
                      className="outline-none flex min-h-16 field-sizing-content max-h-[50svh]"
                      placeholder="Habit description"
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
              </>
            )}
            {form.state.values.type && (
              <div className="flex gap-2 items-center justify-between">
                {type === "do" && (
                  <>
                    <form.Field name="frequency">
                      {(field) => (
                        <Select
                          value={String(field.state.value)}
                          onValueChange={(value) =>
                            field.handleChange(Number(value))
                          }
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Times a week" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }).map((_, i) => (
                              <SelectItem key={i} value={String(i + 1)}>
                                {i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </form.Field>
                  </>
                )}
                {type === "avoid" && (
                  <form.Field name="startDate">
                    {(field) => (
                      <DatePicker
                        date={field.state.value ?? undefined}
                        onDateChange={(date) => field.handleChange(date)}
                      />
                    )}
                  </form.Field>
                )}
                {mode === "edit" && form.state.values.type && (
                  <Button
                    variant="outline"
                    onClick={() => onDelete?.(defaultValues?.id!)}
                  >
                    <Trash />
                    Delete
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </form.Subscribe>
    </form>
  );
};

export const HabitDialog = () => {
  const navigate = useNavigate();
  const { dialog, id } = useSearch({
    from: "__root__",
  });

  const { data: habit } = useLiveQuery(
    (q) =>
      q.from({ habit: habitCollection }).where(({ habit }) => eq(habit.id, id)),
    [id],
  );

  const onOpenChange = (open: boolean) => {
    navigate({
      to: ".",
      search: { dialog: open ? "habit" : undefined, id: open ? id : undefined },
    });
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={dialog === "habit"}>
      <VisuallyHidden.Root>
        <DialogHeader>
          <DialogTitle>{id ? "Edit Habit" : "New Habit"}</DialogTitle>
          <DialogDescription>
            {id ? "Edit habit" : "Create a new habit"}
          </DialogDescription>
        </DialogHeader>
      </VisuallyHidden.Root>
      <DialogContent className="p-4">
        <HabitForm
          key={id}
          mode={id ? "edit" : "create"}
          defaultValues={habit.length > 0 ? habit[0] : undefined}
          onDelete={async (id) => {
            habitCollection.delete(id);
            onOpenChange(false);
          }}
          onSubmit={async (habit) => {
            if (id) {
              habitCollection.update(id, (draft) => {
                draft.title = habit.title;
                draft.description = habit.description ?? null;
                draft.updatedAt = new Date();
                draft.type = habit.type ?? null;
                draft.frequency = habit.frequency ?? 3;
                draft.startDate = habit.startDate ?? null;
              });
            } else {
              const insert = habitCollection.insert({
                id: "tmp",
                title: habit.title,
                description: habit.description ?? null,
                type: habit.type,
                frequency: habit.frequency ?? 3,
                startDate: habit.startDate ?? null,
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
