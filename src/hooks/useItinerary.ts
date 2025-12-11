import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Itinerary, WizardData } from '@/types/itinerary';

interface ItineraryStore {
  wizardData: WizardData;
  itinerary: Itinerary | null;
  isGenerating: boolean;
  error: string | null;
  
  setWizardData: (data: Partial<WizardData>) => void;
  setItinerary: (itinerary: Itinerary) => void;
  setIsGenerating: (value: boolean) => void;
  setError: (error: string | null) => void;
  resetWizard: () => void;
}

const defaultWizardData: WizardData = {
  destination: '',
  startDate: '',
  endDate: '',
  budget: '',
  travelType: '',
  style: '',
  preferences: [],
  hotelPreference: '',
  placesPreference: [],
  foodPreference: '',
};

export const useItineraryStore = create<ItineraryStore>()(
  persist(
    (set) => ({
      wizardData: defaultWizardData,
      itinerary: null,
      isGenerating: false,
      error: null,

      setWizardData: (data) =>
        set((state) => ({
          wizardData: { ...state.wizardData, ...data },
        })),

      setItinerary: (itinerary) => set({ itinerary }),
      setIsGenerating: (isGenerating) => set({ isGenerating }),
      setError: (error) => set({ error }),
      
      resetWizard: () =>
        set({
          wizardData: defaultWizardData,
          itinerary: null,
          error: null,
        }),
    }),
    {
      name: 'ziptrip-itinerary',
    }
  )
);
