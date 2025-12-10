import { useState } from 'react';
import { Send, Sparkles, MapPin, Calendar, Utensils, Hotel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const suggestions = [
  { icon: MapPin, text: 'Plan a trip to Paris', color: 'text-primary' },
  { icon: Calendar, text: 'Create a 7-day itinerary', color: 'text-sky' },
  { icon: Utensils, text: 'Find best restaurants in Tokyo', color: 'text-amber' },
  { icon: Hotel, text: 'Book hotels in Bali', color: 'text-coral' },
];

export function AIAssistant() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      navigate('/dashboard/itinerary');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary mb-4">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Where would you like to go?
          </h1>
          <p className="text-muted-foreground text-lg">
            Let our AI help you plan your perfect trip
          </p>
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your dream destination..."
              className="w-full h-14 pl-5 pr-14 rounded-2xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg shadow-card"
            />
            <Button
              type="submit"
              variant="gradient"
              size="icon"
              className="absolute right-2 top-2 w-10 h-10"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>

        {/* Suggestions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => navigate('/dashboard/itinerary')}
              className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-card transition-all text-left group"
            >
              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors`}>
                <suggestion.icon className={`w-5 h-5 ${suggestion.color}`} />
              </div>
              <span className="font-medium">{suggestion.text}</span>
            </button>
          ))}
        </div>

        {/* Quick Start Button */}
        <div className="mt-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Button
            variant="hero"
            size="lg"
            onClick={() => navigate('/dashboard/itinerary')}
          >
            Start Planning Your Trip
          </Button>
        </div>
      </div>
    </div>
  );
}
