import { useState } from 'react';
import { Plane, ArrowRight, Clock, Wifi, Coffee, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const flights = [
  {
    id: 1,
    airline: 'Air France',
    logo: 'AF',
    departure: '08:30',
    arrival: '10:45',
    from: 'JFK',
    to: 'CDG',
    duration: '7h 15m',
    stops: 'Direct',
    price: 549,
    amenities: ['wifi', 'meals'],
  },
  {
    id: 2,
    airline: 'Delta Airlines',
    logo: 'DL',
    departure: '14:20',
    arrival: '05:35',
    from: 'JFK',
    to: 'CDG',
    duration: '7h 15m',
    stops: 'Direct',
    price: 489,
    amenities: ['wifi'],
  },
  {
    id: 3,
    airline: 'United Airlines',
    logo: 'UA',
    departure: '19:00',
    arrival: '09:15',
    from: 'JFK',
    to: 'CDG',
    duration: '7h 15m',
    stops: '1 Stop',
    price: 425,
    amenities: ['meals'],
  },
];

export function FlightsPage() {
  const [from, setFrom] = useState('New York (JFK)');
  const [to, setTo] = useState('Paris (CDG)');

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background">
      {/* Search Header */}
      <div className="bg-gradient-hero border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-heading text-3xl font-bold mb-6">Find Your Flight</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm text-muted-foreground mb-1 block">From</label>
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-card border border-border focus:border-primary outline-none"
              />
            </div>
            <div className="flex items-end justify-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-sm text-muted-foreground mb-1 block">To</label>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-card border border-border focus:border-primary outline-none"
              />
            </div>
            <div className="flex items-end">
              <Button variant="hero" size="lg">
                Search Flights
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {flights.map((flight) => (
            <div key={flight.id} className="glass-card p-6 hover-lift">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Airline */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {flight.logo}
                  </div>
                  <div>
                    <p className="font-semibold">{flight.airline}</p>
                    <p className="text-sm text-muted-foreground">{flight.stops}</p>
                  </div>
                </div>

                {/* Times */}
                <div className="flex-1 flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{flight.departure}</p>
                    <p className="text-sm text-muted-foreground">{flight.from}</p>
                  </div>
                  <div className="flex-1 flex items-center">
                    <div className="flex-1 border-t border-dashed border-border" />
                    <div className="px-3 py-1 rounded-full bg-muted text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {flight.duration}
                    </div>
                    <div className="flex-1 border-t border-dashed border-border" />
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{flight.arrival}</p>
                    <p className="text-sm text-muted-foreground">{flight.to}</p>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex items-center gap-2">
                  {flight.amenities.includes('wifi') && (
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <Wifi className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                  {flight.amenities.includes('meals') && (
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <Coffee className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">${flight.price}</p>
                  <Button variant="gradient" size="sm" className="mt-2">
                    Select
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
