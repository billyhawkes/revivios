import type { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import React from "react";
import Sidebar from "../../../components/SideBar";
import { AddTask, TaskItem } from "../../../components/task";
import { api } from "../../../utils/api";
import { authOptions } from "../../api/auth/[...nextauth]";

const App = () => {
  const { data: tasks } = api.tasks.getTasks.useQuery();

  return (
    <main className="flex min-h-screen flex-col items-center bg-background p-8 pl-[72px] text-white">
      <Sidebar />
      <div className="w-full max-w-screen-md">
        <h2 className="mb-6 text-2xl">Inbox</h2>
        <AddTask />
        {tasks
          ?.filter((task) => task.date === null)
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
