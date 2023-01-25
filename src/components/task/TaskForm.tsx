import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useCreateTask } from "../../hooks/tasks";
import type { CreateTask } from "../../types/tasks";
import { CreateTaskSchema } from "../../types/tasks";
import DatePicker from "../DatePicker";

const TaskForm = ({ defaultDate }: { defaultDate: Date | null }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<CreateTask>({
    defaultValues: { name: "", date: defaultDate },
    resolver: zodResolver(CreateTaskSchema),
  });
  const createTaskMutation = useCreateTask();

  const onSubmit = (data: CreateTask) => {
    reset();
    createTaskMutation.mutate(data, {
      onError: () => reset(data, { keepDefaultValues: true }),
    });
  };

  return (
    <form
      className="mb-2 flex h-12 w-full rounded bg-lightbackground"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      {errors.name ? (
        <p>Name {errors.name.message}</p>
      ) : errors.date ? (
        <p>Date {errors.date.message}</p>
      ) : null}
      <input
        type="text"
        id="name"
        autoComplete="off"
        {...register("name")}
        className="flex-1 rounded-l bg-lightbackground px-3 outline-none"
      />
      <input type="submit" value="" />
      <Controller
        name="date"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <DatePicker onChange={onChange} value={value} />
        )}
      />
    </form>
  );
};

export default TaskForm;
