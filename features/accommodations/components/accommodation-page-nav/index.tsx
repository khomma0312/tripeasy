import { useRouter } from "next/navigation";
import { Button } from "@/components/shadcn/button";
import { ArrowLeft, Pencil } from "lucide-react";

type Props = {
  id: number;
};

export const AccommodationPageNav = ({ id }: Props) => {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-6">
      <Button variant="outline" onClick={() => router.push("/accommodations")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        一覧に戻る
      </Button>
      <Button onClick={() => router.push(`/accommodations/${id}/edit`)}>
        <Pencil className="mr-2 h-4 w-4" />
        編集
      </Button>
    </div>
  );
};
