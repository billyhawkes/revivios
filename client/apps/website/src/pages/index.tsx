import type { NextPage } from "next";
import Hero from "../components/landing/Hero";
import Layout from "../components/landing/Layout";

const Home: NextPage = () => {
	return (
		<Layout>
			<>
				<Hero />
			</>
		</Layout>
	);
};

export default Home;
