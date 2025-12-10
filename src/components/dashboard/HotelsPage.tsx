import { Star, MapPin, Wifi, Car, Utensils, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import travelParis from '@/assets/travel-paris.jpg';
import travelSantorini from '@/assets/travel-santorini.jpg';
import travelTokyo from '@/assets/travel-tokyo.jpg';

const hotels = [
  {
    id: 1,
    name: 'Hotel Le Marais',
    location: 'Paris, France',
    image: travelParis,
    rating: 4.8,
    reviews: 2341,
    price: 289,
    amenities: ['wifi', 'parking', 'restaurant', 'pool'],
  },
  {
    id: 2,
    name: 'Santorini Bliss Resort',
    location: 'Santorini, Greece',
    image: travelSantorini,
    rating: 4.9,
    reviews: 1823,
    price: 450,
    amenities: ['wifi', 'pool', 'restaurant'],
  },
  {
    id: 3,
    name: 'Tokyo Grand Hotel',
    location: 'Tokyo, Japan',
    image: travelTokyo,
    rating: 4.7,
    reviews: 3102,
    price: 195,
    amenities: ['wifi', 'restaurant'],
  },
];

const amenityIcons: Record<string, typeof Wifi> = {
  wifi: Wifi,
  parking: Car,
  restaurant: Utensils,
  pool: Waves,
};

export function HotelsPage() {
  const handleBooking = () => {
    window.open('https://www.expedia.co.in/', '_blank');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background">
      {/* Header */}
      <div className="bg-gradient-hero border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-heading text-3xl font-bold mb-4">Find Your Perfect Stay</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full h-12 px-4 rounded-xl bg-card border border-border focus:border-primary outline-none"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Check-in - Check-out"
                className="w-full h-12 px-4 rounded-xl bg-card border border-border focus:border-primary outline-none"
              />
            </div>
            <Button variant="hero" size="lg">
              Search Hotels
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="glass-card overflow-hidden hover-lift group">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-background/90 backdrop-blur-sm flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber fill-amber" />
                  <span className="font-semibold text-sm">{hotel.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading text-xl font-semibold mb-1">{hotel.name}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  {hotel.location}
                </div>

                {/* Amenities */}
                <div className="flex gap-2 mb-4">
                  {hotel.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity];
                    return (
                      <div key={amenity} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                    );
                  })}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">${hotel.price}</span>
                    <span className="text-muted-foreground text-sm"> /night</span>
                  </div>
                  <Button variant="gradient" onClick={handleBooking}>
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
