import Sidebar from "./Sidebar";

interface Props {
	children: JSX.Element;
}

const Layout = ({ children }: Props) => {
	return (
		<>
			<Sidebar />
			<main className="w-screen h-screen pl-20 overflow-x-hidden">{children}</main>
		</>
	);
};

export default Layout;
