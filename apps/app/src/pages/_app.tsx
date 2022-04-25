import "ui/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/common/Layout";
import { useRouter } from "next/router";
import { auth } from "../services/firebase";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	const [queryClient] = useState(() => new QueryClient());

	// Prevent use of app without user authentication
	useEffect(() => {
		if (!auth.currentUser && !router.pathname.includes("auth"))
			router.push("/auth");
	}, [router.isReady, router.pathname]);

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
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
			</Hydrate>
		</QueryClientProvider>
	);
}

export default MyApp;
