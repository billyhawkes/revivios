import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";

const Header = () => {
	return (
		<header className="h-[80px] flex justify-between items-center max-w-screen-lg m-auto px-4">
			<div className="flex items-center">
				<Image src={Logo} alt="Revivios logo" width="30" height="30" />
				<h3 className="ml-4 mt-1">REVIVIOS</h3>
			</div>
			<nav>
				<Link href="/auth/signin">
					<a className="hover:opacity-90">Sign In</a>
				</Link>
				<Link href="/auth/register">
					<a className="btn-filled ml-8">Register</a>
				</Link>
			</nav>
		</header>
	);
};

export default Header;
