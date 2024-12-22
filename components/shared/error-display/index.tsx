import { AlertCircle } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { FallbackProps } from "react-error-boundary";

export const ErrorDisplay = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-red-50 border border-red-200 rounded-md">
      <AlertCircle className="size-10 text-red-500 mb-2" />
      <p className="text-red-700 mb-4">データの取得に失敗しました</p>
      <Button
        onClick={resetErrorBoundary}
        variant="outline"
        className="bg-white hover:bg-red-50"
      >
        再試行
      </Button>
    </div>
  );
};
