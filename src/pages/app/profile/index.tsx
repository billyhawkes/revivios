import type { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Sidebar from "../../../components/SideBar";
import { TaskItem } from "../../../components/task";
import { api } from "../../../utils/api";
import { authOptions } from "../../api/auth/[...nextauth]";
import Image from "next/image";

const Profile = () => {
  const { data: session } = useSession();
  const { data: tasks } = api.tasks.getTasks.useQuery();

  return (
    <main className="flex min-h-screen flex-col bg-background p-8 pl-[72px] text-white">
      <Sidebar />
      {session?.user?.image ? (
        <Image
          src={session.user.image}
          width={80}
          height={80}
          alt="Users profile photo"
          className="rounded-xl"
        />
      ) : null}

      <h2 className="mt-4 text-xl">{session?.user?.name}</h2>
      <h2 className="mt-2 text-lg opacity-80">{session?.user?.email}</h2>
      <div className="my-8 h-[1px] w-full bg-white"></div>
      <h2 className=" text-xl">History</h2>
      {tasks
        ?.filter((task) => task.completed)
        .map((task) => (
          <TaskItem task={task} key={task.id} />
        ))}
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
