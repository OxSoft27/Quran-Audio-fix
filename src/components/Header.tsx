import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function Header({ searchTerm, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-islamic-green to-islamic-green-light shadow-[var(--shadow-header)] sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-white text-2xl font-bold text-center mb-6">
          Quran Audio
        </h1>
        
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search Surahs..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white/90 backdrop-blur-sm border-0 focus:bg-white transition-all duration-300"
          />
        </div>
      </div>
    </header>
  );
}