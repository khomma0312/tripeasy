import { DeleteButtonWithDialog } from "@/components/shared/delete-button-with-dialog";

type Props = {
  onDelete: () => void;
  className?: string;
};

export const AccommodationDeleteButton = ({ onDelete, className }: Props) => {
  return (
    <DeleteButtonWithDialog
      dialogTitle="宿泊施設登録を削除"
      dialogDescription="宿泊施設の登録情報を削除してもよろしいですか？"
      onDelete={onDelete}
      className={className}
    />
  );
};
