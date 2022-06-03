import Image from "next/image";
import Link from "next/link";

const Header = () => {
	return (
		<header className="h-[80px] flex justify-between items-center max-w-screen-lg m-auto px-4">
			<div className="flex items-center">
				<Image src={"/logo.svg"} alt="Revivios logo" width="30" height="30" />
				<h3 className="ml-4 mt-1">REVIVIOS</h3>
			</div>
			<nav>
				<Link href="https://github.com/billyhawkes/revivios">
					<a target="_blank" className="btn-ghost ml-8">
						View on Github
					</a>
				</Link>
			</nav>
		</header>
	);
};

export default Header;
