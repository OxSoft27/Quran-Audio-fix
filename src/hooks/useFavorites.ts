import { useState, useEffect } from 'react';
import { Surah } from '@/data/surahs';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('quran-audio-favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const addToFavorites = (surah: Surah) => {
    const newFavorites = [...favorites, surah.number];
    setFavorites(newFavorites);
    localStorage.setItem('quran-audio-favorites', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (surah: Surah) => {
    const newFavorites = favorites.filter(id => id !== surah.number);
    setFavorites(newFavorites);
    localStorage.setItem('quran-audio-favorites', JSON.stringify(newFavorites));
  };

  const toggleFavorite = (surah: Surah) => {
    if (favorites.includes(surah.number)) {
      removeFromFavorites(surah);
    } else {
      addToFavorites(surah);
    }
  };

  const isFavorite = (surah: Surah) => favorites.includes(surah.number);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
  };
}