import { DeleteButtonWithDialog } from "@/components/shared/delete-button-with-dialog";

type Props = {
  onDelete: () => void;
  className?: string;
};

export const TripDeleteButton = ({ onDelete, className }: Props) => {
  return (
    <DeleteButtonWithDialog
      dialogTitle="旅程を削除"
      dialogDescription="旅程の登録情報を削除してもよろしいですか？紐づくTodoリストや宿泊施設の予約情報も削除されます。"
      onDelete={onDelete}
      className={className}
    />
  );
};
