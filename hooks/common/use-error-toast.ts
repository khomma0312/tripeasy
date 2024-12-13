import { toast } from "@/hooks/shadcn/use-toast";

export const useErrorToast = () => {
  const errorToast = (title: string, message?: string) =>
    toast({
      variant: "destructive" as const,
      title: title,
      description: message,
    });

  return { errorToast };
};
