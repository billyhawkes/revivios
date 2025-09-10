import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";
import { CommandPalette } from "@/components/CommandPallete";
import z from "zod";
import { TaskDialog } from "@/components/TaskDialog";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  validateSearch: z.object({
    dialog: z.enum(["command", "task"]).optional(),
  }),
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Revivios",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TaskDialog />
        <CommandPalette />
        <Scripts />
      </body>
    </html>
  );
}
