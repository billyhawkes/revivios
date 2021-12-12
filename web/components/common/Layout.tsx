import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import React from "react";

interface Props {
	children: JSX.Element;
}

const Layout = ({ children }: Props) => {
	return (
		<>
			<header className="h-[80px] flex justify-between items-center max-w-screen-lg m-auto">
				<div className="flex items-center">
					<Image
						src={Logo}
						alt="Revivios logo"
						width="30"
						height="30"
					/>
					<h3 className="ml-4 mt-1">REVIVIOS</h3>
				</div>
				<nav>
					<Link href="/auth/signin">Sign In</Link>
					<Link href="/auth/register">
						<a className="btn-filled ml-4">Register</a>
					</Link>
				</nav>
			</header>
			<main className="max-w-screen-md m-auto">{children}</main>
		</>
	);
};

export default Layout;
