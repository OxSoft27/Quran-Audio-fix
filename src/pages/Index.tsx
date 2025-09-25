import { useState } from 'react';
import { surahs } from '@/data/surahs';
import { Header } from '@/components/Header';
import { SurahCard } from '@/components/SurahCard';
import { BottomNavigation } from '@/components/BottomNavigation';
import { AudioPlayer } from '@/components/AudioPlayer';
import { PlayerScreen } from '@/pages/PlayerScreen';
import { Settings } from '@/pages/Settings';
import { Favorites } from '@/pages/Favorites';
import { ForYou } from '@/pages/ForYou';
import { useAudio } from '@/contexts/AudioContext';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [showPlayerScreen, setShowPlayerScreen] = useState(false);
  const { currentSurah, isPlaying } = useAudio();

  const filteredSurahs = surahs.filter(surah =>
    surah.nameEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.nameArabic.includes(searchTerm) ||
    surah.translation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'favorites':
        return <Favorites />;
      case 'foryou':
        return <ForYou />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <>
            <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <main className="max-w-md mx-auto p-4 pb-24">
              <div className="grid grid-cols-2 gap-3">
                {filteredSurahs.map((surah) => (
                  <SurahCard 
                    key={surah.number} 
                    surah={surah} 
                    onPlay={() => setShowPlayerScreen(true)}
                  />
                ))}
              </div>
              {filteredSurahs.length === 0 && (
                <div className="text-center py-12 col-span-2">
                  <p className="text-muted-foreground">No surahs found matching your search.</p>
                </div>
              )}
            </main>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {showPlayerScreen && currentSurah ? (
        <PlayerScreen onClose={() => setShowPlayerScreen(false)} />
      ) : (
        <>
          {renderContent()}
          <AudioPlayer />
          <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </>
      )}
    </div>
  );
};

export default Index;
