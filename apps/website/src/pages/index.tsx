import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/landing/Layout";

const Home: NextPage = () => {
	return (
		<Layout>
			<>
				<section className="max-w-[50%] mt-24 p-4">
					<h1 className="text-7xl font-bold leading-normal">
						Your Life <span className="text-primary">Gamified.</span>
					</h1>
					<p className="opacity-80 leading-loose mb-12">
						Revivios is a new and upcoming productivity and life management tool that
						brings common video game tropes to life!
					</p>
					<Link href={`${process.env.NEXT_PUBLIC_APP_URL}/auth`}>
						<a className="btn-filled">Get Started</a>
					</Link>
					<Link href="https://github.com/billyhawkes/revivios">
						<a target="_blank" className="btn-ghost ml-8">
							View on Github
						</a>
					</Link>
				</section>
			</>
		</Layout>
	);
};

export default Home;
