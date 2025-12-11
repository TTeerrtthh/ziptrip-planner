import { useState } from 'react';
import { ArrowLeft, ArrowRight, MapPin, TrendingUp, Calendar, Wallet, Users, Sparkles, Heart, Building, Map, Utensils, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useItineraryStore } from '@/hooks/useItinerary';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const steps = [
  { id: 'destination', title: 'Destination', icon: MapPin },
  { id: 'dates', title: 'Dates', icon: Calendar },
  { id: 'budget', title: 'Budget', icon: Wallet },
  { id: 'travelType', title: 'Travel Type', icon: Users },
  { id: 'style', title: 'Style', icon: Sparkles },
  { id: 'preferences', title: 'Preferences', icon: Heart },
  { id: 'hotels', title: 'Hotels', icon: Building },
  { id: 'places', title: 'Places', icon: Map },
  { id: 'food', title: 'Food', icon: Utensils },
  { id: 'generate', title: 'Generate', icon: Sparkles },
];

const trendingDestinations = [
  { code: 'FR', city: 'Paris', country: 'France', emoji: '🇫🇷' },
  { code: 'JP', city: 'Tokyo', country: 'Japan', emoji: '🇯🇵' },
  { code: 'ID', city: 'Bali', country: 'Indonesia', emoji: '🇮🇩' },
  { code: 'ES', city: 'Barcelona', country: 'Spain', emoji: '🇪🇸' },
  { code: 'US', city: 'New York', country: 'USA', emoji: '🇺🇸' },
  { code: 'GR', city: 'Santorini', country: 'Greece', emoji: '🇬🇷' },
  { code: 'AE', city: 'Dubai', country: 'UAE', emoji: '🇦🇪' },
  { code: 'IT', city: 'Rome', country: 'Italy', emoji: '🇮🇹' },
];

const budgetOptions = [
  { id: 'budget', label: 'Budget', description: 'Affordable stays & local eats', icon: '💰' },
  { id: 'moderate', label: 'Moderate', description: 'Balanced comfort & value', icon: '💎' },
  { id: 'luxury', label: 'Luxury', description: 'Premium experiences', icon: '👑' },
];

