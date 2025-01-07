import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";

type Props = {
  defaultTitle: string;
  onSave?: (title: string) => void;
};

export const EditableTitle = ({ defaultTitle, onSave }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(defaultTitle);

  const closeEditMode = () => {
    setIsEditing(false);
    setTitle(defaultTitle);
  };

  return (
    <div className="mb-2">
      {isEditing ? (
        <div className="flex items-center gap-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-fit"
          />
          <Button
            variant="outline"
            onClick={() => {
              onSave?.(title);
              closeEditMode();
            }}
            className="px-2"
          >
            <Check className="size-4 text-emerald-500" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => closeEditMode()}
            className="px-2"
          >
            <X className="size-4 text-rose-500" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">{defaultTitle}</h1>
          <Button
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="px-2 py-1"
          >
            <Pencil className="size-4 text-muted-foreground" />
          </Button>
        </div>
      )}
    </div>
  );
};
