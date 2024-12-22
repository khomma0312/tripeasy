import { cn } from "@/utils/common";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-zinc-950/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
