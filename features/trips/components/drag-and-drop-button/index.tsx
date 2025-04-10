import { cn } from "@/utils/common";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { ArrowDownUp } from "lucide-react";

type Props = {
  listeners: SyntheticListenerMap | undefined;
};

export const DragAndDropButton = ({ listeners }: Props) => {
  return (
    <div
      {...listeners}
      className={cn(
        "flex items-center justify-center gap-1 h-8 px-3 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none cursor-move hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <ArrowDownUp className="size-4" />
      移動
    </div>
  );
};
