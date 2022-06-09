import "ui/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/common/Layout";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import React, { useEffect, useState } from "react";
import { ProvideAuth } from "../services/hooks/useAuth";
import axios from "axios";

function MyApp({ Component, pageProps: { session, ...pageProps }, ...appProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient());

	const isAuthPage = appProps.router.pathname.includes(`auth`);
	const LayoutComponent = !isAuthPage ? Layout : React.Fragment;

	return (
		<QueryClientProvider client={queryClient}>
			<ProvideAuth>
				<Hydrate state={pageProps.dehydratedState}>
					<LayoutComponent>
						<>
							<Head>
								<title>Gamified Life OS | REVIVIOS</title>
							</Head>
							<Component {...pageProps} />
						</>
					</LayoutComponent>
				</Hydrate>
			</ProvideAuth>
		</QueryClientProvider>
	);
}

export default MyApp;
