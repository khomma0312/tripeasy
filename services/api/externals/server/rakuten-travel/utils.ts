export const getSearchParams = (lat: number, lng: number) => {
  const queries = {
    datumType: "1",
    latitude: lat.toString(),
    longitude: lng.toString(),
    searchRadius: "3",
    applicationId: process.env.RAKUTEN_APPLICATION_ID,
  };
  return new URLSearchParams(queries);
};
