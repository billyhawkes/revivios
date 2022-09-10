import Link from "next/link";
import { FaCog, FaSun, FaBriefcase, FaCalendarAlt } from "react-icons/fa";

const Sidebar = () => {
	return (
		<nav className="w-10 py-6 bg-lightbackground fixed left-0 h-screen flex flex-col justify-between items-center z-50">
			<div>
				<div className="flex flex-col">
					<SidebarIcon name="Today" href="/app/tasks/today" icon={<FaSun size="26" />} />
				</div>
				<div className="flex flex-col">
					<SidebarIcon
						name="Inbox"
						href="/app/tasks/inbox"
						icon={<FaBriefcase size="24" />}
					/>
				</div>
				{/* <div className="flex flex-col">
					<SidebarIcon
						name="Calendar"
						href="/app/tasks/calendar"
						icon={<FaCalendarAlt size="24" />}
					/>
				</div> */}
			</div>
			<div className="flex flex-col">
				<SidebarIcon name="Settings" href="/app/settings" icon={<FaCog size="24" />} />
			</div>
		</nav>
	);
};

interface Props {
	name: string;
	icon: JSX.Element;
	href: string;
}

const SidebarIcon = ({ name, icon, href }: Props) => {
	return (
		<div className="flex items-center my-3">
			<Link href={href}>
				<a className="peer opacity-50 hover:opacity-70 transition-opacity">{icon}</a>
			</Link>
			<span className="px-2 py-1 pt-[6px] rounded invisible opacity-0 peer-hover:visible peer-hover:opacity-100 absolute left-12 bg-lightbackground transition z-50">
				{name}
			</span>
		</div>
	);
};

export default Sidebar;
