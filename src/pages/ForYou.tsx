import { surahs } from '@/data/surahs';
import { SurahCard } from '@/components/SurahCard';
import { useFavorites } from '@/hooks/useFavorites';
import { Sparkles, Clock, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function ForYou() {
  const { favorites } = useFavorites();

  // Popular short surahs for beginners
  const popularSurahs = surahs.filter(surah => 
    [1, 112, 113, 114, 103, 108, 97, 94, 93].includes(surah.number)
  );

  // Recently favorited (last 3)
  const recentlyFavorited = surahs.filter(surah => 
    favorites.includes(surah.number)
  ).slice(-3);

  // Recommended based on verse length
  const mediumLengthSurahs = surahs.filter(surah => 
    surah.verses >= 20 && surah.verses <= 50
  ).slice(0, 3);

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center text-foreground mb-6">
        For You
      </h2>

      {/* Recently Favorited */}
      {recentlyFavorited.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-islamic-green" />
            <h3 className="text-lg font-semibold text-foreground">
              Recently Favorited
            </h3>
          </div>
          <div className="space-y-3">
            {recentlyFavorited.map((surah) => (
              <SurahCard key={`recent-${surah.number}`} surah={surah} />
            ))}
          </div>
        </section>
      )}

      {/* Popular Short Surahs */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-islamic-green" />
          <h3 className="text-lg font-semibold text-foreground">
            Popular Short Surahs
          </h3>
        </div>
        <div className="space-y-3">
          {popularSurahs.slice(0, 5).map((surah) => (
            <SurahCard key={`popular-${surah.number}`} surah={surah} />
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-islamic-green" />
          <h3 className="text-lg font-semibold text-foreground">
            Recommended for You
          </h3>
        </div>
        <div className="space-y-3">
          {mediumLengthSurahs.map((surah) => (
            <SurahCard key={`recommended-${surah.number}`} surah={surah} />
          ))}
        </div>
      </section>

      {/* Daily Tip */}
      <Card className="p-4 bg-gradient-to-br from-islamic-green/10 to-islamic-green-light/10 border-islamic-green/20">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-islamic-green to-islamic-green-light rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Daily Tip</h4>
            <p className="text-sm text-muted-foreground">
              Try listening to Surah Al-Mulk (67) before sleep. It's known to provide protection throughout the night.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}