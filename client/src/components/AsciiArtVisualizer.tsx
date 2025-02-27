import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Cat, 
  RefreshCw, 
  Copy, 
  DownloadIcon, 
  Zap, 
  Bitcoin, 
  Shield, 
  Sparkles 
} from 'lucide-react';
import { 
  generateCatASCII, 
  generateAdvancedCatASCII, 
  generateCatTypeASCII 
} from '@/lib/asciiArtGenerator';
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
  isFullscreen = false,
  onClose,
  ordinalId,
  name = 'Cat Ordinal'
}: AsciiArtVisualizerProps) {
  const { toast } = useToast();
  const [asciiArt, setAsciiArt] = useState<string>('');
  const [currentTab, setCurrentTab] = useState<string>('simple');
  const [catType, setCatType] = useState<string>('quantum');
  const [expression, setExpression] = useState<string>('neutral');
  const [pattern, setPattern] = useState<string>('solid');
  const [entropyLevel, setEntropyLevel] = useState<number>(50);
  const [isSpecial, setIsSpecial] = useState<boolean>(false);
  const [quantumState, setQuantumState] = useState<string>('superposition');
  
  // Generate ASCII art based on current settings
  useEffect(() => {
    let artOutput: string;
    
    if (currentTab === 'advanced') {
      artOutput = generateAdvancedCatASCII(rarity, blockHeight, quantumState);
    } else if (currentTab === 'specialized') {
      artOutput = generateCatTypeASCII(catType, {
        blockHeight,
        rarity,
        quantumState,
        isObserved: quantumState === 'observed' || quantumState === 'collapsed',
        anonymous: entropyLevel > 70
      });
    } else {
      // Simple mode
      artOutput = generateCatASCII({
        rarity: rarity.toLowerCase(),
        pattern,
        eyeStyle: entropyLevel > 70 ? 'quantum' : entropyLevel > 40 ? 'wide' : 'normal',
        whiskerStyle: 'standard',
        special: isSpecial,
        expression,
        accessories: isSpecial ? ['glasses'] : []
      }, {
        width: 40,
        detailLevel: 'high',
        colorMode: 'none',
        frameStyle: 'quantum'
      });
    }
    
    setAsciiArt(artOutput);
  }, [currentTab, rarity, blockHeight, quantumState, catType, expression, pattern, entropyLevel, isSpecial]);

  // Copy ASCII art to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(asciiArt);
    toast({
      title: "Copied!",
      description: "ASCII art copied to clipboard"
    });
  };

  // Download ASCII art as a text file
  const downloadAsciiArt = () => {
    const element = document.createElement('a');
    const file = new Blob([asciiArt], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${name.replace(/\s+/g, '_')}_ascii_art.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded!",
      description: "ASCII art saved to a text file"
    });
  };

  // Regenerate with new parameters
  const regenerate = () => {
    setEntropyLevel(Math.floor(Math.random() * 100));
    setExpression(['happy', 'sad', 'surprised', 'angry', 'neutral'][Math.floor(Math.random() * 5)]);
    setPattern(['solid', 'striped', 'spotted', 'binary'][Math.floor(Math.random() * 4)]);
    setIsSpecial(Math.random() > 0.7);
    
    toast({
      title: "Generated!",
      description: "New ASCII art created with random traits"
    });
  };

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm' : 'w-full'}`}>
      <Card className={`overflow-hidden transition-all duration-300 ${isFullscreen ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl h-[80vh]' : 'w-full'}`}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Cat className="h-5 w-5" />
                ASCII Cat Ordinal Generator
              </CardTitle>
              <CardDescription>
                Generate ASCII art for Cat Ordinals #{ordinalId || 'N/A'} - Block: {blockHeight}
              </CardDescription>
            </div>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            {/* Left panel - Controls */}
            <div className="p-4 border-r md:col-span-2">
              <div className="space-y-4">
                <Tabs defaultValue="simple" value={currentTab} onValueChange={setCurrentTab}>
                  <TabsList className="w-full">
                    <TabsTrigger value="simple" className="flex-1">Simple</TabsTrigger>
                    <TabsTrigger value="advanced" className="flex-1">Advanced</TabsTrigger>
                    <TabsTrigger value="specialized" className="flex-1">Specialized</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="simple" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Expression</Label>
                      <Select value={expression} onValueChange={setExpression}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select expression" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="neutral">Neutral</SelectItem>
                          <SelectItem value="happy">Happy</SelectItem>
                          <SelectItem value="sad">Sad</SelectItem>
                          <SelectItem value="surprised">Surprised</SelectItem>
                          <SelectItem value="angry">Angry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Pattern</Label>
                      <Select value={pattern} onValueChange={setPattern}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pattern" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solid">Solid</SelectItem>
                          <SelectItem value="striped">Striped</SelectItem>
                          <SelectItem value="spotted">Spotted</SelectItem>
                          <SelectItem value="binary">Binary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Entropy Level</Label>
                        <span className="text-xs text-muted-foreground">{entropyLevel}%</span>
                      </div>
                      <Slider 
                        value={[entropyLevel]} 
                        onValueChange={(values) => setEntropyLevel(values[0])}
                        min={0}
                        max={100}
                        step={1}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="special"
                        checked={isSpecial}
                        onCheckedChange={setIsSpecial}
                      />
                      <Label htmlFor="special">Special Features</Label>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="advanced" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Quantum State</Label>
                      <Select value={quantumState} onValueChange={setQuantumState}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select quantum state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="superposition">Superposition</SelectItem>
                          <SelectItem value="entangled">Entangled</SelectItem>
                          <SelectItem value="observed">Observed</SelectItem>
                          <SelectItem value="collapsed">Collapsed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="p-4 bg-secondary/10 rounded-md">
                      <h3 className="text-sm font-medium flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Advanced Visualization
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        The advanced mode creates more detailed ASCII art based on block height, 
                        rarity, and quantum states from the blockchain.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="specialized" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Cat Type</Label>
                      <Select value={catType} onValueChange={setCatType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cat type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quantum">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-4 w-4" />
                              <span>Quantum Cat</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="bitcoin">
                            <div className="flex items-center gap-2">
                              <Bitcoin className="h-4 w-4" />
                              <span>Bitcoin Cat</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="cypherpunk">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4" />
                              <span>Cypherpunk Cat</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="schrodinger">
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4" />
                              <span>Schrödinger's Cat</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Quantum State</Label>
                      <Select value={quantumState} onValueChange={setQuantumState}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select quantum state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="superposition">Superposition</SelectItem>
                          <SelectItem value="entangled">Entangled</SelectItem>
                          <SelectItem value="observed">Observed</SelectItem>
                          <SelectItem value="collapsed">Collapsed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <Button onClick={regenerate} className="w-full flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Regenerate
                </Button>
              </div>
            </div>
            
            {/* Right panel - ASCII art display */}
            <div className="p-4 md:col-span-3 flex flex-col">
              <div className="flex-1 overflow-auto bg-black rounded-md p-6">
                <pre className="text-green-400 text-xs md:text-sm leading-[1.1] font-mono whitespace-pre-wrap">
                  {asciiArt}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t p-4 flex justify-between">
          <div className="text-sm text-muted-foreground">
            <span className="font-bold">{name}</span> - {rarity} - Block {blockHeight}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={downloadAsciiArt}>
              <DownloadIcon className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}