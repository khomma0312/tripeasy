import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { Textarea } from "@/components/shadcn/textarea";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  rows?: number;
};

export const RHFTextareaField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  rows,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              id={name}
              placeholder={placeholder}
              rows={rows}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
