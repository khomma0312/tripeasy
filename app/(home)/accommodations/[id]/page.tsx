import { PageClient } from "./page-client";

type Props = {
  params: Promise<{
    id: string | undefined;
  }>;
};

const Accommodation = async ({ params }: Props) => {
  const { id: strId } = await params;
  const id = strId ? Number(strId) : 0;
  return <PageClient id={id} />;
};

export default Accommodation;
