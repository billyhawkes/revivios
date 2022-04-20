import Link from "next/link";
import { FaCog, FaUserCircle } from "react-icons/fa";

const Sidebar = () => {
	return (
		<nav className="w-10 bg-lightbackground fixed left-0 h-screen flex flex-col justify-end items-center">
			<SidebarIcon href="/account" icon={<FaUserCircle size="24" />} />
			<SidebarIcon href="/settings" icon={<FaCog size="24" />} />
		</nav>
	);
};

interface Props {
	icon: JSX.Element;
	href: string;
}

const SidebarIcon = ({ icon, href }: Props) => {
	return (
		<Link href={href}>
			<a className="mb-6 opacity-50 hover:opacity-70">{icon}</a>
		</Link>
	);
};

export default Sidebar;
