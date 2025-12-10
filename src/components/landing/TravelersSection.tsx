import { User, Heart, Users, Smile } from 'lucide-react';
import travelerSolo from '@/assets/traveler-solo.jpg';
import travelerCouple from '@/assets/traveler-couple.jpg';
import travelerFriends from '@/assets/traveler-friends.jpg';
import travelerFamily from '@/assets/traveler-family.jpg';

const travelerTypes = [
  {
    image: travelerSolo,
    icon: User,
    title: 'Solo Explorer',
    description: 'Freedom to discover at your own pace with safety-first recommendations.',
  },
  {
    image: travelerCouple,
    icon: Heart,
    title: 'Romantic Getaway',
    description: 'Curated experiences for couples seeking memorable moments together.',
  },
  {
    image: travelerFriends,
    icon: Users,
    title: 'Friends Adventure',
    description: 'Group-friendly activities and accommodations for unforgettable trips.',
  },
  {
    image: travelerFamily,
    icon: Smile,
    title: 'Family Fun',
    description: 'Kid-friendly venues and activities the whole family will love.',
  },
];

export function TravelersSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-accent text-foreground text-sm font-medium mb-6">
            Travel Your Way
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Tailored for{' '}
            <span className="text-gradient-warm">Every Traveler</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're a solo wanderer or traveling with the whole crew, we adapt to your unique style.
          </p>
        </div>

        {/* Traveler Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {travelerTypes.map((type, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden mb-4 hover-lift">
                <img
                  src={type.image}
                  alt={type.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center">
                  <type.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-1">{type.title}</h3>
              <p className="text-sm text-muted-foreground">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
