import { TodoList } from "@/features/todo-lists/types";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { TitleHeading } from "@/components/shared/title-heading";

export const TodoListsHeader = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <TitleHeading>TODOリスト一覧</TitleHeading>
      <Link href="/trips/new">
        <Button className="flex items-center gap-2">
          <Plus />
          旅行計画を作成
        </Button>
      </Link>
    </div>
  );
};
