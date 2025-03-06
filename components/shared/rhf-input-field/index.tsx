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
import { cn } from "@/utils/common";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  readOnly?: boolean;
  hidden?: boolean;
  isRequired?: boolean;
  Icon?: React.ComponentType<LucideProps>;
  className?: string;
};

export const RHFInputField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type,
  disabled,
  isRequired,
  readOnly,
  Icon,
  hidden,
  className,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <RHFFieldLabel
              label={label}
              htmlFor={name}
              isRequired={isRequired}
            />
          )}
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
                readOnly={readOnly}
                className={cn(className, Icon && "pl-10")}
                hidden={hidden}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
