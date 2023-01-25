import type { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Sidebar from "../../../components/SideBar";
import { TaskItem } from "../../../components/task";
import { api } from "../../../utils/api";
import { authOptions } from "../../api/auth/[...nextauth]";
import Image from "next/image";
import XPBar from "../../../components/XPBar";

const Profile = () => {
  const { data: tasks } = api.tasks.getTasks.useQuery();
  const { data: user } = api.users.getUser.useQuery();

  return (
    <main className="flex min-h-screen flex-col items-center bg-background p-8 pl-[72px] text-white">
      <Sidebar />
      <div className="w-full max-w-screen-md">
        {user?.image ? (
          <Image
            src={user.image}
            width={80}
            height={80}
            alt="Users profile photo"
            className="rounded-xl"
          />
        ) : null}
        <h2 className="mt-4 text-xl">{user?.name}</h2>
        <h2 className="mt-2 text-lg opacity-80">{user?.email}</h2>
        <div className="my-8 h-[1px] w-full bg-white"></div>
        <h2 className=" text-xl">History</h2>
        {tasks
          ?.filter((task) => task.completed)
          .map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
      </div>
      <XPBar />
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

export default Profile;
