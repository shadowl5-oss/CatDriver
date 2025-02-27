import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Terminal, Download, Copy, X, RefreshCw, Cpu, Bitcoin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { generateAdvancedCatASCII, generateCatTypeASCII } from '@/lib/asciiArtGenerator';
import { useToast } from '@/hooks/use-toast';

interface AsciiArtVisualizerProps {
  blockHeight?: number;
  rarity?: string;
  isFullscreen?: boolean;
  onClose?: () => void;
  ordinalId?: string;
  name?: string;
}

export default function AsciiArtVisualizer({
  blockHeight = 831045,
  rarity = 'Common',
  isFullscreen = true,
  onClose,
  ordinalId = '0',
  name = 'Quantum Cat'
}: AsciiArtVisualizerProps) {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState('standard');
  const [width, setWidth] = useState(60);
  const [colorMode, setColorMode] = useState<'none' | 'ansi' | 'html'>('ansi');
  const [detailLevel, setDetailLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [pattern, setPattern] = useState<string>('striped');
  const [regenerating, setRegenerating] = useState(false);
  const [asciiArt, setAsciiArt] = useState<string>('');
  const [specialType, setSpecialType] = useState<'quantum' | 'bitcoin' | 'cypherpunk' | 'schrodinger'>('quantum');
  
  // Generate ASCII art based on current settings
  useEffect(() => {
    generateAscii();
  }, [width, colorMode, detailLevel, pattern, currentTab, specialType]);
  
  // Function to generate the ASCII art
  const generateAscii = () => {
    setRegenerating(true);
    
    // Use a small timeout to allow the UI to show regenerating state
    setTimeout(() => {
      try {
        let generatedArt = '';
        
        if (currentTab === 'standard') {
          generatedArt = generateAdvancedCatASCII(
            {
              rarity: rarity,
              pattern: pattern,
              eyeStyle: 'quantum',
              whiskerStyle: 'long',
              special: blockHeight % 10 === 0,
              expression: 'wise',
              accessories: blockHeight % 10 === 0 ? ['hat', 'bowtie'] : []
            },
            {
              width: width,
              colorMode: colorMode,
              detailLevel: detailLevel
            }
          );
        } else if (currentTab === 'specialized') {
          generatedArt = generateCatTypeASCII(
            {
              type: specialType,
              blockHeight: blockHeight,
              rarity: rarity,
              patternType: pattern,
              special: blockHeight % 10 === 0,
              tokenId: ordinalId
            },
            {
              width: width,
              colorMode: colorMode,
              detailLevel: detailLevel
            }
          );
        }
        
        setAsciiArt(generatedArt);
      } catch (error) {
        console.error('Error generating ASCII art:', error);
        setAsciiArt('Error generating ASCII art. Please try different settings.');
      } finally {
        setRegenerating(false);
      }
    }, 500);
  };
  
  // Copy ASCII art to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(asciiArt).then(
      () => {
        toast({
          title: 'Copied to clipboard',
          description: 'ASCII art has been copied to your clipboard',
        });
      },
      () => {
        toast({
          title: 'Copy failed',
          description: 'Failed to copy ASCII art to clipboard',
          variant: 'destructive',
        });
      }
    );
  };
  
  // Download ASCII art as a text file
  const downloadAscii = () => {
    const element = document.createElement('a');
    const file = new Blob([asciiArt], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${name.toLowerCase().replace(/\s+/g, '_')}_ascii_art.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: 'Download started',
      description: 'Your ASCII art file is being downloaded',
    });
  };
  
  // Regenerate ASCII art with current settings
  const handleRegenerate = () => {
    generateAscii();
  };
  
  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center' : ''}`}>
      <div className={`bg-black rounded-xl overflow-hidden ${isFullscreen ? 'w-[90vw] max-w-5xl h-[85vh]' : 'w-full'}`}>
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-green-500" />
            <h2 className="text-xl font-bold text-white">Quantum Cat ASCII Art Visualizer</h2>
          </div>
          
          {isFullscreen && (
            <Button variant="ghost" className="text-white hover:bg-white/10" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 h-[calc(100%-64px)]">
          <div className="md:col-span-3 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-auto p-4 bg-black">
              <pre className={`font-mono text-xs md:text-sm whitespace-pre ${regenerating ? 'opacity-50' : ''}`}>
                {regenerating ? 'Generating ASCII art...' : asciiArt}
              </pre>
            </div>
            
            <div className="p-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-white/60 mr-2">Block Height: {blockHeight}</span>
                <span className="text-xs text-white/60 mr-2">•</span>
                <span className="text-xs text-white/60 mr-2">Rarity: {rarity}</span>
                <span className="text-xs text-white/60 mr-2">•</span>
                <span className="text-xs text-white/60">ID: {ordinalId}</span>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={copyToClipboard} className="text-white border-white/20 hover:bg-white/10">
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button size="sm" variant="outline" onClick={downloadAscii} className="text-white border-white/20 hover:bg-white/10">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-l border-white/10 bg-black/20 p-4 overflow-y-auto">
            <h3 className="font-bold text-white mb-4">ASCII Settings</h3>
            
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full mb-4">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="standard" className="text-white">
                  Standard
                </TabsTrigger>
                <TabsTrigger value="specialized" className="text-white">
                  Specialized
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {currentTab === 'specialized' && (
              <div className="mb-4">
                <label className="text-xs text-white/60 block mb-2">ASCII Art Type</label>
                <Select value={specialType} onValueChange={(value: 'quantum' | 'bitcoin' | 'cypherpunk' | 'schrodinger') => setSpecialType(value)}>
                  <SelectTrigger className="w-full bg-black border-white/20">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quantum">
                      <div className="flex items-center">
                        <Cpu className="h-4 w-4 mr-2 text-purple-400" />
                        <span>Quantum</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="bitcoin">
                      <div className="flex items-center">
                        <Bitcoin className="h-4 w-4 mr-2 text-amber-400" />
                        <span>Bitcoin</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="cypherpunk">Cypherpunk</SelectItem>
                    <SelectItem value="schrodinger">Schrödinger</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/60 block mb-2">Width (Characters)</label>
                <Slider
                  value={[width]}
                  min={40}
                  max={120}
                  step={5}
                  onValueChange={(value) => setWidth(value[0])}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-white/40 mt-1">
                  <span>40</span>
                  <span>{width}</span>
                  <span>120</span>
                </div>
              </div>
              
              <div>
                <label className="text-xs text-white/60 block mb-2">Color Mode</label>
                <Select value={colorMode} onValueChange={(value: 'none' | 'ansi' | 'html') => setColorMode(value)}>
                  <SelectTrigger className="w-full bg-black border-white/20">
                    <SelectValue placeholder="Select color mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Color</SelectItem>
                    <SelectItem value="ansi">ANSI Color</SelectItem>
                    <SelectItem value="html">HTML Color</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-xs text-white/60 block mb-2">Detail Level</label>
                <Select value={detailLevel} onValueChange={(value: 'low' | 'medium' | 'high') => setDetailLevel(value)}>
                  <SelectTrigger className="w-full bg-black border-white/20">
                    <SelectValue placeholder="Select detail level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Detail</SelectItem>
                    <SelectItem value="medium">Medium Detail</SelectItem>
                    <SelectItem value="high">High Detail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-xs text-white/60 block mb-2">Pattern Style</label>
                <Select value={pattern} onValueChange={setPattern}>
                  <SelectTrigger className="w-full bg-black border-white/20">
                    <SelectValue placeholder="Select pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="striped">Striped</SelectItem>
                    <SelectItem value="spotted">Spotted</SelectItem>
                    <SelectItem value="tabby">Tabby</SelectItem>
                    <SelectItem value="quantum">Quantum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleRegenerate} className="w-full mt-4 bg-green-800 hover:bg-green-700 text-white">
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate ASCII Art
              </Button>
            </div>
            
            <div className="mt-8 pt-4 border-t border-white/10">
              <h4 className="text-sm font-medium text-white mb-2">About ASCII Art</h4>
              <p className="text-xs text-white/70 mb-4">
                ASCII art is created using text characters to form images. Our quantum-inspired ASCII art generator
                uses Bitcoin block data and quantum principles to create unique cat ordinal representations.
              </p>
              <div className="text-xs text-white/70">
                <p className="mb-1">Block Influence: Higher blocks = more complex patterns</p>
                <p className="mb-1">Rarity Effects: Rarer cats have more detailed features</p>
                <p>Quantum Elements: Incorporates uncertainty principles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}