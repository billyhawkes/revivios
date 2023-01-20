import Link from "next/link";
import { FaSun, FaBriefcase } from "react-icons/fa";

const Sidebar = () => {
  return (
    <nav className="fixed left-0 top-0 z-10 flex h-screen w-10 flex-col items-center justify-between bg-lightbackground py-6">
      <div>
        <div className="flex flex-col">
          <SidebarIcon
            name="Today"
            href="/app/today"
            icon={<FaSun size="26" />}
          />
        </div>
        <div className="flex flex-col">
          <SidebarIcon
            name="Inbox"
            href="/app/inbox"
            icon={<FaBriefcase size="24" />}
          />
        </div>
        {/* <div className="flex flex-col">
          <SidebarIcon
            name="Calendar"
            href="/app/calendar"
            icon={<FaCalendarAlt size="24" />}
          />
        </div> */}
      </div>
      {/* <div className="flex flex-col">
        <SidebarIcon
          name="Settings"
          href="/app/settings"
          icon={<FaCog size="24" />}
        />
      </div> */}
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
    <div className="my-3 flex items-center">
      <Link
        href={href}
        className="peer opacity-50 transition-opacity hover:opacity-70"
      >
        {icon}
      </Link>
      <span className="invisible absolute left-12 z-50 rounded bg-lightbackground px-2 py-1 pt-[6px] opacity-0 transition peer-hover:visible peer-hover:opacity-100">
        {name}
      </span>
    </div>
  );
};

export default Sidebar;
