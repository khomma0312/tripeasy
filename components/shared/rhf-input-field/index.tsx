import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  Icon?: React.ComponentType<any>;
};

export const RHFInputField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type,
  disabled,
  Icon,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              {Icon && (
                <Icon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
              )}
              <Input
                {...field}
                id={name}
                placeholder={placeholder}
                type={type ? type : "text"}
                disabled={disabled}
                className={Icon && "pl-10"}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
