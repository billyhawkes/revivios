import "ui/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/common/Layout";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import React, { useState } from "react";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps }, ...appProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient());

	const isLayoutNeeded = ![`/auth`].includes(appProps.router.pathname);
	const LayoutComponent = isLayoutNeeded ? Layout : React.Fragment;

	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<LayoutComponent>
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
					</LayoutComponent>
				</Hydrate>
			</QueryClientProvider>
		</SessionProvider>
	);
}

export default MyApp;
