import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { trpc } from "../../../utils/trpc";
import { authOptions } from "../../api/auth/[...nextauth]";

type Props = {
	page: string | string[] | undefined;
	session: Session;
};

const Tasks = ({ page, session }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const { data: tasks } = trpc.tasks.findAll.useQuery();

	return (
		<div>
			<p>{session?.user?.email}</p>
			<p>{page}</p>
			{tasks && tasks.map((task) => <div key={task.id}>{task.name}</div>)}
			<p>{session?.user?.name}</p>
			<button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
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
			page: ctx.params?.page,
		},
	};
};

export default Tasks;
