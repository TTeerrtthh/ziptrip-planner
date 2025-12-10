import { useState } from 'react';
import { Download, MessageCircle, MapPin, Clock, Utensils, Camera, Compass, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const itineraryDays = [
  {
    day: 1,
    title: 'Arrival & City Exploration',
    activities: [
      { time: '09:00', title: 'Arrive at Paris CDG Airport', type: 'travel', duration: '1h transfer' },
      { time: '11:00', title: 'Check-in at Hotel Le Marais', type: 'hotel', duration: '30 min' },
      { time: '12:00', title: 'Lunch at Café de Flore', type: 'food', duration: '1.5h' },
      { time: '14:00', title: 'Explore the Latin Quarter', type: 'explore', duration: '3h' },
      { time: '18:00', title: 'Seine River Cruise', type: 'activity', duration: '2h' },
      { time: '20:30', title: 'Dinner at Le Comptoir', type: 'food', duration: '2h' },
    ],
  },
  {
    day: 2,
    title: 'Iconic Landmarks',
    activities: [
      { time: '08:00', title: 'Breakfast at hotel', type: 'food', duration: '1h' },
      { time: '09:30', title: 'Eiffel Tower Visit', type: 'activity', duration: '3h' },
      { time: '13:00', title: 'Lunch at Champ de Mars', type: 'food', duration: '1h' },
      { time: '14:30', title: 'Louvre Museum', type: 'activity', duration: '4h' },
      { time: '19:00', title: 'Dinner in Montmartre', type: 'food', duration: '2h' },
    ],
  },
  {
    day: 3,
    title: 'Art & Culture',
    activities: [
      { time: '09:00', title: 'Musée d\'Orsay', type: 'activity', duration: '3h' },
      { time: '12:30', title: 'Lunch at Saint-Germain', type: 'food', duration: '1.5h' },
      { time: '14:30', title: 'Notre-Dame Cathedral', type: 'activity', duration: '2h' },
      { time: '17:00', title: 'Shopping at Galeries Lafayette', type: 'explore', duration: '2h' },
      { time: '20:00', title: 'Farewell Dinner', type: 'food', duration: '2h' },
    ],
  },
];

const typeIcons: Record<string, typeof MapPin> = {
  travel: MapPin,
  hotel: MapPin,
  food: Utensils,
  activity: Camera,
  explore: Compass,
};

const typeColors: Record<string, string> = {
  travel: 'bg-sky/10 text-sky',
  hotel: 'bg-primary/10 text-primary',
  food: 'bg-amber/10 text-amber',
  activity: 'bg-coral/10 text-coral',
  explore: 'bg-teal/10 text-teal',
};

export function ItineraryResult() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-hero border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
                Your Paris Itinerary
              </h1>
              <p className="text-muted-foreground">3 days of unforgettable experiences</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
              <Button variant="hero" className="gap-2" onClick={() => setChatOpen(true)}>
                <MessageCircle className="w-4 h-4" />
                Modify with AI
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Itinerary List */}
          <div className="lg:col-span-2 space-y-6">
            {itineraryDays.map((day) => (
              <div key={day.day} className="glass-card p-6">
                <h2 className="font-heading text-xl font-bold mb-4">
                  Day {day.day}: {day.title}
                </h2>
                <div className="space-y-4">
                  {day.activities.map((activity, index) => {
                    const Icon = typeIcons[activity.type] || MapPin;
                    const colorClass = typeColors[activity.type] || 'bg-muted text-muted-foreground';
                    
                    return (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          {index < day.activities.length - 1 && (
                            <div className="w-0.5 h-12 bg-border mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <span>{activity.time}</span>
                            <span>•</span>
                            <Clock className="w-3 h-3" />
                            <span>{activity.duration}</span>
                          </div>
                          <h3 className="font-medium">{activity.title}</h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Map Placeholder */}
          <div className="lg:col-span-1">
            <div className="glass-card p-4 sticky top-24">
              <div className="aspect-square rounded-xl bg-muted flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Interactive Map</p>
                  <p className="text-sm">Google Maps integration</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-heading font-semibold mb-3">Trending Nearby</h3>
                <div className="space-y-2">
                  {['Hidden café in Le Marais', 'Secret garden in Montmartre', 'Local food market'].map((item, i) => (
                    <button key={i} className="w-full text-left p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-sm">
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-4 right-4 w-96 bg-card border border-border rounded-2xl shadow-lg overflow-hidden z-50 animate-scale-in">
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-primary text-primary-foreground">
            <span className="font-semibold">Modify Your Itinerary</span>
            <button onClick={() => setChatOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="h-64 p-4 overflow-y-auto">
            <div className="text-sm text-muted-foreground text-center">
              Ask me to change activities, swap restaurants, or add new experiences!
            </div>
          </div>
          <div className="p-4 border-t border-border">
            <div className="relative">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your request..."
                className="w-full h-10 pl-4 pr-12 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm"
              />
              <Button variant="gradient" size="icon" className="absolute right-1 top-1 w-8 h-8">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
