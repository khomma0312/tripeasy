export const getSearchParams = ({
  lat,
  lng,
  page,
}: {
  lat: number;
  lng: number;
  page: number;
}) => {
  const queries = {
    datumType: "1",
    latitude: lat.toString(),
    longitude: lng.toString(),
    page: page.toString(),
    searchRadius: "3",
    applicationId: process.env.RAKUTEN_APPLICATION_ID,
  };
  return new URLSearchParams(queries);
};
