import { Play, Pause, Square, Volume2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAudio } from '@/contexts/AudioContext';
import { cn } from '@/lib/utils';

export function AudioPlayer() {
  const { currentSurah, isPlaying, currentTime, duration, pauseSurah, resumeSurah, stopSurah } = useAudio();

  if (!currentSurah) return null;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Card className="fixed bottom-20 left-4 right-4 bg-gradient-to-r from-islamic-green to-islamic-green-light text-white shadow-lg z-40 mx-auto max-w-md">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm truncate">
              {currentSurah.nameEnglish}
            </h4>
            <p className="text-white/80 text-xs truncate">
              {currentSurah.translation}
            </p>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={isPlaying ? pauseSurah : resumeSurah}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={stopSurah}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <Square className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Progress value={progress} className="h-1 bg-white/20" />
          <div className="flex justify-between text-xs text-white/80">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}