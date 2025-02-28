import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import PetMusicPlayer, { MusicTheme } from '@/components/PetMusicPlayer';
import MusicThemeSelector from '@/components/MusicThemeSelector';

// Sample music themes (same as in MusicThemeSelector)
const musicThemes: MusicTheme[] = [
  {
    id: 'playful-purr',
    name: 'Playful Purr',
    description: 'Upbeat and cheerful tune for playful cats',
    url: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3',
    category: 'playful',
    durationSeconds: 30
  },
  {
    id: 'relaxing-meow',
    name: 'Relaxing Meow',
    description: 'Calm and soothing melody for relaxed felines',
    url: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3',
    category: 'relaxing',
    durationSeconds: 30
  },
  {
    id: 'mysterious-purr',
    name: 'Mysterious Purr',
    description: 'Enigmatic and curious tones for mysterious cats',
    url: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
    category: 'mysterious',
    durationSeconds: 30
  },
  {
    id: 'quantum-meowsic',
    name: 'Quantum Meowsic',
    description: 'Experimental tones for quantum-state cats',
    url: 'https://assets.mixkit.co/music/preview/mixkit-deep-urban-623.mp3',
    category: 'quantum',
    durationSeconds: 30
  },
  {
    id: 'blockchain-beats',
    name: 'Blockchain Beats',
    description: 'Digital rhythms for crypto-savvy cats',
    url: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3',
    category: 'bitcoin',
    durationSeconds: 30
  },
  {
    id: 'cypherpunk-cat',
    name: 'Cypherpunk Cat',
    description: 'Encrypted melodies for privacy-conscious felines',
    url: 'https://assets.mixkit.co/music/preview/mixkit-hazy-after-hours-132.mp3',
    category: 'cypherpunk',
    durationSeconds: 30
  }
];

export default function MusicPlayerDemo() {
  const [selectedTheme, setSelectedTheme] = useState<MusicTheme | undefined>(undefined);

  const handleSelectTheme = (theme: MusicTheme) => {
    setSelectedTheme(theme);
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-2">Music Player Demo</h1>
      <p className="text-muted-foreground mb-8">
        Test the music player component with simulated playback in Replit environment
      </p>
      
      <Separator className="my-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Music Theme Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Select a music theme to see the player in action. Note that audio playback might be restricted
                in the Replit environment, so we've implemented a visual simulation.
              </p>
              <MusicThemeSelector 
                onSelect={handleSelectTheme}
                currentThemeId={selectedTheme?.id}
              />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Music Player</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTheme ? (
                <PetMusicPlayer
                  theme={selectedTheme}
                  onThemeChange={() => {}}
                  autoPlay={false}
                  loop={true}
                />
              ) : (
                <div className="bg-muted/20 p-8 rounded-md text-center">
                  <p className="text-muted-foreground">
                    Select a theme from the left panel to see the music player
                  </p>
                </div>
              )}
              
              <div className="mt-6 p-4 border rounded-md bg-muted/10">
                <h3 className="font-medium mb-2">About this implementation:</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  The music player is designed to work with or without actual audio playback. In environments
                  where audio playback is restricted (like Replit), the player will show visual progress
                  to simulate the experience.
                </p>
                <p className="text-sm text-muted-foreground">
                  Try playing, pausing, and adjusting the volume to see the interface in action.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Separator className="my-8" />
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-1">
          This is a demo of the music player component used in the Lost Pets section.
        </p>
        <p className="text-sm text-muted-foreground">
          © 2025 CatDAO. All rights reserved.
        </p>
      </div>
    </div>
  );
}