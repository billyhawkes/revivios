import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
	return (
		<div>
			<nav>
				<Link href="/auth/signin">Sign In</Link>
				<Link href="/auth/register">Register</Link>
			</nav>
		</div>
	);
};

export default Home;
