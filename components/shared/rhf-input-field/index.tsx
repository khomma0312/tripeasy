import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { RHFFieldLabel } from "../rhf-field-label";
import { LucideProps } from "lucide-react";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  isRequired?: boolean;
  Icon?: React.ComponentType<LucideProps>;
};

export const RHFInputField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type,
  disabled,
  isRequired,
  Icon,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <RHFFieldLabel label={label} htmlFor={name} isRequired={isRequired} />
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
