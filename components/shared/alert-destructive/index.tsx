import { AlertCircle, X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/alert";
import { useState } from "react";
import { Button } from "@/components/shadcn/button";

type Props = {
  title: string;
  description: string;
};

export const AlertDestructive = ({ title, description }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  if (!isVisible) return null;

  return (
    <Alert variant="destructive" className="pb-2">
      <div className="flex items-center gap-2 mb-1">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="m-0 font-semibold">{title}</AlertTitle>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6 rounded-full"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
