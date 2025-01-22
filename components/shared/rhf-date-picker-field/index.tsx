import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { DatePicker } from "@/components/shared/date-picker";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
};

export const RHFDatePickerField = <T extends FieldValues>({
  control,
  name,
  label,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full sm:w-auto">
          <div className="flex flex-col gap-3">
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <FormControl>
              <DatePicker
                date={field.value}
                setDate={(date) => field.onChange(date)}
                className="w-full sm:w-auto"
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
