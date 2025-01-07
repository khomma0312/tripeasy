import { Skeleton } from "@/components/shadcn/skeleton";

export const TodoListTableLoadingSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col mb-8">
        <Skeleton className="w-1/2 h-9 mb-2" />
        <Skeleton className="w-1/4 h-5" />
      </div>
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 mb-6">
        <Skeleton className="space-y-2 w-full h-9" />
        <Skeleton className="space-y-2 w-full h-9" />
        <Skeleton className="space-y-2 w-full h-9" />
      </div>
      <div className="rounded-md">
        <Skeleton className="w-full h-36" />
      </div>
    </div>
  );
};
