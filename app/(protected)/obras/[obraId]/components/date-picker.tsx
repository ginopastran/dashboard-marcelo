"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerFieldProps {
  label: string;
  value: Date | null | undefined;
  onChange: (date: Date | undefined) => void;
  disabled?: boolean;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  value,
  onChange,
  disabled,
}) => {
  return (
    <div className="flex flex-col space-y-2  w-full">
      <label
        className={cn(
          `text-lg font-semibold text-heading-blue ${
            disabled && " text-stone-600"
          }`
        )}
      >
        {label}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "w-full justify-start text-left font-normal bg-transparent border-b-[1px] border-black rounded-none px-0 py-0 hover:bg-transparent text-black",
              !value && "text-muted-foreground",
              disabled && "cursor-not-allowed border-b-[1px] border-gray-900"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : <span>Elije una fecha</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value || undefined}
            onSelect={onChange}
            initialFocus
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
