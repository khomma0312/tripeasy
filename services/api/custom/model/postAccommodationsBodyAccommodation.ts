export type PostAccommodationsBodyAccommodation = {
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
  tripAdvisorUrl?: string;
};
