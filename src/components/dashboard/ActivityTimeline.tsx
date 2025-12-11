import { MapPin, Clock, Utensils, Camera, Compass, Building, Plane, Car, PersonStanding, Train } from 'lucide-react';
import { Activity } from '@/types/itinerary';
import { Button } from '@/components/ui/button';

interface ActivityTimelineProps {
  activities: Activity[];
  onViewOnMap?: (index: number) => void;
}

const typeIcons: Record<string, typeof MapPin> = {
  travel: Plane,
  hotel: Building,
  food: Utensils,
  activity: Camera,
  explore: Compass,
  culture: Camera,
};

const typeColors: Record<string, string> = {
  travel: 'bg-sky/10 text-sky border-sky/20',
  hotel: 'bg-primary/10 text-primary border-primary/20',
  food: 'bg-amber/10 text-amber border-amber/20',
  activity: 'bg-coral/10 text-coral border-coral/20',
  explore: 'bg-teal/10 text-teal border-teal/20',
  culture: 'bg-primary/10 text-primary border-primary/20',
};

const travelModeIcons: Record<string, typeof Car> = {
  walk: PersonStanding,
  drive: Car,
  transit: Train,
  flight: Plane,
};

export function ActivityTimeline({ activities, onViewOnMap }: ActivityTimelineProps) {
  return (
    <div className="space-y-0">
      {activities.map((activity, index) => {
        const Icon = typeIcons[activity.type] || MapPin;
        const colorClass = typeColors[activity.type] || 'bg-muted text-muted-foreground border-border';
        const TravelIcon = activity.travelMode ? travelModeIcons[activity.travelMode] : null;

        return (
          <div key={index} className="relative">
            {/* Activity card */}
            <div className="flex gap-4 items-start group">
              {/* Timeline indicator */}
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colorClass} transition-all group-hover:scale-110`}>
                  <Icon className="w-5 h-5" />
                </div>
                {index < activities.length - 1 && (
                  <div className="w-0.5 h-full min-h-[60px] bg-border mt-2 relative">
                    {/* Travel mode indicator */}
                    {activity.distance && TravelIcon && (
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-1 rounded-full border border-border">
                        <TravelIcon className="w-3 h-3 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-6 min-w-0">
                <div className="glass-card p-4 hover:border-primary/30 transition-all">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{activity.time}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.duration}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs shrink-0"
                      onClick={() => onViewOnMap?.(index)}
                    >
                      <MapPin className="w-3 h-3 mr-1" />
                      Map
                    </Button>
                  </div>
                  
                  <h4 className="font-semibold mb-1">{activity.title}</h4>
                  
                  {activity.description && (
                    <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                  )}

                  {activity.location?.address && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {activity.location.address}
                    </p>
                  )}

                  {/* Distance to next */}
                  {activity.distance && index < activities.length - 1 && (
                    <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
                      {TravelIcon && <TravelIcon className="w-3 h-3" />}
                      <span>{activity.distance}</span>
                      {activity.travelMode && (
                        <span className="capitalize">• {activity.travelMode}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
