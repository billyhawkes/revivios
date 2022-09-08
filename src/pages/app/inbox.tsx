import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";

const Inbox = () => {
	const { data: session } = useSession();
	return (
		<div>
			<p>{session?.user?.email}</p>
			<p>{session?.user?.name}</p>
			<button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: "/auth/signin",
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

export default Inbox;
