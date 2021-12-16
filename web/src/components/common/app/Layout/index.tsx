import Sidebar from "./Sidebar";

interface Props {
	children: JSX.Element;
}

const Layout = ({ children }: Props) => {
	return (
		<>
			<Sidebar />
			<main className="w-screen p-10 pl-20">{children}</main>
		</>
	);
};

export default Layout;
