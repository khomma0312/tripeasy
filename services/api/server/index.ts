import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client();

export const getLatLngFromAddress = async (address: string) => {
  const args = {
    params: {
      key: process.env.GOOGLE_MAPS_API_KEY,
      address,
    },
  };
  const res = await client.geocode(args).then((res) => res.data);

  if (res.status.toLowerCase() !== "ok") {
    throw new Error(res.error_message);
  }

  const result = res.results[0];
  // typeにpremiseかsubpremiseが含まれていれば、正確な位置情報として扱う
  const isLocationReliable = result.address_components[0].types.some(
    (type) => type === "premise" || type === "subpremise"
  );

  return {
    lat: res.results[0].geometry.location.lat,
    lng: res.results[0].geometry.location.lng,
    isLocationReliable,
  };
};
