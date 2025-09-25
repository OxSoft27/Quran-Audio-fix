import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';
import { Surah } from '@/data/surahs';

interface AudioState {
  currentSurah: Surah | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

interface AudioContextType extends AudioState {
  playSurah: (surah: Surah) => void;
  pauseSurah: () => void;
  resumeSurah: () => void;
  stopSurah: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [audioState, setAudioState] = useState<AudioState>({
    currentSurah: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSurah = (surah: Surah) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Create a new audio element
    const audio = new Audio(surah.audioUrl);
    audioRef.current = audio;

    audio.addEventListener('loadedmetadata', () => {
      setAudioState(prev => ({
        ...prev,
        duration: audio.duration,
      }));
    });

    audio.addEventListener('timeupdate', () => {
      setAudioState(prev => ({
        ...prev,
        currentTime: audio.currentTime,
      }));
    });

    audio.addEventListener('ended', () => {
      setAudioState(prev => ({
        ...prev,
        isPlaying: false,
        currentTime: 0,
      }));
    });

    audio.addEventListener('error', () => {
      console.warn(`Audio file not found for ${surah.nameEnglish}. Using placeholder.`);
      setAudioState(prev => ({
        ...prev,
        isPlaying: false,
      }));
    });

    setAudioState(prev => ({
      ...prev,
      currentSurah: surah,
      isPlaying: true,
    }));

    audio.play().catch(error => {
      console.warn('Audio playback failed:', error);
      setAudioState(prev => ({
        ...prev,
        isPlaying: false,
      }));
    });
  };

  const pauseSurah = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioState(prev => ({
        ...prev,
        isPlaying: false,
      }));
    }
  };

  const resumeSurah = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.warn('Audio resume failed:', error);
      });
      setAudioState(prev => ({
        ...prev,
        isPlaying: true,
      }));
    }
  };

  const stopSurah = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setAudioState({
      currentSurah: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    });
  };

  return (
    <AudioContext.Provider
      value={{
        ...audioState,
        playSurah,
        pauseSurah,
        resumeSurah,
        stopSurah,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}