import { useState } from 'react';
import { ArrowLeft, ArrowRight, MapPin, TrendingUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

const steps = [
  'Destination',
  'Dates',
  'Budget',
  'Travel Type',
  'Style',
  'Preferences',
  'Hotels',
  'Places',
  'Food',
  'Itinerary',
];

const trendingDestinations = [
  { code: 'FR', city: 'Paris', country: 'France' },
  { code: 'JP', city: 'Tokyo', country: 'Japan' },
  { code: 'ID', city: 'Bali', country: 'Indonesia' },
  { code: 'ES', city: 'Barcelona', country: 'Spain' },
  { code: 'US', city: 'New York', country: 'USA' },
  { code: 'GR', city: 'Santorini', country: 'Greece' },
];

export function ItineraryWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/dashboard/itinerary/result');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const selectDestination = (city: string) => {
    setDestination(city);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
        </div>
      </div>

      {/* Step Tabs */}
      <div className="border-b border-border overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex gap-0">
            {steps.map((step, index) => (
              <button
                key={step}
                onClick={() => setCurrentStep(index)}
                className={`relative px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  index === currentStep
                    ? 'text-primary'
                    : index < currentStep
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {step}
                {index === currentStep && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {currentStep === 0 && (
            <div className="animate-fade-up">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                Where would you like to go?
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Enter a city, country, or region you'd like to explore
              </p>

              {/* Search Input */}
              <div className="relative mb-10">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Type a destination..."
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg shadow-card"
                />
              </div>

              {/* Trending Destinations */}
              <div className="mb-10">
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Trending Destinations</span>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {trendingDestinations.map((dest) => (
                    <button
                      key={dest.city}
                      onClick={() => selectDestination(dest.city)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                        destination === dest.city
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50 hover:bg-muted'
                      }`}
                    >
                      <span className="text-xs font-medium text-muted-foreground uppercase">{dest.code}</span>
                      <span className="font-medium">{dest.city}</span>
                      <span className="text-muted-foreground">{dest.country}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="animate-fade-up">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                When are you traveling?
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Select your travel dates
              </p>
              <div className="bg-card rounded-2xl border border-border p-8 shadow-card">
                <p className="text-muted-foreground">Date picker would go here</p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="animate-fade-up">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                What's your budget?
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Help us tailor recommendations to your budget
              </p>
              <div className="grid grid-cols-3 gap-4">
                {['Budget', 'Moderate', 'Luxury'].map((budget) => (
                  <button
                    key={budget}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all shadow-card"
                  >
                    <span className="font-semibold">{budget}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep > 2 && (
            <div className="animate-fade-up">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                {steps[currentStep]}
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Customize your {steps[currentStep].toLowerCase()} preferences
              </p>
              <div className="bg-card rounded-2xl border border-border p-8 shadow-card">
                <p className="text-muted-foreground">Step content for {steps[currentStep]}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <span className="text-sm text-muted-foreground">
              Skip optional fields by clicking Continue
            </span>
            <div className="flex gap-3">
              {currentStep > 0 && (
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <Button variant="hero" onClick={handleNext}>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
