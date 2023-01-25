import type { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import React from "react";
import Sidebar from "../../../components/SideBar";
import { TaskForm, TaskItem } from "../../../components/task";
import { api } from "../../../utils/api";
import { authOptions } from "../../api/auth/[...nextauth]";

const isToday = (date: Date | null) => {
  if (date === null) return false;
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const App = () => {
  const { data: tasks } = api.tasks.getTasks.useQuery();

  return (
    <main className="flex min-h-screen flex-col items-center bg-background p-8 pl-[72px] text-white">
      <Sidebar />
      <div className="w-full max-w-screen-md">
        <h2 className="mb-6 text-2xl">Today</h2>
        <TaskForm defaultDate={new Date()} />
        {tasks
          ?.filter((task) => isToday(task.date))
          .sort(
            (task1, task2) => Number(task1.completed) - Number(task2.completed)
          )
          .map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
      </div>
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
