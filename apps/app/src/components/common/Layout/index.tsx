import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../../services/hooks/useAuth";
import Sidebar from "./Sidebar";

interface Props {
	children: JSX.Element;
}

const Layout = ({ children }: Props) => {
	const auth = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (auth.user === null) {
			router.push("/auth");
		}
	}, [auth, router]);

	if (!auth) {
		return <p>Loading</p>;
	}

	return (
		<>
			<Sidebar />
			<main className="w-screen h-screen pl-20 overflow-x-hidden pr-10">{children}</main>
		</>
	);
};

export default Layout;
