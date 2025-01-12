import { FC, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/shadcn/form";

type Props = {
  children: ReactNode;
};

const StorybookFormProvider = ({ children }: Props) => {
  const methods = useForm();
  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>{children}</form>
    </Form>
  );
};

export const withRHFDecorator = () => (Story: FC) =>
  (
    <StorybookFormProvider>
      <Story />
    </StorybookFormProvider>
  );
