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

    const systemPrompt = `You are a helpful travel assistant for ZipTrip. The user has an itinerary for ${itinerary?.destination || 'their trip'}.

Current itinerary summary:
${JSON.stringify(itinerary?.days?.map((d: any) => ({
  day: d.day,
  title: d.title,
  activities: d.activities?.map((a: any) => a.title)
})) || 'No itinerary loaded')}

You can help users:
- Modify their itinerary (add/remove/swap activities)
- Answer questions about their destination
- Suggest alternatives and hidden gems
- Optimize their route
- Provide local tips and recommendations

When suggesting changes, be specific about which day and activity to modify.
Keep responses concise and helpful.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-10),
      { role: 'user', content: message }
    ];

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
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

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
