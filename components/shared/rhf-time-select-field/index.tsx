import { Control, FieldValues, Path, UseFormSetValue } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";
import { RHFFieldLabel } from "../rhf-field-label";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { Input } from "@/components/shadcn/input";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  onChange: (hour: string, minute: string) => void;
  label?: string;
  isRequired?: boolean;
  defaultHour?: string;
  defaultMinute?: string;
};

const hourOptions = Array.from({ length: 24 }, (_, i) => ({
  value: i.toString(),
  displayValue: i.toString().padStart(2, "0"),
}));
const minuteOptions = [0, 10, 20, 30, 40, 50].map((minute) => ({
  value: minute.toString(),
  displayValue: minute.toString().padStart(2, "0"),
}));

export const RHFTimeSelectField = <T extends FieldValues>({
  control,
  name,
  onChange,
  label,
  isRequired,
  defaultHour,
  defaultMinute,
}: Props<T>) => {
  const [hour, setHour] = useState<string>(defaultHour || "0");
  const [minute, setMinute] = useState<string>(defaultMinute || "0");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full sm:w-auto">
          <div className="flex flex-col gap-3">
            {label && (
              <RHFFieldLabel
                label={label}
                htmlFor={name}
                isRequired={isRequired}
              />
            )}
            <div className="flex items-center gap-2">
              <Select
                value={hour}
                onValueChange={(value) => {
                  setHour(value);
                  onChange(value, minute);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="0" />
                </SelectTrigger>
                <SelectContent>
                  {hourOptions.map((hour) => (
                    <SelectItem key={hour.value} value={hour.value}>
                      {hour.displayValue}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span>:</span>
              <Select
                value={minute}
                onValueChange={(value) => {
                  setMinute(value);
                  onChange(hour, value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="0" />
                </SelectTrigger>
                <SelectContent>
                  {minuteOptions.map((minute) => (
                    <SelectItem key={minute.value} value={minute.value}>
                      {minute.displayValue}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormControl>
                <Input {...field} name={name} hidden className="hidden" />
              </FormControl>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
