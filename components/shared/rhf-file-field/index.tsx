import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { useState, ChangeEvent, useEffect } from "react";
import { RHFFieldLabel } from "../rhf-field-label";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  currentValue: "" | FileList | null | undefined;
  placeholder?: string;
  disabled?: boolean;
  isRequired?: boolean;
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
  currentValue,
  placeholder,
  disabled,
  isRequired,
}: Props<T>) => {
  const [preview, setPreview] = useState("");
  const [key, setKey] = useState("");

  useEffect(() => {
    // RHFのform.resetではvalueをリセットするだけなので、valueが変更された時にkeyをリセットして再レンダリングさせる
    const randomKey = Math.random().toString(36);
    if (!(currentValue instanceof FileList)) {
      setKey(randomKey);
      setPreview("");
    }
  }, [currentValue]);

  return (
    <div key={key} className="flex flex-col gap-3">
      <FormField
        control={control}
        name={name}
        render={({
          field: {
            onChange,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            value,
            ...rest
          },
        }) => (
          <FormItem>
            <RHFFieldLabel
              label={label}
              htmlFor={name}
              isRequired={isRequired}
            />
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
