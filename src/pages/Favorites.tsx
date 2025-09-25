import { useFavorites } from '@/hooks/useFavorites';
import { surahs } from '@/data/surahs';
import { SurahCard } from '@/components/SurahCard';
import { Heart } from 'lucide-react';

export function Favorites() {
  const { favorites } = useFavorites();
  
  const favoriteSurahs = surahs.filter(surah => favorites.includes(surah.number));

  if (favoriteSurahs.length === 0) {
    return (
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold text-center text-foreground mb-6">
          Favorites
        </h2>
        
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No Favorites Yet
          </h3>
          <p className="text-muted-foreground">
            Tap the star icon on any surah to add it to your favorites
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold text-center text-foreground mb-6">
        Favorites ({favoriteSurahs.length})
      </h2>
      
      {favoriteSurahs.map((surah) => (
        <SurahCard key={surah.number} surah={surah} />
      ))}
    </div>
  );
}