const travelTypes = [
  { id: 'solo', label: 'Solo', icon: '🎒' },
  { id: 'couple', label: 'Couple', icon: '💑' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
  { id: 'friends', label: 'Friends', icon: '👥' },
  { id: 'business', label: 'Business', icon: '💼' },
];

const styleOptions = [
  { id: 'relaxed', label: 'Relaxed', description: 'Leisure & relaxation' },
  { id: 'balanced', label: 'Balanced', description: 'Mix of activities' },
  { id: 'packed', label: 'Packed', description: 'Maximum experiences' },
];

const preferenceOptions = [
  { id: 'culture', label: 'Culture & History', icon: '🏛️' },
  { id: 'adventure', label: 'Adventure', icon: '🏔️' },
  { id: 'nature', label: 'Nature', icon: '🌿' },
  { id: 'nightlife', label: 'Nightlife', icon: '🎉' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'photography', label: 'Photography', icon: '📸' },
  { id: 'wellness', label: 'Wellness & Spa', icon: '🧘' },
  { id: 'local', label: 'Local Experiences', icon: '🏘️' },
];

const hotelOptions = [
  { id: 'hostel', label: 'Hostels', icon: '🛏️' },
  { id: 'boutique', label: 'Boutique Hotels', icon: '🏨' },
  { id: 'resort', label: 'Resorts', icon: '🏖️' },
  { id: 'airbnb', label: 'Vacation Rentals', icon: '🏠' },
  { id: 'luxury', label: 'Luxury Hotels', icon: '✨' },
];

const placesOptions = [
  { id: 'popular', label: 'Popular Spots', icon: '⭐' },
  { id: 'hidden', label: 'Hidden Gems', icon: '💎' },
  { id: 'museums', label: 'Museums', icon: '🏛️' },
  { id: 'outdoor', label: 'Outdoor Activities', icon: '🌲' },
  { id: 'beaches', label: 'Beaches', icon: '🏖️' },
  { id: 'markets', label: 'Local Markets', icon: '🛒' },
];

const foodOptions = [
  { id: 'local', label: 'Local Cuisine', icon: '🍜' },
  { id: 'street', label: 'Street Food', icon: '🌮' },
  { id: 'fine', label: 'Fine Dining', icon: '🍽️' },
  { id: 'cafes', label: 'Cafés & Bakeries', icon: '☕' },
  { id: 'vegetarian', label: 'Vegetarian', icon: '🥗' },
  { id: 'seafood', label: 'Seafood', icon: '🦐' },
];

export function ItineraryWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { wizardData, setWizardData, setItinerary, isGenerating, setIsGenerating, setError } = useItineraryStore();

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await generateItinerary();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateItinerary = async () => {
    if (!wizardData.destination || !wizardData.startDate || !wizardData.endDate) {
      toast.error('Please fill in destination and dates');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-itinerary', {
        body: {
          destination: wizardData.destination,
          startDate: wizardData.startDate,
          endDate: wizardData.endDate,
          budget: wizardData.budget || 'moderate',
          travelType: wizardData.travelType || 'solo',
          style: wizardData.style || 'balanced',
          preferences: wizardData.preferences.length ? wizardData.preferences : ['culture', 'food'],
          hotelPreference: wizardData.hotelPreference || 'boutique',
          foodPreference: wizardData.foodPreference || 'local',
        },
      });

      if (error) throw error;

      setItinerary(data);
      toast.success('Itinerary generated successfully!');
      navigate('/dashboard/itinerary/result');
    } catch (error) {
      console.error('Generation error:', error);
      setError('Failed to generate itinerary');
      toast.error('Failed to generate itinerary. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePreference = (pref: string, field: 'preferences' | 'placesPreference') => {
    const current = wizardData[field];
    const updated = current.includes(pref)
      ? current.filter(p => p !== pref)
      : [...current, pref];
    setWizardData({ [field]: updated });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Destination
        return (
          <div className="animate-fade-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Where would you like to go?
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Enter a city, country, or region you'd like to explore
            </p>

            <div className="relative mb-10">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              <input
                type="text"
                value={wizardData.destination}
                onChange={(e) => setWizardData({ destination: e.target.value })}
                placeholder="Type a destination..."
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg shadow-card"
              />
            </div>

            <div className="mb-10">
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Trending Destinations</span>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {trendingDestinations.map((dest) => (
                  <button
                    key={dest.city}
                    onClick={() => setWizardData({ destination: `${dest.city}, ${dest.country}` })}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                      wizardData.destination.includes(dest.city)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50 hover:bg-muted'
                    }`}
                  >
                    <span>{dest.emoji}</span>
                    <span className="font-medium">{dest.city}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 1: // Dates
        return (
          <div className="animate-fade-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              When are you traveling?
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Select your travel dates
            </p>
            <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <input
                  type="date"
                  value={wizardData.startDate}
                  onChange={(e) => setWizardData({ startDate: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl bg-card border border-border focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <input
                  type="date"
                  value={wizardData.endDate}
                  onChange={(e) => setWizardData({ endDate: e.target.value })}
                  min={wizardData.startDate}
                  className="w-full h-12 px-4 rounded-xl bg-card border border-border focus:border-primary outline-none"
                />
              </div>
            </div>
          </div>
        );

      case 2: // Budget
        return (
          <div className="animate-fade-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              What's your budget?
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Help us tailor recommendations to your budget
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {budgetOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setWizardData({ budget: option.id })}
                  className={`p-6 rounded-2xl border transition-all hover-lift text-center ${
                    wizardData.budget === option.id
                      ? 'border-primary bg-primary/10 shadow-glow'
                      : 'bg-card border-border hover:border-primary/50'
                  }`}
                >
                  <span className="text-3xl mb-3 block">{option.icon}</span>
                  <span className="font-semibold block mb-1">{option.label}</span>
                  <span className="text-sm text-muted-foreground">{option.description}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 3: // Travel Type
        return (
          <div className="animate-fade-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Who's traveling?
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Tell us about your travel group
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {travelTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setWizardData({ travelType: type.id })}
                  className={`flex flex-col items-center gap-2 p-6 rounded-2xl border transition-all min-w-[120px] ${
                    wizardData.travelType === type.id
                      ? 'border-primary bg-primary/10 shadow-glow'
                      : 'bg-card border-border hover:border-primary/50'
                  }`}
                >
                  <span className="text-3xl">{type.icon}</span>
                  <span className="font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 4: // Style
        return (
          <div className="animate-fade-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              What's your travel style?
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              How do you like to explore?
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {styleOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setWizardData({ style: option.id })}
                  className={`p-6 rounded-2xl border transition-all hover-lift ${
                    wizardData.style === option.id
                      ? 'border-primary bg-primary/10 shadow-glow'
                      : 'bg-card border-border hover:border-primary/50'
                  }`}
                >
                  <span className="font-semibold block mb-1">{option.label}</span>
                  <span className="text-sm text-muted-foreground">{option.description}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 5: // Preferences
        return (
          <div className="animate-fade-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              What interests you?
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Select all that apply
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {preferenceOptions.map((pref) => (
                <button
                  key={pref.id}
                  onClick={() => togglePreference(pref.id, 'preferences')}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all ${
                    wizardData.preferences.includes(pref.id)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 hover:bg-muted'
                  }`}
                >
                  <span>{pref.icon}</span>
                  <span className="font-medium">{pref.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 6: // Hotels
        return (
          <div className="animate-fade-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Where would you like to stay?
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Choose your accommodation style
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {hotelOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setWizardData({ hotelPreference: option.id })}
                  className={`flex flex-col items-center gap-2 p-5 rounded-2xl border transition-all min-w-[130px] ${
                    wizardData.hotelPreference === option.id
                      ? 'border-primary bg-primary/10 shadow-glow'
                      : 'bg-card border-border hover:border-primary/50'
                  }`}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="font-medium text-sm">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 7: // Places
        return (
          <div className="animate-fade-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              What places interest you?
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Select the types of places you'd like to visit
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {placesOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => togglePreference(option.id, 'placesPreference')}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all ${
                    wizardData.placesPreference.includes(option.id)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 hover:bg-muted'
                  }`}
                >
                  <span>{option.icon}</span>
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 8: // Food
        return (
          <div className="animate-fade-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              What's your food preference?
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Tell us about your culinary interests
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {foodOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setWizardData({ foodPreference: option.id })}
                  className={`flex flex-col items-center gap-2 p-5 rounded-2xl border transition-all min-w-[120px] ${
                    wizardData.foodPreference === option.id
                      ? 'border-primary bg-primary/10 shadow-glow'
                      : 'bg-card border-border hover:border-primary/50'
                  }`}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="font-medium text-sm">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 9: // Generate
        return (
          <div className="animate-fade-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Ready to generate your itinerary!
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Review your selections and generate your personalized trip
            </p>
            <div className="glass-card p-6 max-w-md mx-auto text-left space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Destination:</span>
                <span className="font-medium">{wizardData.destination || 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dates:</span>
                <span className="font-medium">
                  {wizardData.startDate && wizardData.endDate 
                    ? `${wizardData.startDate} to ${wizardData.endDate}`
                    : 'Not selected'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Budget:</span>
                <span className="font-medium capitalize">{wizardData.budget || 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Travel Type:</span>
                <span className="font-medium capitalize">{wizardData.travelType || 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Style:</span>
                <span className="font-medium capitalize">{wizardData.style || 'Not selected'}</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`relative flex items-center gap-2 px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    index === currentStep
                      ? 'text-primary'
                      : index < currentStep
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  <StepIcon className="w-4 h-4" />
                  <span className="hidden md:inline">{step.title}</span>
                  {index === currentStep && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 pb-32">
        <div className="max-w-2xl mx-auto text-center">
          {renderStepContent()}
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
                <Button variant="outline" onClick={handleBack} disabled={isGenerating}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <Button variant="hero" onClick={handleNext} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : currentStep === steps.length - 1 ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Itinerary
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
