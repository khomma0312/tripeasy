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
import { Button } from "@/components/shadcn/button";
import { cn } from "@/utils/common";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  currentValue: string | FileList;
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
  disabled,
  isRequired,
}: Props<T>) => {
  const isCurrentValueURL =
    typeof currentValue === "string" && URL.canParse(currentValue);
  const [preview, setPreview] = useState(isCurrentValueURL ? currentValue : "");
  const [key, setKey] = useState("");
  const [isInputShown, setIsInputShown] = useState(
    isCurrentValueURL ? false : true
  );

  useEffect(() => {
    // RHFのform.resetではvalueをリセットするだけなので、valueが変更された時にkeyをリセットして再レンダリングさせる
    const randomKey = Math.random().toString(36);
    if (!currentValue) {
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
            <div className="flex items-center gap-2">
              <RHFFieldLabel
                label={label}
                htmlFor={name}
                isRequired={isRequired}
              />
              {!isInputShown && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsInputShown(true)}
                >
                  画像を変更する
                </Button>
              )}
            </div>
            <FormControl>
              <div className={cn("relative", !isInputShown && "hidden")}>
                <Input
                  {...rest}
                  id={name}
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
        <div>
          <p className="text-xs">設定中の画像</p>
          <div className="aspect-square max-w-32">
            <img
              src={preview}
              alt=""
              className="w-full h-full object-contain object-center"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
