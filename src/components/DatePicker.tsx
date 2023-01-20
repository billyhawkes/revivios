import type { Placement } from "@floating-ui/react-dom";
import { autoUpdate, flip, shift, useFloating } from "@floating-ui/react-dom";
import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import useCalendar, { DAYS, MONTHS, SHORTMONTHS } from "../hooks/useCalendar";
import useOnClickOutside from "../hooks/useOnClickOutside";

const ReadableDate = ({ date }: { date: Date }) => {
  const overdue = dayjs(date).isBefore(dayjs().startOf("day"));

  return (
    <div
      className={`items-center whitespace-nowrap pt-1 ${
        overdue ? "text-error" : ""
      } w-12 text-center`}
    >
      {SHORTMONTHS[dayjs(date).month()]} {dayjs(date).date()}
    </div>
  );
};

type Props = {
  value: Date | null;
  onChange: (date: Date) => void;
  allowedPlacements?: Placement[];
};

const DatePicker = ({ value, onChange }: Props) => {
  const { dates, monthYear, nextMonth, prevMonth } = useCalendar(value);
  const [open, setOpen] = useState<boolean>(false);
  const ref = React.createRef<HTMLDivElement>();
  const { x, y, refs, strategy } = useFloating({
    whileElementsMounted: autoUpdate,
    placement: "bottom",
    middleware: [flip(), shift({ padding: 32 })],
  });

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div className="relative flex" ref={ref}>
      <div
        className="z-10 flex min-w-[40px] flex-1 cursor-pointer items-center justify-center p-2"
        onClick={() => setOpen(!open)}
        ref={refs.setReference}
      >
        {value ? <ReadableDate date={value} /> : <FaCalendarAlt size={18} />}
      </div>
      {open && (
        <div
          ref={refs.setFloating}
          className="z-20 mt-2 w-64 rounded border-[2px] border-background bg-lightbackground p-6 shadow-xl"
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
        >
          <div className="flex justify-between">
            <div className="cursor-pointer" onClick={prevMonth}>
              Prev
            </div>
            {MONTHS[monthYear.month]} {monthYear.year}
            <div className="cursor-pointer" onClick={nextMonth}>
              Next
            </div>
          </div>
          <hr className="my-4 rounded" />
          <div className="flex">
            {DAYS.map((day, index) => (
              <div
                key={index}
                className="flex h-8 w-8 items-center justify-center"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap">
            {dates &&
              dates.map((date, index) => {
                const day = dayjs(date).date();
                const isToday = dayjs(date).isToday();
                if (date)
                  return (
                    <div
                      key={index}
                      onClick={() => onChange(date)}
                      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:opacity-80 ${
                        value && day === dayjs(value).date() ? "bg-primary" : ""
                      }
											${isToday ? "border border-[#ccc]" : ""}
											`}
                    >
                      {dayjs(date).date()}
                    </div>
                  );
                else return <div key={index} className="h-8 w-8"></div>;
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
