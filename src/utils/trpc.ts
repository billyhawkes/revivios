// src/utils/trpc.ts
import type { AppRouter } from "../server/routers/app";
import type { inferProcedureOutput, inferProcedureInput } from "@trpc/server";
import { setupTRPC } from "@trpc/next";
import superjson from "superjson";
import { QueryClientConfig } from "react-query";

const getBaseUrl = () => {
	if (typeof window !== "undefined") {
		return "";
	}
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

	return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const trpc = setupTRPC<AppRouter>({
	config() {
		const url = `${getBaseUrl()}/api/trpc`;

		return {
			url,
			transformer: superjson,
			queryClientConfig: {
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
					},
				},
			} as QueryClientConfig,
		};
	},
	ssr: false,
});

/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type inferQueryOutput<TRouteKey extends keyof AppRouter["_def"]["queries"]> =
	inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;

export type inferQueryInput<TRouteKey extends keyof AppRouter["_def"]["queries"]> =
	inferProcedureInput<AppRouter["_def"]["queries"][TRouteKey]>;

export type inferMutationOutput<TRouteKey extends keyof AppRouter["_def"]["mutations"]> =
	inferProcedureOutput<AppRouter["_def"]["mutations"][TRouteKey]>;

export type inferMutationInput<TRouteKey extends keyof AppRouter["_def"]["mutations"]> =
	inferProcedureInput<AppRouter["_def"]["mutations"][TRouteKey]>;
