import { Home, Star, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'favorites', label: 'Favorites', icon: Star },
    { id: 'foryou', label: 'For You', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-200",
              activeTab === id
                ? "text-islamic-green"
                : "text-muted-foreground hover:text-islamic-green"
            )}
          >
            <Icon className={cn(
              "h-6 w-6 transition-all duration-200",
              activeTab === id && "scale-110"
            )} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}