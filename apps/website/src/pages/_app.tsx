import "ui/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
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
	);
}

export default MyApp;
