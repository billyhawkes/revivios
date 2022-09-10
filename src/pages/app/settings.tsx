import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import Sidebar from "../../components/Sidebar";
import { authOptions } from "../api/auth/[...nextauth]";

type Props = {
	session: Session;
};

const Settings = ({ session }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<>
			<Sidebar />
			<main className="pr-16 pl-[104px] py-12">
				<h1 className="text-3xl mb-8">Settings</h1>
				<p>{session.user?.email}</p>
				<p>{session.user?.name}</p>
			</main>
		</>
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
		},
	};
};

export default Settings;
