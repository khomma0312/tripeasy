import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { useState, ChangeEvent } from "react";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
};

const getImageData = (event: ChangeEvent<HTMLInputElement>) => {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
};

export const RHFFileField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
}: Props<T>) => {
  const [preview, setPreview] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <FormField
        control={control}
        name={name}
        render={({ field: { onChange, value, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...rest}
                  id={name}
                  placeholder={placeholder}
                  type="file"
                  disabled={disabled}
                  onChange={(event) => {
                    const { files, displayUrl } = getImageData(event);
                    setPreview(displayUrl);
                    onChange(files);
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {preview ? (
        <div className="aspect-square max-w-32">
          <img
            src={preview}
            alt=""
            className="w-full h-full object-contain object-center"
          />
        </div>
      ) : null}
    </div>
  );
};
