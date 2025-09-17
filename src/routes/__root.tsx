import {
  ClientOnly,
  HeadContent,
  Link,
  Scripts,
  createRootRouteWithContext,
  retainSearchParams,
  useMatch,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";
import { CommandPalette } from "@/components/CommandPallete";
import z from "zod";
import { TaskDialog } from "@/components/TaskDialog";
import {
  Calendar,
  CalendarCheck,
  HomeIcon,
  Inbox,
  List,
  SquareCheckBig,
} from "lucide-react";
import { taskCollection } from "@/lib/collections/tasks";
import { Button } from "@/components/ui/button";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  validateSearch: z.object({
    dialog: z.enum(["command", "task"]).optional(),
    id: z.string().optional(),
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
  search: {
    middlewares: [retainSearchParams(true)],
  },
  shellComponent: RootDocument,
  loader: async () => {
    await taskCollection.preload();
  },
});

const NavigationItem = ({
  children,
  isActive,
}: {
  children: React.ReactNode;
  isActive: boolean;
}) => {
  return (
    <Button
      className="rounded-full"
      variant={isActive ? "default" : "ghost"}
      size="lg"
    >
      {children}
    </Button>
  );
};

const Navigation = () => {
  const taskPage = useMatch({
    from: "/tasks",
    shouldThrow: false,
  });

  return (
    <div className="flex items-center justify-center w-screen absolute bottom-8 flex-col gap-4">
      {taskPage && (
        <nav className="flex items-center gap-4 px-4 py-2 backdrop-blur-lg drop-shadow-lg backdrop-opacity-50 rounded-full bg-popover">
          <Link
            to="/tasks"
            search={{
              filter: "all",
            }}
          >
            {({ isActive }) => (
              <NavigationItem isActive={isActive}>
                <List />
                All
              </NavigationItem>
            )}
          </Link>
          <Link
            to="/tasks"
            search={{
              filter: "inbox",
            }}
          >
            {({ isActive }) => (
              <NavigationItem isActive={isActive}>
                <Inbox />
                Inbox
              </NavigationItem>
            )}
          </Link>
          <Link to="/tasks" search={{ filter: "today" }}>
            {({ isActive }) => (
              <NavigationItem isActive={isActive}>
                <Calendar />
                Today
              </NavigationItem>
            )}
          </Link>
          <Link to="/tasks" search={{ filter: "tomorrow" }}>
            {({ isActive }) => (
              <NavigationItem isActive={isActive}>
                <Calendar />
                Tomorrow
              </NavigationItem>
            )}
          </Link>
        </nav>
      )}
      <nav className="flex items-center gap-4 px-4 py-2 backdrop-blur-lg drop-shadow-lg backdrop-opacity-50 rounded-full bg-popover">
        <Link to="/">
          {({ isActive }) => (
            <NavigationItem isActive={isActive}>
              <HomeIcon />
              Home
            </NavigationItem>
          )}
        </Link>
        <Link to="/tasks">
          {({ isActive }) => (
            <NavigationItem isActive={isActive}>
              <SquareCheckBig />
              Tasks
            </NavigationItem>
          )}
        </Link>
        <Link to="/habits">
          {({ isActive }) => (
            <NavigationItem isActive={isActive}>
              <CalendarCheck />
              Habits
            </NavigationItem>
          )}
        </Link>
      </nav>
    </div>
  );
};

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <ClientOnly>
          <TaskDialog />
          <Navigation />
          <CommandPalette />
        </ClientOnly>
        <Scripts />
      </body>
    </html>
  );
}
