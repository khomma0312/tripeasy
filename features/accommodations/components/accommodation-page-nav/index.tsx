import { useRouter } from "next/navigation";
import { Button } from "@/components/shadcn/button";
import { ArrowLeft, Pencil } from "lucide-react";
import { AccommodationDeleteButton } from "../accommodation-delete-button";
import { useDeleteAccommodation } from "../../hooks/use-delete-accommodation";

type Props = {
  id: number;
};

export const AccommodationPageNav = ({ id }: Props) => {
  const router = useRouter();
  const { onSubmit } = useDeleteAccommodation(id);

  return (
    <div className="flex justify-between items-center mb-6">
      <Button variant="outline" onClick={() => router.push("/accommodations")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        一覧に戻る
      </Button>
      <div className="flex gap-2">
        <Button onClick={() => router.push(`/accommodations/${id}/edit`)}>
          <Pencil />
          編集
        </Button>
        <AccommodationDeleteButton
          onDelete={() => {
            onSubmit(id);
            router.push(`/accommodations/`);
          }}
        />
      </div>
    </div>
  );
};
