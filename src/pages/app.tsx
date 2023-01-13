import type { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

const App = () => {
  const { data: session } = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-lightbackground text-white">
      {session?.user?.email}
      {session?.user?.name}
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
