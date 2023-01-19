import type { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { api } from "../utils/api";
import { authOptions } from "./api/auth/[...nextauth]";
import { Controller, useForm } from "react-hook-form";
import type { CreateTask, Task } from "../types/tasks";
import { CreateTaskSchema } from "../types/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "../components/DatePicker";
import { useState } from "react";
import { FaCheckSquare, FaRegSquare, FaTimes, FaTrash } from "react-icons/fa";
import useOnClickOutside from "../hooks/useOnClickOutside";
import React from "react";

const useUpdateTask = () => {
  const utils = api.useContext();
  return api.tasks.update.useMutation({
    onSuccess: async () => {
      await utils.tasks.getTasks.invalidate();
    },
  });
};

const useDeleteTask = () => {
  const utils = api.useContext();
  return api.tasks.delete.useMutation({
    onSuccess: async () => {
      await utils.tasks.getTasks.invalidate();
    },
  });
};

const TaskModal = ({ task, close }: { task: Task; close: () => void }) => {
  const ref = React.createRef<HTMLDivElement>();
  useOnClickOutside(ref, close);
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-30">
      <div
        className="w-full max-w-screen-md rounded-xl bg-lightbackground"
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
        <div className="p-6">
          <h2 className="text-2xl">{task.name}</h2>
          <h2 className="mt-2 text-lg opacity-80">{task.description}</h2>
        </div>
      </div>
    </div>
  );
};

const TaskItem = ({ task }: { task: Task }) => {
  const [modal, setModal] = useState(false);
  const updateTaskMutation = useUpdateTask();

  return (
    <>
      <div className="mt-3 flex h-12 w-full max-w-screen-md justify-start rounded border-[2px] border-lightbackground bg-background">
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
      </div>
      {modal ? <TaskModal task={task} close={() => setModal(false)} /> : null}
    </>
  );
};

const AddTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<CreateTask>({
    defaultValues: { name: "", date: null },
    resolver: zodResolver(CreateTaskSchema),
  });
  const utils = api.useContext();
  const createTaskMutation = api.tasks.create.useMutation({
    onSuccess: async () => {
      await utils.tasks.getTasks.invalidate();
    },
  });

  const onSubmit = (data: CreateTask) => {
    createTaskMutation.mutate(data, {
      onSuccess: () => reset(),
      onError: (e) => console.error(e),
    });
  };

  return (
    <form
      className="mb-2 flex h-12 w-full max-w-screen-md rounded bg-lightbackground"
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

const App = () => {
  const { data: tasks } = api.tasks.getTasks.useQuery();

  return (
    <main className="flex min-h-screen flex-col items-center bg-background p-8 text-white">
      <AddTask />
      {tasks?.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      <button
        onClick={() => {
          signOut({ callbackUrl: "/" }).catch(() => console.error("ERROR"));
        }}
        className="btn mt-20"
      >
        Sign out
      </button>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default App;
