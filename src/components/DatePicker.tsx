import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { formatDate } from "@/lib/date";
import { startOfToday, startOfTomorrow } from "date-fns";

export const DatePicker = ({
  date,
  onDateChange,
}: {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-40 justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? formatDate(date) : "No date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          required={false}
          onSelect={onDateChange}
        />
        <div className="flex gap-2 px-2 pb-2">
          <Button
            size="sm"
            variant="link"
            onClick={() => onDateChange(startOfToday())}
          >
            Today
          </Button>
          <Button
            size="sm"
            variant="link"
            onClick={() => onDateChange(startOfTomorrow())}
          >
            Tomorrow
          </Button>
          <Button
            size="sm"
            variant="link"
            onClick={() => onDateChange(undefined)}
          >
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
