import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Globe, Map, Plane, Hotel, Crown, MapPin, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const navItems = [
  { path: '/dashboard', label: 'AI Assistant', icon: Globe },
  { path: '/dashboard/itinerary', label: 'Smart Itinerary', icon: Map },
  { path: '/dashboard/flights', label: 'Flights', icon: Plane },
  { path: '/dashboard/hotels', label: 'Hotels', icon: Hotel },
  { path: '/dashboard/pro', label: 'Pro', icon: Crown },
];

export function DashboardHeader() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary-foreground" />
              <Zap className="w-2.5 h-2.5 text-amber absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className="font-heading text-lg font-bold">ZipTrip</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-muted/50 rounded-full p-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              const Icon = item.icon;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? 'nav-active' : 'nav'}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-muted hover:bg-muted/80 transition-all duration-300"
            aria-label="Toggle theme"
          >
            <div className="relative w-5 h-5">
              <Sun
                className={`absolute inset-0 w-5 h-5 text-amber transition-all duration-300 ${
                  theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <Moon
                className={`absolute inset-0 w-5 h-5 text-sky transition-all duration-300 ${
                  theme === 'light' ? 'opacity-0 -rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-1 mt-3 overflow-x-auto pb-2 -mx-4 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            
            return (
              <Link key={item.path} to={item.path} className="flex-shrink-0">
                <Button
                  variant={isActive ? 'nav-active' : 'nav'}
                  size="sm"
                  className="gap-1.5"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
