import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/common/Layout";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../services/firebase";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	// Prevent use of app without user authentication
	onAuthStateChanged(auth, (user) => {
		if (!user && !router.pathname.includes("auth"))
			router.push("/auth/login");
	});

	return (
		<Layout>
			<>
				<Head>
					<title>Gamified Life OS | REVIVIOS</title>
					<link
						href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&family=Open+Sans&display=swap"
						rel="stylesheet"
					></link>
				</Head>
				<Component {...pageProps} />
			</>
		</Layout>
	);
}

export default MyApp;
