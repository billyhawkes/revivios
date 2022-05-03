import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";

interface Props {
	children: JSX.Element;
}

const Layout = ({ children }: Props) => {
	const router = useRouter();

	const { status } = useSession({
		required: true,
		onUnauthenticated() {
			// The user is not authenticated, handle it here.
		},
	});

	return (
		<>
			<Sidebar />
			<main className="w-screen p-10 pl-20">{children}</main>
		</>
	);
};

export default Layout;
