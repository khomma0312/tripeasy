import { Control, FieldValues, Path } from "react-hook-form";
import { Button } from "@/components/shadcn/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";
import { RHFFieldLabel } from "../rhf-field-label";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/utils/common";

export type ComboboxItem = {
  value: string;
  label: string;
};

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  items: ComboboxItem[] | [];
  disabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
};

export const RHFComboboxField = <T extends FieldValues>({
  control,
  name,
  label,
  items,
  disabled,
  isRequired,
  placeholder = "選択してください",
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <RHFFieldLabel label={label} htmlFor={name} isRequired={isRequired} />
          <Popover>
            <PopoverTrigger asChild disabled={disabled || items.length === 0}>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[300px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? items.find((item) => item.value === field.value)?.label
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="項目を検索" />
                <CommandList>
                  <CommandEmpty>
                    {items.length > 0
                      ? "該当する項目が見つかりません"
                      : "まだ項目が登録されていません"}
                  </CommandEmpty>
                  <CommandGroup>
                    {items.map((item) => (
                      <CommandItem
                        value={item.value}
                        key={item.value}
                        onSelect={() => {
                          field.onChange(item.value);
                        }}
                      >
                        {item.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            item.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
