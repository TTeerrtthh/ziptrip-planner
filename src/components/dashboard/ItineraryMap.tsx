import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Activity, ItineraryDay } from '@/types/itinerary';

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface ItineraryMapProps {
  days: ItineraryDay[];
  selectedDay?: number;
  onActivityClick?: (dayIndex: number, activityIndex: number) => void;
  className?: string;
}

const typeColors: Record<string, string> = {
  travel: '#3b82f6',
  hotel: '#8b5cf6',
  food: '#f59e0b',
  activity: '#ef4444',
  explore: '#10b981',
  culture: '#ec4899',
};

const createCustomIcon = (type: string, number: number) => {
  const color = typeColors[type] || '#6b7280';
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <span style="
          transform: rotate(45deg);
          color: white;
          font-weight: 700;
          font-size: 12px;
        ">${number}</span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

export function ItineraryMap({ days, selectedDay, onActivityClick, className = '' }: ItineraryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const polylinesRef = useRef<L.Polyline[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    mapInstanceRef.current = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
    }).setView([48.8566, 2.3522], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !days.length) return;

    // Clear existing markers and polylines
    markersRef.current.forEach(marker => marker.remove());
    polylinesRef.current.forEach(polyline => polyline.remove());
    markersRef.current = [];
    polylinesRef.current = [];

    const bounds = L.latLngBounds([]);
    const dayActivities = selectedDay !== undefined ? [days[selectedDay]] : days;
    let markerNumber = 1;

    dayActivities.forEach((day, dayIndex) => {
      const routeCoords: L.LatLngExpression[] = [];
      const actualDayIndex = selectedDay !== undefined ? selectedDay : dayIndex;

      day.activities.forEach((activity, actIndex) => {
        if (!activity.location?.lat || !activity.location?.lng) return;

        const latLng: L.LatLngExpression = [activity.location.lat, activity.location.lng];
        bounds.extend(latLng);
        routeCoords.push(latLng);

        const marker = L.marker(latLng, {
          icon: createCustomIcon(activity.type, markerNumber),
        }).addTo(mapInstanceRef.current!);

        marker.bindPopup(`
          <div style="min-width: 200px;">
            <h4 style="font-weight: 600; margin: 0 0 4px 0;">${activity.title}</h4>
            <p style="color: #666; font-size: 12px; margin: 0 0 4px 0;">${activity.time} • ${activity.duration}</p>
            ${activity.description ? `<p style="font-size: 13px; margin: 0;">${activity.description}</p>` : ''}
          </div>
        `);

        marker.on('click', () => {
          onActivityClick?.(actualDayIndex, actIndex);
        });

        markersRef.current.push(marker);
        markerNumber++;
      });

      // Draw route line
      if (routeCoords.length > 1) {
        const colors = ['#14b8a6', '#f59e0b', '#ec4899'];
        const polyline = L.polyline(routeCoords, {
          color: colors[actualDayIndex % colors.length],
          weight: 4,
          opacity: 0.7,
          dashArray: '10, 10',
        }).addTo(mapInstanceRef.current!);
        polylinesRef.current.push(polyline);
      }
    });

    if (bounds.isValid()) {
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [days, selectedDay, onActivityClick]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-full min-h-[300px] rounded-xl ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
