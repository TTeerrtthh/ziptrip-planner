export interface Location {
  name: string;
  lat: number;
  lng: number;
  address?: string;
}

export interface Activity {
  time: string;
  title: string;
  description?: string;
  type: 'travel' | 'hotel' | 'food' | 'activity' | 'explore' | 'culture';
  duration: string;
  location: Location;
  distance?: string;
  travelMode?: 'walk' | 'drive' | 'transit' | 'flight';
}

export interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  activities: Activity[];
}

export interface Place {
  name: string;
  rating: number;
  reviews: number;
  category: string;
  priceRange?: string;
  image: string;
  location: { lat: number; lng: number };
  distance?: string;
}

export interface TrendingItem {
  title: string;
  description: string;
  category: string;
}

export interface Itinerary {
  destination: string;
  summary: string;
  days: ItineraryDay[];
  places: {
    hotels: Place[];
    restaurants: Place[];
    attractions: Place[];
    experiences: Place[];
  };
  trending: TrendingItem[];
}

export interface WizardData {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  travelType: string;
  style: string;
  preferences: string[];
  hotelPreference: string;
  placesPreference: string[];
  foodPreference: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
