import { useState, useRef, useEffect } from 'react';
import { CatCanvasGenerator, CatTraits, BlockchainData, getDefaultColors, getRandomAccessories } from '@/lib/canvasGenerator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface CatCanvasEditorProps {
  initialType?: 'quantum' | 'bitcoin' | 'cypherpunk' | 'schrodinger' | 'generic';
  initialRarity?: 'common' | 'rare' | 'epic' | 'legendary';
  onSave?: (imageData: string, traits: CatTraits, blockchainData?: BlockchainData) => void;
}

export default function CatCanvasEditor({ 
  initialType = 'quantum', 
  initialRarity = 'common',
  onSave 
}: CatCanvasEditorProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('type');
  const [asciiView, setAsciiView] = useState(false);
  const [asciiArt, setAsciiArt] = useState('');
  
  const [traits, setTraits] = useState<CatTraits>({
    type: initialType,
    rarity: initialRarity,
    colors: getDefaultColors(initialType),
    accessories: getRandomAccessories(initialRarity),
    expression: 'neutral'
  });
  
  const [blockchainData, setBlockchainData] = useState<BlockchainData>({
    blockHeight: 830000 + Math.floor(Math.random() * 5000),
    blockHash: '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
    entropy: 50,
    quantumState: 'observed'
  });
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const generator = useRef<CatCanvasGenerator | null>(null);
  
  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current && !generator.current) {
      generator.current = new CatCanvasGenerator(500, 500);
      updateCanvas();
    }
  }, []);
  
  // Update canvas when traits or blockchain data changes
  useEffect(() => {
    updateCanvas();
  }, [traits, blockchainData]);
  
  // Function to update the canvas
  const updateCanvas = () => {
    if (!generator.current || !canvasRef.current) return;
    
    generator.current
      .setTraits(traits)
      .setBlockchainData(blockchainData)
      .draw();
      
    // Update the container with the canvas
    canvasRef.current.innerHTML = '';
    canvasRef.current.appendChild(generator.current.getCanvas());
  };
  
  // Handle trait changes
  const updateTrait = (traitName: keyof CatTraits, value: any) => {
    setTraits(prev => {
      // Special handling for colors when type changes
      if (traitName === 'type') {
        return {
          ...prev,
          [traitName]: value,
          colors: getDefaultColors(value as any)
        };
      }
      
      // Special handling for accessories when rarity changes
      if (traitName === 'rarity') {
        return {
          ...prev,
          [traitName]: value,
          accessories: getRandomAccessories(value as string)
        };
      }
      
      return {
        ...prev,
        [traitName]: value
      };
    });
  };
  
  // Handle blockchain data changes
  const updateBlockchainData = (dataName: keyof BlockchainData, value: any) => {
    setBlockchainData(prev => ({
      ...prev,
      [dataName]: value
    }));
  };
  
  // Generate new random cat
  const generateRandomCat = () => {
    const types: Array<'quantum' | 'bitcoin' | 'cypherpunk' | 'schrodinger' | 'generic'> = [
      'quantum', 'bitcoin', 'cypherpunk', 'schrodinger', 'generic'
    ];
    const rarities: Array<'common' | 'rare' | 'epic' | 'legendary'> = [
      'common', 'rare', 'epic', 'legendary'
    ];
    const expressions: Array<'happy' | 'sad' | 'surprised' | 'grumpy' | 'wise' | 'mischievous' | 'neutral'> = [
      'happy', 'sad', 'surprised', 'grumpy', 'wise', 'mischievous', 'neutral'
    ];
    const quantumStates: Array<'observed' | 'unobserved' | 'superposition' | 'entangled'> = [
      'observed', 'unobserved', 'superposition', 'entangled'
    ];
    
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomRarity = rarities[Math.floor(Math.random() * rarities.length)];
    const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
    const randomQuantumState = quantumStates[Math.floor(Math.random() * quantumStates.length)];
    
    setTraits({
      type: randomType,
      rarity: randomRarity,
      colors: getDefaultColors(randomType),
      accessories: getRandomAccessories(randomRarity),
      expression: randomExpression
    });
    
    setBlockchainData({
      blockHeight: 830000 + Math.floor(Math.random() * 5000),
      blockHash: Array(64).fill(0).map(() => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join(''),
      entropy: Math.random() * 100,
      quantumState: randomQuantumState
    });
    
    toast({
      title: 'Random Cat Generated',
      description: `Created a ${randomRarity} ${randomType} cat with ${randomExpression} expression`,
    });
  };
  
  // Handle save
  const handleSave = () => {
    if (generator.current && onSave) {
      onSave(generator.current.toDataURL(), traits, blockchainData);
      
      toast({
        title: 'Cat Ordinal Saved',
        description: `Successfully saved your ${traits.rarity} ${traits.type} cat ordinal.`,
      });
    }
  };
  
  // Toggle ASCII view
  const toggleAsciiView = () => {
    if (generator.current) {
      if (!asciiView) {
        const ascii = generator.current.toASCII();
        setAsciiArt(ascii);
      }
      setAsciiView(!asciiView);
    }
  };
  
  // Export as SVG
  const exportAsSVG = () => {
    if (generator.current) {
      const svg = generator.current.toSVG();
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${traits.type}-${traits.rarity}-cat.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'SVG Exported',
        description: 'Your cat ordinal has been exported as an SVG file.',
      });
    }
  };
  
  // Export as PNG
  const exportAsPNG = () => {
    if (generator.current) {
      const dataUrl = generator.current.toDataURL('image/png');
      
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${traits.type}-${traits.rarity}-cat.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast({
        title: 'PNG Exported',
        description: 'Your cat ordinal has been exported as a PNG file.',
      });
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cat Ordinal Canvas Editor</CardTitle>
        <CardDescription>Design your unique cat ordinal with advanced traits and blockchain data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Canvas or ASCII view */}
          <div className="flex flex-col">
            {asciiView ? (
              <pre className="bg-black text-green-500 p-3 rounded-lg overflow-auto whitespace-pre font-mono text-xs h-[500px]">
                {asciiArt}
              </pre>
            ) : (
              <div 
                ref={canvasRef} 
                className="aspect-square w-full rounded-lg overflow-hidden bg-black flex items-center justify-center mb-4"
              />
            )}
            
            <div className="grid grid-cols-3 gap-2 mt-2">
              <Button variant="outline" onClick={toggleAsciiView}>
                {asciiView ? 'Canvas View' : 'ASCII View'}
              </Button>
              <Button variant="outline" onClick={exportAsSVG}>
                Export SVG
              </Button>
              <Button variant="outline" onClick={exportAsPNG}>
                Export PNG
              </Button>
            </div>
          </div>
          
          {/* Controls */}
          <div>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="type">Type & Rarity</TabsTrigger>
                <TabsTrigger value="traits">Traits</TabsTrigger>
                <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
              </TabsList>
              
              <TabsContent value="type" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cat-type">Cat Type</Label>
                  <Select 
                    value={traits.type} 
                    onValueChange={(value: any) => updateTrait('type', value)}
                  >
                    <SelectTrigger id="cat-type">
                      <SelectValue placeholder="Select a cat type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quantum">Quantum Cat</SelectItem>
                      <SelectItem value="bitcoin">Bitcoin Cat</SelectItem>
                      <SelectItem value="cypherpunk">Cypherpunk Cat</SelectItem>
                      <SelectItem value="schrodinger">Schrödinger's Cat</SelectItem>
                      <SelectItem value="generic">Generic Cat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cat-rarity">Rarity</Label>
                  <Select 
                    value={traits.rarity} 
                    onValueChange={(value: any) => updateTrait('rarity', value)}
                  >
                    <SelectTrigger id="cat-rarity">
                      <SelectValue placeholder="Select a rarity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="common">Common</SelectItem>
                      <SelectItem value="rare">Rare</SelectItem>
                      <SelectItem value="epic">Epic</SelectItem>
                      <SelectItem value="legendary">Legendary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-full border"
                      style={{ backgroundColor: traits.colors[0] }}
                    />
                    <Input 
                      type="color" 
                      value={traits.colors[0]} 
                      onChange={(e) => {
                        setTraits(prev => ({
                          ...prev,
                          colors: [e.target.value, prev.colors[1]]
                        }));
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-full border"
                      style={{ backgroundColor: traits.colors[1] }}
                    />
                    <Input 
                      type="color" 
                      value={traits.colors[1]} 
                      onChange={(e) => {
                        setTraits(prev => ({
                          ...prev,
                          colors: [prev.colors[0], e.target.value]
                        }));
                      }}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="traits" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="expression">Expression</Label>
                  <Select 
                    value={traits.expression} 
                    onValueChange={(value: any) => updateTrait('expression', value)}
                  >
                    <SelectTrigger id="expression">
                      <SelectValue placeholder="Select an expression" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="happy">Happy</SelectItem>
                      <SelectItem value="sad">Sad</SelectItem>
                      <SelectItem value="surprised">Surprised</SelectItem>
                      <SelectItem value="grumpy">Grumpy</SelectItem>
                      <SelectItem value="wise">Wise</SelectItem>
                      <SelectItem value="mischievous">Mischievous</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Accessories</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="accessory-hat"
                        checked={traits.accessories.includes('hat')}
                        onCheckedChange={(checked) => {
                          setTraits(prev => ({
                            ...prev,
                            accessories: checked 
                              ? [...prev.accessories, 'hat']
                              : prev.accessories.filter(a => a !== 'hat')
                          }));
                        }}
                      />
                      <Label htmlFor="accessory-hat">Hat</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="accessory-bowtie"
                        checked={traits.accessories.includes('bowtie')}
                        onCheckedChange={(checked) => {
                          setTraits(prev => ({
                            ...prev,
                            accessories: checked 
                              ? [...prev.accessories, 'bowtie']
                              : prev.accessories.filter(a => a !== 'bowtie')
                          }));
                        }}
                      />
                      <Label htmlFor="accessory-bowtie">Bowtie</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="accessory-glasses"
                        checked={traits.accessories.includes('glasses')}
                        onCheckedChange={(checked) => {
                          setTraits(prev => ({
                            ...prev,
                            accessories: checked 
                              ? [...prev.accessories, 'glasses']
                              : prev.accessories.filter(a => a !== 'glasses')
                          }));
                        }}
                      />
                      <Label htmlFor="accessory-glasses">Glasses</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="accessory-collar"
                        checked={traits.accessories.includes('collar')}
                        onCheckedChange={(checked) => {
                          setTraits(prev => ({
                            ...prev,
                            accessories: checked 
                              ? [...prev.accessories, 'collar']
                              : prev.accessories.filter(a => a !== 'collar')
                          }));
                        }}
                      />
                      <Label htmlFor="accessory-collar">Collar</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Special Trait</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="special-trait"
                      checked={traits.special || false}
                      onCheckedChange={(checked) => {
                        setTraits(prev => ({
                          ...prev,
                          special: checked
                        }));
                      }}
                    />
                    <Label htmlFor="special-trait">Enable Special Trait</Label>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="blockchain" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="block-height">Block Height</Label>
                  <div className="flex items-center gap-4">
                    <Input 
                      id="block-height"
                      type="number" 
                      value={blockchainData.blockHeight} 
                      onChange={(e) => updateBlockchainData('blockHeight', parseInt(e.target.value))}
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => updateBlockchainData('blockHeight', 830000 + Math.floor(Math.random() * 5000))}
                    >
                      Random
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantum-state">Quantum State</Label>
                  <Select 
                    value={blockchainData.quantumState} 
                    onValueChange={(value: any) => updateBlockchainData('quantumState', value)}
                  >
                    <SelectTrigger id="quantum-state">
                      <SelectValue placeholder="Select quantum state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="observed">Observed</SelectItem>
                      <SelectItem value="unobserved">Unobserved</SelectItem>
                      <SelectItem value="superposition">Superposition</SelectItem>
                      <SelectItem value="entangled">Entangled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="entropy-level">Entropy Level ({blockchainData.entropy}%)</Label>
                  <Slider
                    id="entropy-level"
                    value={[blockchainData.entropy || 50]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => updateBlockchainData('entropy', value[0])}
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 flex gap-2">
              <Button variant="outline" className="flex-1" onClick={generateRandomCat}>
                Generate Random
              </Button>
              <Button variant="default" className="flex-1" onClick={handleSave}>
                Save Ordinal
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}