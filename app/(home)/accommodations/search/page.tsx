import { PageClient } from "./page-client";

type Props = {
  searchParams: Promise<{
    lat: string | undefined;
    lng: string | undefined;
  }>;
};

const AccommodationSearch = async ({ searchParams }: Props) => {
  const { lat, lng } = await searchParams;
  return <PageClient lat={lat} lng={lng} />;
};

export default AccommodationSearch;
