import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { RHFFieldLabel } from "../rhf-field-label";

export type SelectItem = {
  value: string;
  label: string;
};

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  items: SelectItem[] | [];
  disabled?: boolean;
  isRequired?: boolean;
};

export const RHFSelectField = <T extends FieldValues>({
  control,
  name,
  label,
  items,
  disabled,
  isRequired,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <RHFFieldLabel label={label} htmlFor={name} isRequired={isRequired} />
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger disabled={disabled || items.length === 0}>
                <SelectValue
                  placeholder={
                    items.length > 0
                      ? "紐づく旅行を選択"
                      : "まだ旅行予定が登録されていません"
                  }
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem key="0" value="0">
                紐づく旅行を選択
              </SelectItem>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
