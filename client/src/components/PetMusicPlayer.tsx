import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, Volume1, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MusicTheme {
  id: string;
  name: string;
  description: string;
  url: string;
  category: 'playful' | 'relaxing' | 'mysterious' | 'quantum' | 'bitcoin' | 'cypherpunk';
  durationSeconds: number;
}

interface PetMusicPlayerProps {
  theme?: MusicTheme;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  onThemeChange?: () => void;
  compact?: boolean;
}

export default function PetMusicPlayer({
  theme,
  className,
  autoPlay = false,
  loop = true,
  onThemeChange,
  compact = false
}: PetMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [simulationIntervalId, setSimulationIntervalId] = useState<number | null>(null);

  // Initialize audio player
  useEffect(() => {
    if (!theme?.url) return;
    
    const audio = new Audio(theme.url);
    audioRef.current = audio;
    
    // Set initial values
    audio.volume = volume;
    audio.loop = loop;
    audio.muted = isMuted;
    
    // Setup event listeners
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    audio.addEventListener('ended', handleEnded);
    
    // Auto play if enabled
    if (autoPlay) {
      playAudio();
    }
    
    // Cleanup
    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('ended', handleEnded);
      audioRef.current = null;
    };
  }, [theme?.url]);
  
  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  // Handle mute status changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);
  
  // Simulate playback progress when actual audio might not play (like in Replit preview)
  useEffect(() => {
    // Clear any existing simulation interval
    if (simulationIntervalId !== null) {
      window.clearInterval(simulationIntervalId);
      setSimulationIntervalId(null);
    }
    
    // If playing and we have a theme duration, create simulation
    if (isPlaying && theme?.durationSeconds) {
      // Calculate how often to update based on duration (aim for smooth updates)
      const totalDuration = theme.durationSeconds * 1000; // Convert to ms
      const updateInterval = 500; // Update every 500ms
      const stepSize = (updateInterval / totalDuration) * 100; // Progress step size
      
      // Set duration if we don't have it yet (from loadedmetadata)
      if (duration === 0) {
        setDuration(theme.durationSeconds);
      }
      
      // Start the simulation interval
      const intervalId = window.setInterval(() => {
        setProgress(prevProgress => {
          // Reset to start if we've reached the end
          if (prevProgress >= 100) {
            if (loop) {
              return 0;
            } else {
              // Stop playing and clear interval
              window.clearInterval(intervalId);
              setIsPlaying(false);
              return 0;
            }
          }
          return prevProgress + stepSize;
        });
      }, updateInterval);
      
      setSimulationIntervalId(intervalId);
      
      // Clean up interval on unmount or when playing stops
      return () => {
        window.clearInterval(intervalId);
      };
    }
  }, [isPlaying, theme?.durationSeconds, loop, duration]);
  
  const updateProgress = () => {
    if (audioRef.current) {
      const value = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(value);
    }
  };
  
  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    
    if (loop && audioRef.current) {
      audioRef.current.currentTime = 0;
      playAudio();
    }
  };
  
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.error('Error playing audio:', error);
          // In case of error (common in Replit preview), still update UI state
          // This allows the UI to respond even if actual audio doesn't play
          setIsPlaying(true);
          
          // Show a console message about the audio restrictions
          console.log('Note: Audio playback may be restricted in this environment. The UI will simulate playback.');
        });
    }
  };
  
  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };
  
  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      const newTime = (value[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  if (!theme) {
    return (
      <Card className={cn("w-full bg-muted/20", className)}>
        <CardContent className="p-4 flex items-center justify-center min-h-[100px]">
          <p className="text-muted-foreground text-sm">No music theme selected</p>
          {onThemeChange && (
            <Button variant="outline" size="sm" onClick={onThemeChange} className="ml-4">
              Select Theme
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }
  
  // Return compact version if requested
  if (compact) {
    return (
      <div className={cn("flex items-center gap-2 p-2", className)}>
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlayPause}
          className="h-8 w-8"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </Button>
        <div className="text-xs truncate max-w-[120px]">{theme.name}</div>
      </div>
    );
  }
  
  // Return full player
  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{theme.name}</h4>
              <p className="text-xs text-muted-foreground">{theme.category}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlayPause}
              className="h-10 w-10 rounded-full"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>
          </div>
          
          <div className="space-y-1">
            <Slider
              value={[progress]}
              min={0}
              max={100}
              step={0.1}
              onValueChange={handleProgressChange}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime((progress / 100) * duration)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            
            {/* Audio playback notice for Replit environment */}
            {isPlaying && (
              <div className="bg-accent/20 rounded-md p-2 text-xs text-center">
                <p className="text-muted-foreground">
                  Note: Audio playback may be restricted in Replit. Visualized playback is shown here.
                </p>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="h-8 w-8"
            >
              {isMuted || volume === 0 ? (
                <VolumeX size={16} />
              ) : volume < 0.5 ? (
                <Volume1 size={16} />
              ) : (
                <Volume2 size={16} />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume * 100]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-24 cursor-pointer"
            />
          </div>
          
          {onThemeChange && (
            <Button variant="outline" size="sm" onClick={onThemeChange} className="w-full mt-2">
              Change Theme
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}