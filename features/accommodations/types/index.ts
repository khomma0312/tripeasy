export type AccommodationForCard = {
  id: number;
  name: string;
  image: string;
  address?: string;
  checkIn: string;
  checkOut: string;
  bookingUrl?: string;
  bookingId?: string;
};

export type Accommodation = {
  id: number;
  name: string;
  image: string;
  address: string;
  checkIn: string;
  checkOut: string;
  reservationPrice: number;
  notes: string;
  bookingUrl: string;
  tripAdvisorUrl: string;
  phoneNumber: string;
};
