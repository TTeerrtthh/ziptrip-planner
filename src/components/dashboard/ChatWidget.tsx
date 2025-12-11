import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { ChatMessage, Itinerary } from '@/types/itinerary';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  itinerary: Itinerary | null;
}

export function ChatWidget({ isOpen, onClose, itinerary }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: {
          message: input,
          itinerary,
          history: messages,
        },
      });

      if (error) throw error;

      const assistantMessage: ChatMessage = { role: 'assistant', content: data.reply };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-lg overflow-hidden z-50 animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">AI Travel Assistant</span>
        </div>
        <button onClick={onClose} className="hover:opacity-80 transition-opacity">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              Ask me to modify your itinerary, suggest alternatives, or answer travel questions!
            </p>
            <div className="mt-4 space-y-2">
              {[
                'Add a local restaurant on Day 2',
                'Swap the museum visit for something outdoors',
                'What are hidden gems near my hotel?',
              ].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => setInput(suggestion)}
                  className="block w-full text-left text-xs p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  "{suggestion}"
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-sm'
                  : 'bg-muted rounded-bl-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted p-3 rounded-2xl rounded-bl-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <form 
          onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
          className="relative"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your request..."
            disabled={isLoading}
            className="w-full h-10 pl-4 pr-12 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm disabled:opacity-50"
          />
          <Button 
            type="submit"
            variant="gradient" 
            size="icon" 
            className="absolute right-1 top-1 w-8 h-8"
            disabled={isLoading || !input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
