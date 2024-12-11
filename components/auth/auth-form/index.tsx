import { ReactNode } from "react";
import { Form } from "@/components/shadcn/form";
import { TitleHeading } from "@/components/shared/title-heading";
import { FieldValues, UseFormReturn } from "react-hook-form";

type Props<T extends FieldValues> = {
  title: string;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  children: ReactNode;
};

export const AuthForm = <T extends FieldValues>({
  title,
  form,
  onSubmit,
  children,
}: Props<T>): ReactNode => {
  return (
    <div className="flex flex-col gap-3">
      <TitleHeading>{title}</TitleHeading>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {children}
        </form>
      </Form>
    </div>
  );
};
