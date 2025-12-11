import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatRequest {
  message: string;
  itinerary: any;
  history: { role: string; content: string }[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, itinerary, history }: ChatRequest = await req.json();

    const systemPrompt = `You are ZipTrip AI, a friendly and knowledgeable travel assistant. You help users plan amazing trips around the world.

Your capabilities:
- Provide detailed travel advice and recommendations
- Suggest destinations based on user preferences
- Create itinerary suggestions with activities, restaurants, and attractions
- Answer questions about travel logistics, visas, best times to visit
- Recommend hotels, restaurants, and hidden gems
- Provide cultural tips and local customs
- Help with budget planning and cost estimates
- Suggest packing lists based on destination and season

${itinerary ? `
Current itinerary context:
Destination: ${itinerary.destination || 'Not specified'}
Days: ${itinerary.days?.length || 0}
Activities: ${JSON.stringify(itinerary.days?.map((d: any) => ({
  day: d.day,
  title: d.title,
  activities: d.activities?.map((a: any) => a.title)
})) || 'No itinerary loaded')}

When the user asks about modifying their itinerary, be specific about which day and activity to change.
` : ''}

Guidelines:
- Be enthusiastic and helpful about travel
- Provide specific, actionable recommendations
- Include practical tips like best times to visit, local customs, etc.
- If asked about a destination, mention 2-3 must-see attractions
- Keep responses conversational but informative
- Use emojis sparingly to add personality
- If you don't know something specific, say so and suggest alternatives`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-10),
      { role: 'user', content: message }
    ];

    console.log('Calling AI gateway with message:', message);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Usage limit reached. Please try again later.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    console.log('AI response received successfully');

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat assistant:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
