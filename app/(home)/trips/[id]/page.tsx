import { PageClient } from "./page-client";
import { TripProviders } from "./providers";

type Props = {
  params: Promise<{ id: number }>;
};

const Trip = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <TripProviders>
      <PageClient id={id} />
    </TripProviders>
  );
};

export default Trip;
