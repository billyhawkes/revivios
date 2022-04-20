import { useRouter } from "next/router";
import Sidebar from "./Sidebar";

interface Props {
	children: JSX.Element;
}

const Layout = ({ children }: Props) => {
	const router = useRouter();
	return (
		<>
			{!router.pathname.includes("auth") && <Sidebar />}
			<main className="w-screen p-10 pl-20">{children}</main>
		</>
	);
};

export default Layout;
