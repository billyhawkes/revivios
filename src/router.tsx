import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query";

// Create a new router instance
export const createRouter = () => {
  const router = createTanstackRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent",
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      );
    },
  });

  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
};

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
