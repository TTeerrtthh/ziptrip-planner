import { Star, Plus, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Place } from '@/types/itinerary';

interface PlaceCardProps {
  place: Place;
  onAdd?: () => void;
  onViewOnMap?: () => void;
}

export function PlaceCard({ place, onAdd, onViewOnMap }: PlaceCardProps) {
  return (
    <div className="glass-card overflow-hidden hover-lift group">
      <div className="relative h-32 overflow-hidden">
        <img 
          src={place.image} 
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
          {place.priceRange}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-semibold text-sm line-clamp-1">{place.name}</h4>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-3 h-3 fill-amber text-amber" />
            <span className="text-xs font-medium">{place.rating}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-1">{place.category}</p>
        <p className="text-xs text-muted-foreground mb-3">
          ({place.reviews.toLocaleString()} reviews)
        </p>
        {place.distance && (
          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
            <MapPin className="w-3 h-3" />
            {place.distance}
          </p>
        )}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs h-8"
            onClick={onViewOnMap}
          >
            View on Map
          </Button>
          <Button 
            variant="hero" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={onAdd}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
