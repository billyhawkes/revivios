import { FaGithub, FaGoogle } from "react-icons/fa";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { signIn } from "next-auth/react";
import { GetServerSideProps } from "next";

const Auth = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-lightbackground text-white">
      <h2 className="mb-4 text-4xl">Sign In</h2>
      <div className="mb-8 h-1 w-20 rounded bg-white" />
      <div className="flex">
        <button
          className="mr-4 flex h-20 w-40 flex-row items-center justify-center rounded-lg bg-background"
          onClick={() => {
            signIn("github", { callbackUrl: "/app" }).catch(() =>
              console.error("ERROR")
            );
          }}
        >
          <FaGithub size={30} />
          <h3 className="ml-2 mt-1 text-xl">Github</h3>
        </button>
        <button
          className="flex h-20 w-40 flex-row items-center justify-center rounded-lg bg-background"
          onClick={() => {
            signIn("google", { callbackUrl: "/app" }).catch(() =>
              console.error("ERROR")
            );
          }}
        >
          <FaGoogle size={30} />
          <h3 className="ml-2 mt-1 text-xl">Google</h3>
        </button>
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

  if (session) {
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Auth;
