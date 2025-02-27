import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function Quantum() {
  const [activeTab, setActiveTab] = useState('schrodinger');
  const [catState, setCatState] = useState<'superposition' | 'observed' | 'collapsed'>('superposition');
  const [collapseChance, setCollapseChance] = useState<number>(50);
  const [coherence, setCoherence] = useState<number>(100);
  
  // Simulate quantum observation
  const observeCat = () => {
    setCoherence(Math.max(0, coherence - 25));
    setCatState('observed');
    
    // Randomly determine if the observation has collapsed the state
    const random = Math.random() * 100;
    if (random < collapseChance) {
      setCatState('collapsed');
    }
    
    // Adjust the collapse chance for next observation
    setCollapseChance(Math.min(90, collapseChance + 10));
  };
  
  // Reset the quantum experiment
  const resetExperiment = () => {
    setCatState('superposition');
    setCollapseChance(50);
    setCoherence(100);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Quantum Blockchain Theory</span>
          <Badge variant="secondary">Experimental</Badge>
        </CardTitle>
        <CardDescription>
          Understanding the quantum mechanics behind Cat Ordinals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="schrodinger">Schrödinger's Cat</TabsTrigger>
            <TabsTrigger value="bitcoin">Bitcoin Integration</TabsTrigger>
            <TabsTrigger value="ordinals">Quantum Ordinals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="schrodinger">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Schrödinger's Cat Experiment</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  In 1935, Erwin Schrödinger proposed a thought experiment where a cat in a box exists 
                  in a superposition of states (both alive and dead) until observed. This paradox illustrates 
                  quantum mechanics' principle that quantum systems exist in multiple states simultaneously 
                  until measured.
                </p>
                
                <div className="p-4 bg-muted rounded-md mb-4">
                  <h4 className="font-medium mb-2">Quantum Properties</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Quantum Coherence</span>
                        <span>{coherence}%</span>
                      </div>
                      <Progress value={coherence} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Collapse Probability</span>
                        <span>{collapseChance}%</span>
                      </div>
                      <Progress value={collapseChance} className="bg-secondary/20" />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Quantum State:</span>
                      <Badge variant={
                        catState === 'superposition' ? 'outline' : 
                        catState === 'observed' ? 'secondary' : 'destructive'
                      }>
                        {catState === 'superposition' ? 'Superposition' : 
                         catState === 'observed' ? 'Observed' : 'Collapsed'}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-3">
                  <Button variant="outline" onClick={resetExperiment}
                    disabled={catState === 'superposition'}>
                    Reset Experiment
                  </Button>
                  <Button onClick={observeCat} 
                    disabled={catState === 'collapsed'}>
                    Observe Cat
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden relative">
                {catState === 'superposition' ? (
                  <div className="h-full flex items-center justify-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4">
                    <div className="text-center">
                      <div className="text-6xl mb-4 animate-pulse">🐱❓</div>
                      <p className="text-muted-foreground">
                        The cat exists in superposition - both alive and dead simultaneously
                      </p>
                    </div>
                  </div>
                ) : catState === 'observed' ? (
                  <div className="h-full flex items-center justify-center bg-gradient-to-r from-green-500/20 to-blue-500/20 p-4">
                    <div className="text-center">
                      <div className="text-6xl mb-4">😺</div>
                      <p className="text-muted-foreground">
                        Observation has revealed the cat's state - it's alive!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center bg-gradient-to-r from-red-500/20 to-orange-500/20 p-4">
                    <div className="text-center">
                      <div className="text-6xl mb-4">😿</div>
                      <p className="text-muted-foreground">
                        The quantum state has collapsed - wave function reduced
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bitcoin">
            <div className="space-y-6">
              <div className="p-4 bg-muted rounded-md">
                <h3 className="text-lg font-medium mb-2">Bitcoin and Quantum Mechanics</h3>
                <p className="text-sm text-muted-foreground">
                  We integrate quantum principles with Bitcoin through specially selected satoshis based on 
                  high-entropy blocks. These "quantum satoshis" contain ordinals with unique properties that 
                  only manifest when observed (i.e., when transferred or viewed in a marketplace).
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2 flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary/20 mr-2">
                      <i className="fas fa-cube text-secondary"></i>
                    </div>
                    Quantum Block Selection
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We identify Bitcoin blocks with unusually high entropy, mined during periods of 
                    extraordinary price volatility, creating natural quantum uncertainty.
                  </p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2 flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary/20 mr-2">
                      <i className="fas fa-random text-secondary"></i>
                    </div>
                    Satoshi Entanglement
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Special satoshis are selected and entangled with each other, creating quantum correlations
                    that influence rarity and attributes upon observation.
                  </p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2 flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary/20 mr-2">
                      <i className="fas fa-eye text-secondary"></i>
                    </div>
                    Observer Effect
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    When a user views an ordinal in the marketplace, this observation collapses its quantum state,
                    determining its final rarity and attributes.
                  </p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2 flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary/20 mr-2">
                      <i className="fas fa-wave-square text-secondary"></i>
                    </div>
                    Quantum Decoherence
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    The longer an ordinal remains unobserved, the higher its quantum coherence and potential 
                    value, mimicking quantum system isolation.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ordinals">
            <div className="space-y-6">
              <div className="p-4 bg-muted rounded-md">
                <h3 className="text-lg font-medium mb-2">Quantum Cat Ordinals</h3>
                <p className="text-sm text-muted-foreground">
                  Our 3,333 Cat Ordinals implement Schrödinger's thought experiment directly on Bitcoin.
                  Each ordinal exists in multiple potential states until observed, with attributes determined
                  by the quantum collapse of the Bitcoin block data.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:border-secondary transition-colors overflow-hidden">
                      <div className="aspect-square overflow-hidden relative">
                        <img 
                          src="https://i.pravatar.cc/300?img=1" 
                          alt="Cat Ordinal" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                          <div className="w-full">
                            <Badge className="mb-1" variant="secondary">Unobserved</Badge>
                            <h4 className="text-white font-medium">Schrödinger's Cat #042</h4>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md p-0">
                    <img 
                      src="https://i.pravatar.cc/300?img=1" 
                      alt="Cat Ordinal Full" 
                      className="w-full h-auto"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-2">Schrödinger's Cat #042</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        This quantum ordinal exists in multiple states simultaneously. 
                        Viewing it has now collapsed its wave function, revealing its true form.
                      </p>
                      <div className="flex justify-between items-center">
                        <div>
                          <Badge variant="outline">
                            <i className="fas fa-cube mr-1"></i> Block 790213
                          </Badge>
                        </div>
                        <span className="font-mono">7.5 BTC</span>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-4">Technical Implementation</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-medium mb-1">Quantum Data Source</div>
                      <p className="text-muted-foreground">
                        Bitcoin block hash entropy during market volatility points
                      </p>
                    </div>
                    <div>
                      <div className="font-medium mb-1">Collapse Mechanism</div>
                      <p className="text-muted-foreground">
                        Visualization in the marketplace triggers attribute crystallization
                      </p>
                    </div>
                    <div>
                      <div className="font-medium mb-1">Rarity Distribution</div>
                      <p className="text-muted-foreground">
                        Follows quantum probability distribution rather than linear rarity
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Cat State Matrix</h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="py-2">State</th>
                        <th className="py-2">Probability</th>
                        <th className="py-2">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Common</td>
                        <td className="py-2">60%</td>
                        <td className="py-2">0.2-0.5 BTC</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Rare</td>
                        <td className="py-2">30%</td>
                        <td className="py-2">1-2 BTC</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Epic</td>
                        <td className="py-2">8%</td>
                        <td className="py-2">2-5 BTC</td>
                      </tr>
                      <tr>
                        <td className="py-2">Legendary</td>
                        <td className="py-2">2%</td>
                        <td className="py-2">5-10 BTC</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}