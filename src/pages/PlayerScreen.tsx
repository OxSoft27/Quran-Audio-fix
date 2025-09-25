import { Play, Pause, SkipBack, SkipForward, ChevronDown, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ScrollingLyrics } from '@/components/ScrollingLyrics';
import { useAudio } from '@/contexts/AudioContext';
import { cn } from '@/lib/utils';

interface PlayerScreenProps {
  onClose: () => void;
}

export function PlayerScreen({ onClose }: PlayerScreenProps) {
  const { currentSurah, isPlaying, currentTime, duration, pauseSurah, resumeSurah, stopSurah } = useAudio();

  if (!currentSurah) return null;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;


  return (
    <div className="fixed inset-0 bg-gradient-to-br from-islamic-green via-islamic-green-light to-islamic-green z-50 text-white">
      {/* Header */}
      <div className="relative h-80 flex flex-col justify-center items-center px-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-6 left-4 text-white hover:bg-white/20"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
        
        <div className="text-center">
          <h3 className="text-sm font-medium opacity-80 mb-2">SURAH</h3>
          <h1 className="text-4xl font-bold text-islamic-gold mb-3">
            {currentSurah.nameEnglish.toUpperCase()}
          </h1>
          <h2 className="text-2xl font-arabic mb-2">{currentSurah.nameArabic}</h2>
          <p className="text-lg opacity-90">MISHARY RASHID ALAFASY</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">{currentSurah.nameEnglish} ({currentSurah.translation})</h3>
            <p className="text-white/80">Mishary Rashid Alafasy</p>
          </div>
          <div className="w-10 h-10 bg-islamic-green rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progress} className="h-1 bg-white/20 mb-2" />
          <div className="flex justify-between text-sm text-white/80">
            <span>{formatTime(currentTime)}</span>
            <span>-{formatTime(duration - currentTime)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-4">
          <Button variant="ghost" size="lg" className="text-white hover:bg-white/20">
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1 h-1 bg-current rounded-full"></div>
                <div className="w-1 h-1 bg-current rounded-full"></div>
                <div className="w-1 h-1 bg-current rounded-full"></div>
                <div className="w-1 h-1 bg-current rounded-full"></div>
              </div>
            </div>
          </Button>
          
          <Button variant="ghost" size="lg" className="text-white hover:bg-white/20">
            <SkipBack className="h-6 w-6" />
          </Button>
          
          <Button
            onClick={isPlaying ? pauseSurah : resumeSurah}
            className="w-16 h-16 rounded-full bg-white text-islamic-green hover:bg-white/90"
          >
            {isPlaying ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8" />
            )}
          </Button>
          
          <Button variant="ghost" size="lg" className="text-white hover:bg-white/20">
            <SkipForward className="h-6 w-6" />
          </Button>
          
          <Button variant="ghost" size="lg" className="text-white hover:bg-white/20">
            <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
              <div className="w-2 h-2 bg-current rounded-full"></div>
            </div>
          </Button>
        </div>

        {/* Bottom Icons */}
        <div className="flex justify-between items-center mt-8 px-4">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="text-xs font-bold">[3]</div>
            </div>
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Share className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Scrolling Arabic Lyrics */}
      <div className="px-6">
        <Card className="bg-white/10 border-white/20 text-white">
          <div className="p-4 border-b border-white/20">
            <h4 className="font-semibold text-center">Arabic Text - Real-time Scrolling</h4>
            <p className="text-sm text-white/70 text-center mt-1">
              Following along with the recitation
            </p>
          </div>
          
          <ScrollingLyrics className="text-white" />
        </Card>
      </div>

      {/* Bottom Info */}
      <div className="px-6 py-4 mt-4">
        <div className="flex items-center justify-between">
          <span className="text-white/80">Explore Mishary Alafasy</span>
          <div className="w-32 h-1 bg-white/20 rounded"></div>
        </div>
      </div>
    </div>
  );
}