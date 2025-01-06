import Link from "next/link";
import { format } from "date-fns";
import { CalendarDays, ListChecks } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";
import { dateFormatStrForFormat } from "@/consts/common";

type Props = {
  id: number;
  title: string;
  startDate: string | undefined;
  totalTasks: number;
  completedTasks: number;
};

export const TodoListCard = ({
  id,
  title,
  startDate,
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
          {startDate &&
            `期限: ${format(new Date(startDate), dateFormatStrForFormat)}`}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <ListChecks className="mr-2 h-4 w-4" />
          完了タスク: {completedTasks} / {totalTasks}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/todo-lists/${id}`} className="w-full">
          <Button variant="outline" className="w-full">
            詳細を見る
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
