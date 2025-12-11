import { useState, useMemo } from 'react';
import { Download, MessageCircle, Hotel, MapPin, Utensils, Camera, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useItineraryStore } from '@/hooks/useItinerary';
import { ItineraryMap } from './ItineraryMap';
import { ActivityTimeline } from './ActivityTimeline';
import { PlaceCard } from './PlaceCard';
import { ChatWidget } from './ChatWidget';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

// Sample data for when no itinerary is generated
const sampleItinerary = {
  destination: 'Paris, France',
  summary: 'A magical 3-day journey through the City of Light, exploring iconic landmarks, charming neighborhoods, and exquisite cuisine.',
  days: [
    {
      day: 1,
      date: '2024-01-15',
      title: 'Arrival & City Exploration',
      activities: [
        { time: '09:00', title: 'Arrive at Paris CDG Airport', description: 'Welcome to Paris!', type: 'travel' as const, duration: '1h transfer', location: { name: 'Paris CDG', lat: 49.0097, lng: 2.5479, address: 'Charles de Gaulle Airport' }, distance: '', travelMode: 'transit' as const },
        { time: '11:00', title: 'Check-in at Hotel Le Marais', description: 'Boutique hotel in the heart of Paris', type: 'hotel' as const, duration: '30 min', location: { name: 'Le Marais', lat: 48.8566, lng: 2.3622, address: 'Le Marais, Paris' }, distance: '25 km from airport', travelMode: 'drive' as const },
        { time: '12:00', title: 'Lunch at Café de Flore', description: 'Iconic Parisian café experience', type: 'food' as const, duration: '1.5h', location: { name: 'Café de Flore', lat: 48.8541, lng: 2.3325, address: '172 Boulevard Saint-Germain' }, distance: '2 km', travelMode: 'walk' as const },
        { time: '14:00', title: 'Explore the Latin Quarter', description: 'Wander through historic streets', type: 'explore' as const, duration: '3h', location: { name: 'Latin Quarter', lat: 48.8502, lng: 2.3452, address: 'Quartier Latin, Paris' }, distance: '0.5 km', travelMode: 'walk' as const },
        { time: '18:00', title: 'Seine River Cruise', description: 'Sunset cruise along the Seine', type: 'activity' as const, duration: '2h', location: { name: 'Seine Cruise', lat: 48.8584, lng: 2.2945, address: 'Port de la Bourdonnais' }, distance: '3 km', travelMode: 'transit' as const },
        { time: '20:30', title: 'Dinner at Le Comptoir', description: 'French bistro cuisine', type: 'food' as const, duration: '2h', location: { name: 'Le Comptoir', lat: 48.8519, lng: 2.3386, address: 'Carrefour de l\'Odéon' }, distance: '2 km', travelMode: 'walk' as const },
      ],
    },
    {
      day: 2,
      date: '2024-01-16',
      title: 'Iconic Landmarks',
      activities: [
        { time: '08:00', title: 'Breakfast at hotel', type: 'food' as const, duration: '1h', location: { name: 'Hotel', lat: 48.8566, lng: 2.3622, address: 'Le Marais' }, distance: '' },
        { time: '09:30', title: 'Eiffel Tower Visit', description: 'Ascend the Iron Lady', type: 'activity' as const, duration: '3h', location: { name: 'Eiffel Tower', lat: 48.8584, lng: 2.2945, address: 'Champ de Mars' }, distance: '4 km', travelMode: 'transit' as const },
        { time: '13:00', title: 'Lunch at Champ de Mars', type: 'food' as const, duration: '1h', location: { name: 'Champ de Mars', lat: 48.8556, lng: 2.2986, address: 'Near Eiffel Tower' }, distance: '0.3 km', travelMode: 'walk' as const },
        { time: '14:30', title: 'Louvre Museum', description: 'World\'s largest art museum', type: 'culture' as const, duration: '4h', location: { name: 'Louvre', lat: 48.8606, lng: 2.3376, address: 'Rue de Rivoli' }, distance: '5 km', travelMode: 'transit' as const },
        { time: '19:00', title: 'Dinner in Montmartre', description: 'Bohemian neighborhood dining', type: 'food' as const, duration: '2h', location: { name: 'Montmartre', lat: 48.8867, lng: 2.3431, address: 'Place du Tertre' }, distance: '4 km', travelMode: 'transit' as const },
      ],
    },
    {
      day: 3,
      date: '2024-01-17',
      title: 'Art & Culture',
      activities: [
        { time: '09:00', title: 'Musée d\'Orsay', description: 'Impressionist masterpieces', type: 'culture' as const, duration: '3h', location: { name: 'Musée d\'Orsay', lat: 48.8600, lng: 2.3266, address: 'Rue de la Légion d\'Honneur' }, distance: '3 km', travelMode: 'transit' as const },
        { time: '12:30', title: 'Lunch at Saint-Germain', type: 'food' as const, duration: '1.5h', location: { name: 'Saint-Germain', lat: 48.8534, lng: 2.3344, address: 'Saint-Germain-des-Prés' }, distance: '1 km', travelMode: 'walk' as const },
        { time: '14:30', title: 'Notre-Dame Cathedral', description: 'Gothic masterpiece', type: 'activity' as const, duration: '2h', location: { name: 'Notre-Dame', lat: 48.8530, lng: 2.3499, address: 'Île de la Cité' }, distance: '1.5 km', travelMode: 'walk' as const },
        { time: '17:00', title: 'Shopping at Galeries Lafayette', type: 'explore' as const, duration: '2h', location: { name: 'Galeries Lafayette', lat: 48.8738, lng: 2.3319, address: '40 Boulevard Haussmann' }, distance: '3 km', travelMode: 'transit' as const },
        { time: '20:00', title: 'Farewell Dinner', description: 'Celebrate your Paris adventure', type: 'food' as const, duration: '2h', location: { name: 'Restaurant', lat: 48.8566, lng: 2.3515, address: 'Near hotel' }, distance: '2 km', travelMode: 'walk' as const },
      ],
    },
  ],
  places: {
    hotels: [
      { name: 'Hotel Le Marais', rating: 4.7, reviews: 1250, category: 'Boutique Hotel', priceRange: '$$', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', location: { lat: 48.8566, lng: 2.3622 } },
      { name: 'Hôtel Plaza Athénée', rating: 4.9, reviews: 890, category: 'Luxury Hotel', priceRange: '$$$$', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400', location: { lat: 48.8661, lng: 2.3034 } },
    ],
    restaurants: [
      { name: 'Café de Flore', rating: 4.5, reviews: 3200, category: 'French Café', priceRange: '$$', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400', location: { lat: 48.8541, lng: 2.3325 } },
      { name: 'Le Comptoir du Panthéon', rating: 4.6, reviews: 1800, category: 'French Bistro', priceRange: '$$', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400', location: { lat: 48.8462, lng: 2.3460 } },
    ],
    attractions: [
      { name: 'Eiffel Tower', rating: 4.8, reviews: 125000, category: 'Landmark', priceRange: '$', image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=400', location: { lat: 48.8584, lng: 2.2945 } },
      { name: 'Louvre Museum', rating: 4.9, reviews: 98000, category: 'Museum', priceRange: '$$', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400', location: { lat: 48.8606, lng: 2.3376 } },
    ],
    experiences: [
      { name: 'Seine River Cruise', rating: 4.7, reviews: 15000, category: 'Tour', priceRange: '$$', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400', location: { lat: 48.8584, lng: 2.2945 } },
      { name: 'Cooking Class', rating: 4.8, reviews: 450, category: 'Experience', priceRange: '$$$', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400', location: { lat: 48.8566, lng: 2.3522 } },
    ],
  },
  trending: [
    { title: 'Hidden café in Le Marais', description: 'Secret spot loved by locals', category: 'Hidden Gem' },
    { title: 'Sunset at Sacré-Cœur', description: 'Best views of the city', category: 'Popular' },
    { title: 'Street art in Belleville', description: 'Up-and-coming art scene', category: 'Trending' },
  ],
};

export function ItineraryResult() {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const { itinerary: storedItinerary } = useItineraryStore();

  const itinerary = storedItinerary || sampleItinerary;

  const placeCategories = [
    { id: 'hotels', label: 'Hotels', icon: Hotel, data: itinerary.places?.hotels || [] },
    { id: 'restaurants', label: 'Restaurants', icon: Utensils, data: itinerary.places?.restaurants || [] },
    { id: 'attractions', label: 'Attractions', icon: Camera, data: itinerary.places?.attractions || [] },
    { id: 'experiences', label: 'Experiences', icon: MapPin, data: itinerary.places?.experiences || [] },
  ];

  const handleDownloadPDF = () => {
    toast.info('PDF export coming soon!');
  };

  const handleAddToItinerary = (place: any) => {
    toast.success(`Added ${place.name} to your itinerary`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-hero border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Link to="/dashboard/itinerary" className="text-sm text-muted-foreground hover:text-foreground mb-2 inline-block">
                ← Back to Wizard
              </Link>
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
                Your {itinerary.destination} Itinerary
              </h1>
              <p className="text-muted-foreground">{itinerary.summary}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2" onClick={handleDownloadPDF}>
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
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Itinerary Timeline */}
          <div className="lg:col-span-3 space-y-6">
            {/* Day selector */}
            <div className="flex items-center gap-2 mb-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSelectedDay(Math.max(0, selectedDay - 1))}
                disabled={selectedDay === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex gap-2 overflow-x-auto flex-1">
                {itinerary.days?.map((day, index) => (
                  <button
                    key={day.day}
                    onClick={() => setSelectedDay(index)}
                    className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                      selectedDay === index
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    Day {day.day}
                  </button>
                ))}
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSelectedDay(Math.min(itinerary.days.length - 1, selectedDay + 1))}
                disabled={selectedDay === itinerary.days.length - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Current day */}
            {itinerary.days?.[selectedDay] && (
              <div className="glass-card p-6">
                <h2 className="font-heading text-xl font-bold mb-6">
                  Day {itinerary.days[selectedDay].day}: {itinerary.days[selectedDay].title}
                </h2>
                <ActivityTimeline 
                  activities={itinerary.days[selectedDay].activities}
                  onViewOnMap={(index) => {
                    // Scroll to map or focus on marker
                  }}
                />
              </div>
            )}

            {/* Places Section */}
            <div className="glass-card p-6">
              <h3 className="font-heading text-lg font-semibold mb-4">Recommended Places</h3>
              <Tabs defaultValue="hotels" className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  {placeCategories.map((cat) => (
                    <TabsTrigger key={cat.id} value={cat.id} className="flex items-center gap-1 text-xs">
                      <cat.icon className="w-3 h-3" />
                      <span className="hidden sm:inline">{cat.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                {placeCategories.map((cat) => (
                  <TabsContent key={cat.id} value={cat.id}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {cat.data.map((place, i) => (
                        <PlaceCard 
                          key={i} 
                          place={place}
                          onAdd={() => handleAddToItinerary(place)}
                        />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>

          {/* Map & Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-4 sticky top-24">
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <ItineraryMap 
                  days={itinerary.days || []} 
                  selectedDay={selectedDay}
                />
              </div>

              {/* Trending */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <h3 className="font-heading font-semibold">Trending Nearby</h3>
                </div>
                <div className="space-y-2">
                  {(itinerary.trending || sampleItinerary.trending).map((item, i) => (
                    <button key={i} className="w-full text-left p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.title}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{item.category}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget 
        isOpen={chatOpen} 
        onClose={() => setChatOpen(false)} 
        itinerary={itinerary}
      />
    </div>
  );
}
