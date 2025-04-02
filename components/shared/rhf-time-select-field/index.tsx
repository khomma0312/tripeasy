import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";
import { RHFFieldLabel } from "../rhf-field-label";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { Input } from "@/components/shadcn/input";
import { convertTimeToDate } from "@/features/trips/utils";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  onChange: (hour: string, minute: string) => void;
  label?: string;
  comparedTime?: {
    hour: number;
    minute: number;
  };
  isRequired?: boolean;
  defaultHour?: number;
  defaultMinute?: number;
};

// セレクトボックスの選択肢の設定
const MINUTE_STEP = 10;
const MINUTE_OPTION_NUMBERS = Array.from(
  { length: 6 },
  (_, i) => i * MINUTE_STEP
);
const HOUR_OPTION_NUMBERS = Array.from({ length: 24 }, (_, i) => i);

const hourOptions = HOUR_OPTION_NUMBERS.map((hour) => ({
  value: hour.toString(),
  displayValue: hour.toString().padStart(2, "0"),
}));
const minuteOptions = MINUTE_OPTION_NUMBERS.map((minute) => ({
  value: minute.toString(),
  displayValue: minute.toString().padStart(2, "0"),
}));

const padTime = (time: number | string) => {
  return time.toString().padStart(2, "0");
};

export const RHFTimeSelectField = <T extends FieldValues>({
  control,
  name,
  onChange,
  label,
  comparedTime,
  isRequired,
  defaultHour,
  defaultMinute,
}: Props<T>) => {
  const [hour, setHour] = useState<string>(defaultHour?.toString() || "0");
  const [minute, setMinute] = useState<string>(
    defaultMinute?.toString() || "0"
  );

  const { hour: comparedTimeHour, minute: comparedTimeMinute } =
    comparedTime || {};

  const comparedTimeDate = comparedTime
    ? convertTimeToDate(
        new Date(),
        `${comparedTimeHour}:${comparedTimeMinute}:00`
      )
    : undefined;
  const fieldTimeDate = convertTimeToDate(new Date(), `${hour}:${minute}:00`);

  // 現在のフィールドの時間が比較対象の時間を超えないよう制御する
  useEffect(() => {
    if (
      comparedTimeHour === undefined ||
      comparedTimeMinute === undefined ||
      comparedTimeDate === undefined
    )
      return;

    // 比較対象の分が最大値を超えているかどうか
    const isComparedMinuteOverMax =
      comparedTimeMinute >=
      MINUTE_OPTION_NUMBERS[MINUTE_OPTION_NUMBERS.length - 1];

    // 比較対象の時間が現在のフィールドの時間よりも前かどうか
    const isFieldTimeLessThanOrEqualComparedTime =
      fieldTimeDate.getTime() <= comparedTimeDate.getTime();

    if (isFieldTimeLessThanOrEqualComparedTime) {
      if (isComparedMinuteOverMax) {
        setHour(padTime(comparedTimeHour + 1));
        setMinute("00");
      } else {
        setHour(padTime(comparedTimeHour));
        setMinute(padTime(comparedTimeMinute + MINUTE_STEP));
      }
    }

    onChange(padTime(hour), padTime(minute));
  }, [comparedTime, hour, minute]);

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
