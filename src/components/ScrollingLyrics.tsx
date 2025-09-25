import { useEffect, useState, useRef } from 'react';
import { useAudio } from '@/contexts/AudioContext';
import { getSurahText, QuranVerse } from '@/data/quranText';
import { cn } from '@/lib/utils';

interface ScrollingLyricsProps {
  className?: string;
}

export function ScrollingLyrics({ className }: ScrollingLyricsProps) {
  const { currentSurah, isPlaying, currentTime, duration } = useAudio();
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [verses, setVerses] = useState<QuranVerse[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (currentSurah) {
      const surahVerses = getSurahText(currentSurah.number);
      setVerses(surahVerses);
      setCurrentVerseIndex(0);
    }
  }, [currentSurah]);

  // Calculate which verse should be highlighted based on audio progress
  useEffect(() => {
    if (verses.length > 0 && duration > 0 && isPlaying) {
      // Simple timing calculation: divide duration by number of verses
      const timePerVerse = duration / verses.length;
      const calculatedIndex = Math.floor(currentTime / timePerVerse);
      const newIndex = Math.min(calculatedIndex, verses.length - 1);
      
      if (newIndex !== currentVerseIndex) {
        setCurrentVerseIndex(newIndex);
        
        // Auto-scroll to current verse
        if (scrollContainerRef.current) {
          const verseElement = scrollContainerRef.current.children[newIndex] as HTMLElement;
          if (verseElement) {
            verseElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }
        }
      }
    }
  }, [currentTime, duration, verses.length, isPlaying, currentVerseIndex]);

  if (!currentSurah || verses.length === 0) {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        <p className="text-muted-foreground text-center">
          No text available for this surah
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={scrollContainerRef}
      className={cn(
        "max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent",
        "space-y-6 p-4",
        className
      )}
      dir="rtl"
    >
      {verses.map((verse, index) => (
        <div
          key={verse.number}
          className={cn(
            "transition-all duration-500 ease-in-out p-4 rounded-lg",
            "text-center leading-loose",
            index === currentVerseIndex && isPlaying
              ? "bg-white/20 text-black font-semibold scale-105 shadow-lg border border-white/30"
              : index < currentVerseIndex && isPlaying
              ? "text-white/60 scale-95"
              : "text-black hover:text-slate-800"
          )}
        >
          <p className="font-arabic text-lg md:text-xl leading-relaxed">
            {verse.arabic}
          </p>
          {verse.transliteration && (
            <p className="text-sm text-black/70 mt-2 font-normal" dir="ltr">
              {verse.transliteration}
            </p>
          )}
        </div>
      ))}
      
      {/* Spacer for better scrolling */}
      <div className="h-32"></div>
    </div>
  );
}