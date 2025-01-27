import { LoaderCircle } from "lucide-react";

export const CenteredLoaderCircle = () => {
  return (
    <div className="w-full h-full grid place-items-center">
      <LoaderCircle className="size-10 animate-spin" />
    </div>
  );
};
