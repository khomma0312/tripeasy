import { CalendarDays, ListChecks } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";
import Link from "next/link";

type Props = {
  id: number;
  title: string;
  date: string;
  totalTasks: number;
  completedTasks: number;
};

export const TodoListCard = ({
  id,
  title,
  date,
  totalTasks,
  completedTasks,
}: Props) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pt-5 pb-4">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <CalendarDays className="mr-2 h-4 w-4" />
          期限: {date}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <ListChecks className="mr-2 h-4 w-4" />
          完了タスク: {completedTasks} / {totalTasks}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Link href={`/todo-lists/${id}`}>詳細を見る</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
