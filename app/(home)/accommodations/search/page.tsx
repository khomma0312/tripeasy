import { PageClient } from "./page-client";

type Props = {
  searchParams: Promise<{
    lat: string | undefined;
    lng: string | undefined;
    page: string | undefined;
  }>;
};

const AccommodationSearch = async ({ searchParams }: Props) => {
  const { lat, lng, page } = await searchParams;
  return <PageClient lat={lat} lng={lng} page={page} />;
};

export default AccommodationSearch;
