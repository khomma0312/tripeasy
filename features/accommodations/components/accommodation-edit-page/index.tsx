import { AccommodationEditFormContainer } from "@/features/accommodations/components/accommodation-edit-form-container";

type Props = {
  id: number;
};

export const AccommodationEditPage = ({ id }: Props) => {
  return <AccommodationEditFormContainer id={id} />;
};
