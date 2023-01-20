import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCheckSquare, FaRegSquare, FaTimes, FaTrash } from "react-icons/fa";
import { useCreateTask, useDeleteTask, useUpdateTask } from "../hooks/tasks";
import useOnClickOutside from "../hooks/useOnClickOutside";
import type { CreateTask, Task, UpdateTask } from "../types/tasks";
import { UpdateTaskSchema } from "../types/tasks";
import { CreateTaskSchema } from "../types/tasks";
import DatePicker from "./DatePicker";

export const TaskModal = ({
  task,
  close,
}: {
  task: Task;
  close: () => void;
}) => {
  const ref = React.createRef<HTMLDivElement>();
  useOnClickOutside(ref, close);
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm<UpdateTask>({
    defaultValues: {
      id: task.id,
      name: task.name,
      description: task.description,
      date: task.date,
      completed: task.completed,
    },
    resolver: zodResolver(UpdateTaskSchema),
  });

  const onSubmit = (data: UpdateTask) => {
    reset(data);
    updateTaskMutation.mutate(data, {
      onError: () => reset(task),
    });
  };

  return (
    <div className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-30 py-8 pl-10">
      <div
        className="flex h-full w-full max-w-screen-md flex-col rounded-xl bg-lightbackground"
        ref={ref}
      >
        <div className="flex justify-between border-b-[2px] border-background py-2 px-4">
          <div className="flex items-center">
            {task.completed ? (
              <button
                className="mr-2 flex items-center justify-center p-2"
                onClick={() =>
                  updateTaskMutation.mutate({ ...task, completed: false })
                }
              >
                <FaCheckSquare size={20} />
              </button>
            ) : (
              <button
                className="mr-2 flex items-center justify-center p-2"
                onClick={() =>
                  updateTaskMutation.mutate({ ...task, completed: true })
                }
              >
                <FaRegSquare size={20} />
              </button>
            )}
            <DatePicker
              value={task.date}
              onChange={(date) =>
                updateTaskMutation.mutate({ ...task, date: date })
              }
            />
          </div>
          <div className="flex items-center">
            <button
              onClick={() => deleteTaskMutation.mutate({ id: task.id })}
              className="mr-2 flex items-center justify-center p-2"
            >
              <FaTrash size={18} className="cursor-pointer" />
            </button>
            <button onClick={close} className="p-2">
              <FaTimes className="cursor-pointer" size={20} />
            </button>
          </div>
        </div>
        <form
          className="flex flex-1 flex-col p-6"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="mt-2 rounded bg-lightbackground text-xl outline-none"
            {...register("name")}
            autoComplete="off"
            placeholder="Name"
          />
          <textarea
            className="my-4 flex-1 rounded bg-lightbackground text-lg opacity-80 outline-none"
            {...register("description")}
            placeholder="Description"
            autoComplete="off"
          />
          {isDirty ? (
            <div className="flex justify-end">
              <button className="gbtn mr-4" onClick={() => reset()}>
                Cancel
              </button>
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export const TaskItem = ({ task }: { task: Task }) => {
  const [modal, setModal] = useState(false);
  const updateTaskMutation = useUpdateTask();

  return (
    <>
      <div
        className={`mt-3 flex h-12 w-full justify-start rounded border-[2px] border-lightbackground bg-background ${
          task.completed ? "opacity-50" : ""
        }`}
      >
        {task.completed ? (
          <button
            className="flex w-10 cursor-pointer items-center justify-center"
            onClick={() =>
              updateTaskMutation.mutate({ ...task, completed: false })
            }
          >
            <FaCheckSquare size={20} />
          </button>
        ) : (
          <button
            className="flex w-10 cursor-pointer items-center justify-center"
            onClick={() =>
              updateTaskMutation.mutate({ ...task, completed: true })
            }
          >
            <FaRegSquare size={20} />
          </button>
        )}
        <span
          className="flex flex-1 cursor-pointer items-center"
          onClick={() => setModal(true)}
        >
          <p className="mt-1">{task.name}</p>
        </span>
        <DatePicker
          value={task.date}
          onChange={(date) =>
            updateTaskMutation.mutate({ ...task, date: date })
          }
        />
      </div>
      {modal ? <TaskModal task={task} close={() => setModal(false)} /> : null}
    </>
  );
};

export const AddTask = ({ defaultDate }: { defaultDate: Date | null }) => {
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
