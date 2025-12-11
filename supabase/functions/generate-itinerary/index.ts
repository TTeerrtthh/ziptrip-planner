import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ItineraryRequest {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  travelType: string;
  style: string;
  preferences: string[];
  hotelPreference: string;
  foodPreference: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const request: ItineraryRequest = await req.json();
    const { destination, startDate, endDate, budget, travelType, style, preferences, hotelPreference, foodPreference } = request;

    const numDays = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const prompt = `You are an expert travel planner. Create a detailed ${numDays}-day itinerary for ${destination}.

Travel details:
- Dates: ${startDate} to ${endDate} (${numDays} days)
- Budget: ${budget}
- Travel type: ${travelType}
- Style: ${style}
- Preferences: ${preferences.join(', ')}
- Hotel preference: ${hotelPreference}
- Food preference: ${foodPreference}

Generate a JSON response with this exact structure:
{
  "destination": "${destination}",
  "summary": "Brief 2-3 sentence overview of the trip",
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "title": "Day theme title",
      "activities": [
        {
          "time": "09:00",
          "title": "Activity name",
          "description": "Brief description",
          "type": "travel|hotel|food|activity|explore|culture",
          "duration": "1h",
          "location": {
            "name": "Place name",
            "lat": 48.8566,
            "lng": 2.3522,
            "address": "Full address"
          },
          "distance": "2.5 km from previous",
          "travelMode": "walk|drive|transit"
        }
      ]
    }
  ],
  "places": {
    "hotels": [
      {
        "name": "Hotel name",
        "rating": 4.5,
        "reviews": 1250,
        "category": "Boutique Hotel",
        "priceRange": "$$",
        "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        "location": { "lat": 48.8566, "lng": 2.3522 }
      }
    ],
    "restaurants": [...],
    "attractions": [...],
    "experiences": [...]
  },
  "trending": [
    {
      "title": "Trending place name",
      "description": "Why it's trending",
      "category": "Hidden Gem"
    }
  ]
}

Important:
- Use REAL coordinates for ${destination}
- Include diverse activities matching preferences
- Add realistic travel times between locations
- Suggest actual restaurants and attractions
- Return ONLY valid JSON, no markdown`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are a travel planning AI. Always respond with valid JSON only.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 8000,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse JSON from response
    let itinerary;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      itinerary = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(content);
    } catch (e) {
      console.error('JSON parse error:', e);
      throw new Error('Failed to parse itinerary response');
    }

    return new Response(JSON.stringify(itinerary), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
