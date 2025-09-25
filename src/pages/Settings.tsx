import { Moon, Sun, Info, Heart, Volume2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/contexts/ThemeContext';

export function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center text-foreground mb-6">
        Settings
      </h2>
      
      <Card className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Appearance</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Moon className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Sun className="h-5 w-5 text-muted-foreground" />
              )}
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-islamic-green"
            />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Audio</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Auto-play Next</p>
                <p className="text-sm text-muted-foreground">
                  Automatically play next surah
                </p>
              </div>
            </div>
            <Switch className="data-[state=checked]:bg-islamic-green" />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">About</h3>
          
          <div className="space-y-4">
            <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-3">
              <Info className="h-5 w-5 text-muted-foreground" />
              <div className="text-left">
                <p className="font-medium text-foreground">About This App</p>
                <p className="text-sm text-muted-foreground">
                  Learn more about Quran Audio
                </p>
              </div>
            </Button>

            <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-3">
              <Heart className="h-5 w-5 text-muted-foreground" />
              <div className="text-left">
                <p className="font-medium text-foreground">Support Us</p>
                <p className="text-sm text-muted-foreground">
                  Help us improve the app
                </p>
              </div>
            </Button>
          </div>
        </div>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>Quran Audio v1.0.0</p>
        <p>Made with ❤️ for the Muslim community</p>
      </div>
    </div>
  );
}