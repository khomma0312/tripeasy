import { FormLabel } from "@/components/shadcn/form";

type Props = {
  label: string;
  htmlFor?: string | undefined;
  isRequired?: boolean;
};

export const RHFFieldLabel = ({ label, htmlFor, isRequired }: Props) => {
  return (
    <FormLabel htmlFor={htmlFor}>
      {label}
      {isRequired && <span className="text-rose-600 ml-2">*</span>}
    </FormLabel>
  );
};
