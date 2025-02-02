export type PatchAccommodationsIdBodyAccommodation = {
  address?: string;
  bookingUrl?: string;
  checkIn: string;
  checkOut: string;
  image?: unknown;
  /** @minLength 1 */
  name: string;
  notes?: string;
  phoneNumber?: string;
  reservationPrice?: string;
  informationUrl?: string;
};
