import Header from "./Header";
import Footer from "./Footer";

interface Props {
	children: JSX.Element;
}

const Layout = ({ children }: Props) => {
	return (
		<>
			<Header />
			<main className="max-w-screen-md m-auto">{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
