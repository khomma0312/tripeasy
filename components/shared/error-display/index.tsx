import { AlertCircle } from "lucide-react";
import { Button } from "@/components/shadcn/button";

type Props = {
  message: string;
  onRetry: () => void;
};

export const ErrorDisplay = ({ message, onRetry }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-red-50 border border-red-200 rounded-md">
      <AlertCircle className="size-10 text-red-500 mb-2" />
      <p className="text-red-700 mb-4">{message}</p>
      <Button
        onClick={onRetry}
        variant="outline"
        className="bg-white hover:bg-red-50"
      >
        再試行
      </Button>
    </div>
  );
};
