import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useMatch, useNavigate, useSearch } from "@tanstack/react-router";
import { Calendar, Inbox, SquarePlus } from "lucide-react";
import { useEffect } from "react";

export const CommandPalette = () => {
  const navigate = useNavigate();

  const taskPage = useMatch({
    from: "/tasks",
    shouldThrow: false,
  });

  const { dialog } = useSearch({
    from: "__root__",
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        navigate({
          to: ".",
          search: { dialog: dialog === "command" ? undefined : "command" },
        });
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog
      open={dialog === "command"}
      onOpenChange={(open) =>
        navigate({ to: ".", search: { dialog: open ? "command" : undefined } })
      }
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem
            onSelect={() =>
              navigate({
                to: ".",
                search: {
                  dialog: "task",
                },
              })
            }
          >
            <SquarePlus />
            Add task
          </CommandItem>
        </CommandGroup>
        {taskPage && (
          <CommandGroup heading="View">
            <CommandItem
              onSelect={() =>
                navigate({
                  to: ".",
                  search: {
                    date: "inbox",
                  },
                })
              }
            >
              <Inbox />
              Inbox
            </CommandItem>
            <CommandItem
              onSelect={() =>
                navigate({
                  to: ".",
                  search: {
                    date: "today",
                  },
                })
              }
            >
              <Calendar />
              Today
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
};
