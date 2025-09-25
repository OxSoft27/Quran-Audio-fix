import { Play, Pause, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Surah } from '@/data/surahs';
import { useAudio } from '@/contexts/AudioContext';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';

interface SurahCardProps {
  surah: Surah;
  onPlay?: () => void;
}

export function SurahCard({ surah, onPlay }: SurahCardProps) {
  const { currentSurah, isPlaying, playSurah, pauseSurah, resumeSurah } = useAudio();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const isCurrentSurah = currentSurah?.number === surah.number;
  const isCurrentlyPlaying = isCurrentSurah && isPlaying;

  const handlePlayClick = () => {
    if (isCurrentSurah) {
      if (isPlaying) {
        pauseSurah();
      } else {
        resumeSurah();
      }
    } else {
      playSurah(surah);
    }
    onPlay?.();
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(surah);
  };

  return (
    <Card className={cn(
      "p-4 cursor-pointer transition-all duration-300 hover:shadow-lg",
      "border border-border/50 hover:border-islamic-green/30",
      "bg-gradient-to-br from-card to-card/80 h-full",
      isCurrentSurah && "border-islamic-green bg-islamic-green/5 shadow-card"
    )}>
      <div className="flex flex-col h-full">
        {/* Header with number and favorite */}
        <div className="flex items-center justify-between mb-3">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
            isCurrentSurah 
              ? "bg-islamic-green text-primary-foreground" 
              : "bg-muted text-muted-foreground"
          )}>
            {surah.number}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteClick}
            className={cn(
              "h-6 w-6 p-0 transition-colors",
              isFavorite(surah) 
                ? "text-islamic-gold hover:text-islamic-gold/80" 
                : "text-muted-foreground hover:text-islamic-gold"
            )}
          >
            <Star className={cn("h-3 w-3", isFavorite(surah) && "fill-current")} />
          </Button>
        </div>
        
        {/* Surah Info */}
        <div className="flex-1 mb-4">
          <h3 className={cn(
            "font-semibold text-sm mb-1 transition-colors leading-tight",
            isCurrentSurah ? "text-islamic-green" : "text-foreground"
          )}>
            {surah.nameEnglish}
          </h3>
          <p className="text-xs text-muted-foreground mb-2">
            {surah.translation}
          </p>
          <p className="text-base font-arabic text-foreground/80 mb-2 leading-relaxed" dir="rtl">
            {surah.nameArabic}
          </p>
          <p className="text-xs text-muted-foreground">
            {surah.verses} verses
          </p>
        </div>
        
        {/* Play Button */}
        <Button
          onClick={handlePlayClick}
          variant="outline"
          className={cn(
            "w-full h-9 text-xs font-medium transition-all duration-200 rounded-full border-2",
            isCurrentlyPlaying
              ? "bg-islamic-green hover:bg-islamic-green/90 text-primary-foreground border-islamic-green"
              : "border-border hover:border-islamic-green hover:bg-islamic-green hover:text-primary-foreground"
          )}
        >
          {isCurrentlyPlaying && isPlaying ? (
            <>
              <Pause className="h-3 w-3 mr-1" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-3 w-3 mr-1" />
              Tap to Play
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}