import travelBali from '@/assets/travel-bali.jpg';
import travelParis from '@/assets/travel-paris.jpg';
import travelTokyo from '@/assets/travel-tokyo.jpg';
import travelSantorini from '@/assets/travel-santorini.jpg';
import travelAlps from '@/assets/travel-alps.jpg';
import travelMaldives from '@/assets/travel-maldives.jpg';
import travelNewyork from '@/assets/travel-newyork.jpg';
import travelDubai from '@/assets/travel-dubai.jpg';

const imagesRow1 = [
  { src: travelParis, alt: 'Paris' },
  { src: travelTokyo, alt: 'Tokyo' },
  { src: travelBali, alt: 'Bali' },
  { src: travelSantorini, alt: 'Santorini' },
];

const imagesRow2 = [
  { src: travelAlps, alt: 'Swiss Alps' },
  { src: travelMaldives, alt: 'Maldives' },
  { src: travelNewyork, alt: 'New York' },
  { src: travelDubai, alt: 'Dubai' },
];

export function ImageCarousel() {
  return (
    <section className="py-16 overflow-hidden bg-background">
      {/* Row 1 - Left to Right */}
      <div className="relative mb-6">
        <div className="flex animate-scroll-left">
          {[...imagesRow1, ...imagesRow1].map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[400px] h-[250px] mx-3 rounded-2xl overflow-hidden shadow-card hover-lift"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Right to Left */}
      <div className="relative">
        <div className="flex animate-scroll-right">
          {[...imagesRow2, ...imagesRow2].map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[400px] h-[250px] mx-3 rounded-2xl overflow-hidden shadow-card hover-lift"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
