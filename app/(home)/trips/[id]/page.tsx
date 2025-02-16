import { PageClient } from "./page-client";

type Props = {
  params: Promise<{ id: number }>;
};

const Trip = async ({ params }: Props) => {
  const { id } = await params;
  return <PageClient id={id} />;
};

export default Trip;
