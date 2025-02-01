import { PageClient } from "./page-client";

type Props = {
  params: Promise<{
    id: string | undefined;
  }>;
};

const AccommodationEdit = async ({ params }: Props) => {
  const { id: strId } = await params;
  const id = strId ? Number(strId) : 0;
  return <PageClient id={id} />;
};

export default AccommodationEdit;
