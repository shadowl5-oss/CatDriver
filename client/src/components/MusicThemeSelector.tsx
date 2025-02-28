import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { type MusicTheme } from './PetMusicPlayer';
import { Music, Play, Pause } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MusicThemeSelectorProps {
  onSelect: (theme: MusicTheme) => void;
  currentThemeId?: string;
  trigger?: React.ReactNode;
}

// Sample music themes
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

export default function MusicThemeSelector({ onSelect, currentThemeId, trigger }: MusicThemeSelectorProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [audioPreview, setAudioPreview] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleSelect = (theme: MusicTheme) => {
    onSelect(theme);
    stopPreview();
    setOpen(false);
    
    toast({
      title: "Music theme updated",
      description: `Your pet now has the "${theme.name}" theme.`,
    });
  };
  
  const togglePreview = (theme: MusicTheme) => {
    // Stop any current preview
    stopPreview();
    
    // If we clicked the current preview, just stop it
    if (previewId === theme.id) {
      setPreviewId(null);
      return;
    }
    
    // Play the new preview
    const audio = new Audio(theme.url);
    audio.volume = 0.5;
    audio.play();
    
    setAudioPreview(audio);
    setPreviewId(theme.id);
    
    // Auto-stop after preview duration
    setTimeout(() => {
      if (audio) {
        audio.pause();
        if (previewId === theme.id) {
          setPreviewId(null);
        }
      }
    }, 10000); // 10 second preview
  };
  
  const stopPreview = () => {
    if (audioPreview) {
      audioPreview.pause();
      setAudioPreview(null);
    }
    setPreviewId(null);
  };
  
  // Filter themes based on active tab
  const filteredThemes = activeTab === 'all' 
    ? musicThemes 
    : musicThemes.filter(theme => theme.category === activeTab);
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) {
        stopPreview();
      }
    }}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <Music className="mr-2 h-4 w-4" />
            Select Music Theme
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Choose a Music Theme</DialogTitle>
          <DialogDescription>
            Select a music theme that matches your pet's personality.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="playful">Playful</TabsTrigger>
            <TabsTrigger value="relaxing">Relaxing</TabsTrigger>
            <TabsTrigger value="quantum">Quantum</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-1">
              {filteredThemes.map((theme) => (
                <Card key={theme.id} className={
                  currentThemeId === theme.id 
                    ? "border-primary" 
                    : ""
                }>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">{theme.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {theme.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      {theme.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-3 pt-0 flex justify-between">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => togglePreview(theme)}
                    >
                      {previewId === theme.id ? (
                        <><Pause className="h-4 w-4 mr-1" /> Stop</>
                      ) : (
                        <><Play className="h-4 w-4 mr-1" /> Preview</>
                      )}
                    </Button>
                    <Button 
                      variant={currentThemeId === theme.id ? "secondary" : "outline"} 
                      size="sm"
                      onClick={() => handleSelect(theme)}
                    >
                      {currentThemeId === theme.id ? "Selected" : "Select"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}