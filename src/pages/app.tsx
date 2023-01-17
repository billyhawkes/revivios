import type { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { api } from "../utils/api";
import { authOptions } from "./api/auth/[...nextauth]";
import { useForm } from "react-hook-form";
import type { CreateTask, Task } from "../types/tasks";
import { CreateTaskSchema } from "../types/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaCalendar } from "react-icons/fa";

const TaskItem = ({ task }: { task: Task }) => {
  return (
    <div className="mt-3 w-full max-w-screen-lg rounded border-[2px] border-lightbackground bg-background px-3 py-2">
      {task.name}
    </div>
  );
};

const AddTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTask>({
    defaultValues: { name: "", description: "", date: undefined },
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
    });
  };

  return (
    <form
      className="mb-2 flex h-12 w-full max-w-screen-lg rounded bg-lightbackground"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        id="name"
        autoComplete="off"
        {...register("name")}
        className="flex-1 rounded-l bg-lightbackground px-3 outline-none"
      />
      <input type="submit" value="" />
      {/* Add Date Picker */}
      <button className="flex items-center justify-center px-3">
        <FaCalendar size={20} />
      </button>
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
        className="btn"
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
