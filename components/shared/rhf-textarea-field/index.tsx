import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";
import { Textarea } from "@/components/shadcn/textarea";
import { RHFFieldLabel } from "../rhf-field-label";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  rows?: number;
  isRequired?: boolean;
};

export const RHFTextareaField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  rows,
  isRequired,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <RHFFieldLabel label={label} htmlFor={name} isRequired={isRequired} />
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
