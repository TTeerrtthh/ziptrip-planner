import { Hotel, MapPin, Utensils, Calendar, Sparkles, Shield } from 'lucide-react';

const features = [
  {
    icon: Hotel,
    title: 'Smart Hotel Selection',
    description: 'AI-curated hotels matching your style, budget, and location preferences.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: MapPin,
    title: 'Hidden Gems & Hotspots',
    description: 'Discover both iconic attractions and local secrets off the beaten path.',
    color: 'text-teal',
    bgColor: 'bg-teal/10',
  },
  {
    icon: Utensils,
    title: 'Culinary Guide',
    description: 'From street food to fine dining, find eateries that match your taste.',
    color: 'text-amber',
    bgColor: 'bg-amber/10',
  },
  {
    icon: Calendar,
    title: 'Intelligent Itinerary',
    description: 'Hour-by-hour schedules optimized for distance, timing, and your energy.',
    color: 'text-sky',
    bgColor: 'bg-sky/10',
  },
  {
    icon: Sparkles,
    title: 'Personalized Experience',
    description: 'Every recommendation tailored to your travel style and preferences.',
    color: 'text-coral',
    bgColor: 'bg-coral/10',
  },
  {
    icon: Shield,
    title: 'Safety & Accessibility',
    description: 'Considerations for dietary needs, mobility, and safety concerns.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Your Perfect Trip in{' '}
            <span className="text-gradient-primary">4 Simple Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI analyzes thousands of data points to create a travel experience that's uniquely yours.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-6 hover-lift group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
