import { Crown, Check, Zap, Globe, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  'Unlimited AI itinerary generations',
  'Priority customer support',
  'Exclusive hotel deals & discounts',
  'Advanced flight price alerts',
  'Collaborative trip planning',
  'Offline access to itineraries',
  'Premium destination guides',
  'Early access to new features',
];

export function ProPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-accent mb-4">
              <Crown className="w-8 h-8 text-foreground" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Upgrade to <span className="text-gradient-accent">ZipTrip Pro</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Unlock the full potential of AI-powered travel planning with premium features designed for serious travelers.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="glass-card p-8 md:p-12 text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Most Popular</span>
            </div>

            <div className="mb-8">
              <span className="text-5xl md:text-6xl font-bold">$9.99</span>
              <span className="text-muted-foreground text-lg"> /month</span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-left max-w-xl mx-auto mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button variant="hero" size="xl" className="gap-2">
              <Crown className="w-5 h-5" />
              Get Pro Access
            </Button>

            <p className="text-sm text-muted-foreground mt-4">
              Cancel anytime. No hidden fees.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { icon: Users, value: '50K+', label: 'Pro Members' },
              { icon: Globe, value: '200+', label: 'Countries Covered' },
              { icon: Sparkles, value: '1M+', label: 'Trips Planned' },
            ].map((stat, index) => (
              <div key={index} className="glass-card p-6">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gradient-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
