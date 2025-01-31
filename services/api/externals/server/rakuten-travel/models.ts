import { AxiosResponse } from "axios";

export interface HotelSearchResponse extends AxiosResponse {
  data: HotelSearchResponseData;
}

type HotelSearchResponseData = {
  pagingInfo: PagingInfo;
  hotels: HotelWrapper[];
};

type PagingInfo = {
  recordCount: number;
  pageCount: number;
  page: number;
  first: number;
  last: number;
};

type HotelWrapper = {
  hotel: HotelInfo;
};

type HotelInfo = [
  {
    hotelBasicInfo: HotelBasicInfo;
  },
  {
    hotelRatingInfo: HotelRatingInfo;
  }
];

type HotelBasicInfo = {
  hotelNo: number;
  hotelName: string;
  hotelInformationUrl: string;
  planListUrl: string;
  dpPlanListUrl: string;
  reviewUrl: string;
  hotelKanaName: string;
  hotelSpecial: string;
  hotelMinCharge: number;
  latitude: number;
  longitude: number;
  postalCode: string;
  address1: string;
  address2: string;
  telephoneNo: string;
  faxNo: string;
  access: string;
  parkingInformation: string;
  nearestStation: string;
  hotelImageUrl: string;
  hotelThumbnailUrl: string;
  roomImageUrl: string | null;
  roomThumbnailUrl: string | null;
  hotelMapImageUrl: string;
  reviewCount: number;
  reviewAverage: number;
  userReview: string;
};

type HotelRatingInfo = {
  serviceAverage: number;
  locationAverage: number;
  roomAverage: number;
  equipmentAverage: number;
  bathAverage: number;
  mealAverage: number;
};
