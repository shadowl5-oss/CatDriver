import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import OrdinalBuilder from "@/components/OrdinalBuilder";
import SimpleAsciiArt from "@/components/SimpleAsciiArt";
import { enrichCatNftWithOrdinalData } from "@/services/blockchain";
import { Link } from "wouter";
import { ArrowLeft, Database, Atom, Download, ListFilter, Braces, Save, Webhook } from "lucide-react";

// Define a structure for an ordinal batch generation process
interface GenerationProcess {
  batchSize: number;
  batchesCompleted: number;
  totalBatches: number;
  currentBatch: number[];
  progress: number;
  isRunning: boolean;
  isPaused: boolean;
  startTime: number | null;
  endTime: number | null;
  estimatedTimeRemaining: number | null;
  failed: number;
  success: number;
}

// Trait types to generate variety
type TraitSet = "quantum" | "bitcoin" | "cypherpunk" | "schrodinger" | "experimental";
interface GenerationOptions {
  traitSets: TraitSet[];
  includeLegendary: boolean;
  includeEpic: boolean;
  includeRare: boolean;
  includeCommon: boolean;
  baseEntropyLevel: number; // 0-100
  useHistoricalData: boolean;
}

export default function OrdinalGenerator() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("single");
  const [generationProcess, setGenerationProcess] = useState<GenerationProcess>({
    batchSize: 50,
    batchesCompleted: 0,
    totalBatches: 67, // 3333 ÷ 50 = 66.66
    currentBatch: [],
    progress: 0,
    isRunning: false,
    isPaused: false,
    startTime: null,
    endTime: null,
    estimatedTimeRemaining: null,
    failed: 0,
    success: 0
  });
  
  const [options, setOptions] = useState<GenerationOptions>({
    traitSets: ["quantum", "bitcoin", "cypherpunk", "schrodinger", "experimental"],
    includeLegendary: true,
    includeEpic: true,
    includeRare: true,
    includeCommon: true,
    baseEntropyLevel: 50,
    useHistoricalData: true
  });
  
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState(false);
  const [ownerPassword, setOwnerPassword] = useState("");
  const [generatedPreview, setGeneratedPreview] = useState<any[]>([]);
  
  // Fetch existing generated ordinals count
  const { data: existingOrdinalsCount, isLoading: isLoadingCount } = useQuery({
    queryKey: ['/api/cat-nfts/count'],
    enabled: isOwnerAuthenticated,
  });
  
  // Mutation for creating ordinals in batches
  const createOrdinalsBatchMutation = useMutation({
    mutationFn: async (ordinals: any[]) => {
      const response = await apiRequest("POST", "/api/cat-nfts/batch", ordinals);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cat-nfts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/cat-nfts/count'] });
      
      // Update generation process
      setGenerationProcess(prev => ({
        ...prev,
        batchesCompleted: prev.batchesCompleted + 1,
        success: prev.success + prev.currentBatch.length,
        currentBatch: [],
        progress: Math.min(100, Math.round((prev.batchesCompleted + 1) * 100 / prev.totalBatches))
      }));
      
      // Show success toast
      toast({
        title: "Batch Generated",
        description: `Successfully created batch ${generationProcess.batchesCompleted + 1} of ${generationProcess.totalBatches}`,
      });
    },
    onError: (error) => {
      setGenerationProcess(prev => ({
        ...prev,
        failed: prev.failed + prev.currentBatch.length,
        isPaused: true,
      }));
      
      toast({
        title: "Generation Failed",
        description: `Failed to create batch: ${error.message}`,
        variant: "destructive",
      });
    }
  });
  
  // Define a function to generate a single example ordinal
  const generateExampleOrdinal = () => {
    const randomTraitSet = options.traitSets[Math.floor(Math.random() * options.traitSets.length)];
    const rarities = ["Common", "Rare", "Epic", "Legendary"];
    const enabledRarities = [
      options.includeCommon ? "Common" : null,
      options.includeRare ? "Rare" : null,
      options.includeEpic ? "Epic" : null,
      options.includeLegendary ? "Legendary" : null,
    ].filter(Boolean);
    
    const rarity = enabledRarities[Math.floor(Math.random() * enabledRarities.length)] || rarities[0];
    
    // Generate a new ordinal example with appropriate traits
    const blockHeight = 830000 + Math.floor(Math.random() * 5000);
    const ordinal = {
      id: generatedPreview.length + 1,
      name: `${randomTraitSet.charAt(0).toUpperCase() + randomTraitSet.slice(1)} Cat #${Math.floor(Math.random() * 9999)}`,
      rarity: rarity,
      type: randomTraitSet,
      image: "", // Will be generated as ASCII art
      price: rarity === "Legendary" ? 2 + Math.random() * 3 :
             rarity === "Epic" ? 1 + Math.random() * 1.5 :
             rarity === "Rare" ? 0.5 + Math.random() * 0.8 :
             0.1 + Math.random() * 0.4,
      tokenId: `${blockHeight}i${Math.floor(Math.random() * 1000)}`,
      ownerId: 1, // Default owner is the platform
      blockHeight: blockHeight,
      btcPrice: 60000 + Math.random() * 5000,
      description: `A unique ${randomTraitSet} cat ordinal created during Bitcoin block #${blockHeight}`,
      createdAt: new Date().toISOString(),
      quantumState: Math.random() > 0.5 ? "observed" : "unobserved",
      entropy: options.baseEntropyLevel + (Math.random() * 30 - 15)
    };
    
    return ordinal;
  };
  
  // Generate a batch of ordinals for preview
  const generatePreviewBatch = () => {
    const newBatch = Array.from({ length: 5 }, () => generateExampleOrdinal());
    setGeneratedPreview(newBatch);
  };
  
  // Verify owner access
  const verifyOwnerAccess = () => {
    if (ownerPassword === "catdao2025") {
      setIsOwnerAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "You are now authenticated as the owner.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };
  
  // Start batch generation process
  const startBatchGeneration = () => {
    // Check if we've already generated close to 3,333 ordinals
    if (existingOrdinalsCount && existingOrdinalsCount > 3300) {
      toast({
        title: "Generation Limit Reached",
        description: "You have already generated close to 3,333 ordinals",
        variant: "destructive",
      });
      return;
    }
    
    setGenerationProcess(prev => ({
      ...prev,
      isRunning: true,
      isPaused: false,
      startTime: Date.now(),
      endTime: null,
      estimatedTimeRemaining: null,
      currentBatch: [],
      progress: 0,
      batchesCompleted: 0,
      failed: 0,
      success: 0
    }));
    
    // Generate the first batch
    generateAndSaveBatch();
  };
  
  // Generate and save a batch of ordinals
  const generateAndSaveBatch = () => {
    if (!generationProcess.isRunning || generationProcess.isPaused) return;
    
    // Calculate how many ordinals are left to generate
    const totalToGenerate = 3333;
    const generated = existingOrdinalsCount || 0;
    const remaining = totalToGenerate - generated;
    
    // If we've generated all ordinals or more, stop
    if (remaining <= 0) {
      finishGeneration();
      toast({
        title: "Generation Complete",
        description: "All 3,333 ordinals have been generated!",
      });
      return;
    }
    
    // Generate batch
    const batchSize = Math.min(generationProcess.batchSize, remaining);
    const newBatch = Array.from({ length: batchSize }, () => generateExampleOrdinal());
    
    // Update state with current batch
    setGenerationProcess(prev => ({
      ...prev,
      currentBatch: newBatch
    }));
    
    // Save the batch
    createOrdinalsBatchMutation.mutate(newBatch);
    
    // Schedule next batch if not done
    if (generationProcess.batchesCompleted + 1 < generationProcess.totalBatches) {
      setTimeout(generateAndSaveBatch, 1000); // Delay between batches
    } else {
      finishGeneration();
    }
  };
  
  // Pause generation process
  const pauseGeneration = () => {
    setGenerationProcess(prev => ({
      ...prev,
      isPaused: true
    }));
    
    toast({
      title: "Generation Paused",
      description: "You can resume generation at any time.",
    });
  };
  
  // Resume generation process
  const resumeGeneration = () => {
    setGenerationProcess(prev => ({
      ...prev,
      isPaused: false
    }));
    
    toast({
      title: "Generation Resumed",
      description: "Continuing ordinal generation...",
    });
    
    generateAndSaveBatch();
  };
  
  // Finish generation process
  const finishGeneration = () => {
    setGenerationProcess(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      endTime: Date.now(),
      progress: 100
    }));
    
    toast({
      title: "Generation Complete",
      description: `Generated ${generationProcess.success} ordinals successfully with ${generationProcess.failed} failures.`,
    });
  };
  
  // Calculate estimated time remaining
  useEffect(() => {
    if (generationProcess.isRunning && !generationProcess.isPaused && generationProcess.startTime && generationProcess.batchesCompleted > 0) {
      const elapsedMs = Date.now() - generationProcess.startTime;
      const msPerBatch = elapsedMs / generationProcess.batchesCompleted;
      const batchesRemaining = generationProcess.totalBatches - generationProcess.batchesCompleted;
      const estimatedMsRemaining = msPerBatch * batchesRemaining;
      
      setGenerationProcess(prev => ({
        ...prev,
        estimatedTimeRemaining: estimatedMsRemaining
      }));
    }
  }, [generationProcess.batchesCompleted, generationProcess.isRunning, generationProcess.isPaused]);
  
  // Generate initial preview batch
  useEffect(() => {
    generatePreviewBatch();
  }, []);
  
  // Format time remaining
  const formatTimeRemaining = (ms: number | null) => {
    if (ms === null) return "Calculating...";
    
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m remaining`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s remaining`;
    } else {
      return `${seconds}s remaining`;
    }
  };
  
  // Handle single ordinal creation
  const handleSingleOrdinalComplete = (ordinal: any) => {
    toast({
      title: "Ordinal Created",
      description: `Successfully created: ${ordinal.name}`,
    });
    
    // Create the ordinal in the database
    apiRequest("POST", "/api/cat-nfts", ordinal)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['/api/cat-nfts'] });
        queryClient.invalidateQueries({ queryKey: ['/api/cat-nfts/count'] });
      })
      .catch(error => {
        toast({
          title: "Creation Failed",
          description: error.message,
          variant: "destructive",
        });
      });
  };
  
  return (
    <div className="px-4 py-6 md:px-8">
      {/* Header with navigation back */}
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Ordinal Generator</h1>
      </div>
      
      {/* Owner authentication */}
      {!isOwnerAuthenticated ? (
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Owner Authentication Required</CardTitle>
            <CardDescription>
              Only the owner of CatDAO can generate the 3,333 unique ordinals. Please authenticate.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="owner-password">Owner Password</Label>
              <Input 
                id="owner-password" 
                type="password" 
                placeholder="Enter owner password" 
                value={ownerPassword}
                onChange={(e) => setOwnerPassword(e.target.value)}
              />
            </div>
            <Button 
              className="w-full" 
              onClick={verifyOwnerAccess}
            >
              Authenticate
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Generator controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  Generation Stats
                  {isLoadingCount ? " (Loading...)" : `(${existingOrdinalsCount || 0}/3,333 Ordinals)`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>
                        {existingOrdinalsCount || 0} of 3,333 Ordinals 
                        ({Math.round(((existingOrdinalsCount || 0) / 3333) * 100)}%)
                      </span>
                    </div>
                    <Progress 
                      value={Math.round(((existingOrdinalsCount || 0) / 3333) * 100)} 
                      className="h-2" 
                    />
                  </div>
                  
                  {/* Batch generation controls */}
                  {generationProcess.isRunning ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Current Batch Progress</span>
                          <span>
                            {generationProcess.batchesCompleted} of {generationProcess.totalBatches} Batches 
                            ({generationProcess.progress}%)
                          </span>
                        </div>
                        <Progress value={generationProcess.progress} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">Successfully Generated</div>
                          <div className="text-2xl font-bold text-green-500">{generationProcess.success}</div>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">Failed Generation</div>
                          <div className="text-2xl font-bold text-red-500">{generationProcess.failed}</div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Estimated Time</div>
                        <div className="text-lg font-bold">
                          {formatTimeRemaining(generationProcess.estimatedTimeRemaining)}
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        {generationProcess.isPaused ? (
                          <Button className="flex-1" onClick={resumeGeneration}>
                            Resume Generation
                          </Button>
                        ) : (
                          <Button className="flex-1" variant="outline" onClick={pauseGeneration}>
                            Pause Generation
                          </Button>
                        )}
                        <Button className="flex-1" variant="destructive" onClick={finishGeneration}>
                          Stop Generation
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="batch-size">Batch Size</Label>
                          <Input 
                            id="batch-size" 
                            type="number" 
                            min="1" 
                            max="100" 
                            value={generationProcess.batchSize}
                            onChange={(e) => setGenerationProcess(prev => ({
                              ...prev,
                              batchSize: parseInt(e.target.value),
                              totalBatches: Math.ceil(3333 / parseInt(e.target.value))
                            }))}
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="entropy-level">Base Entropy Level</Label>
                          <div className="pt-2">
                            <Slider 
                              id="entropy-level"
                              value={[options.baseEntropyLevel]} 
                              min={0} 
                              max={100} 
                              step={1}
                              onValueChange={(value) => setOptions(prev => ({
                                ...prev,
                                baseEntropyLevel: value[0]
                              }))}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={startBatchGeneration}
                        disabled={isLoadingCount || (existingOrdinalsCount && existingOrdinalsCount >= 3333)}
                      >
                        <Database className="h-4 w-4 mr-2" />
                        {isLoadingCount ? "Loading..." : 
                          existingOrdinalsCount && existingOrdinalsCount >= 3333 
                            ? "All Ordinals Generated" 
                            : "Start Generating 3,333 Ordinals"}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Generation Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="trait-types">Trait Sets to Include</Label>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="quantum" 
                        checked={options.traitSets.includes("quantum")}
                        onCheckedChange={(checked) => setOptions(prev => ({
                          ...prev,
                          traitSets: checked 
                            ? [...prev.traitSets, "quantum"] 
                            : prev.traitSets.filter(set => set !== "quantum")
                        }))}
                      />
                      <Label htmlFor="quantum">Quantum</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="bitcoin" 
                        checked={options.traitSets.includes("bitcoin")}
                        onCheckedChange={(checked) => setOptions(prev => ({
                          ...prev,
                          traitSets: checked 
                            ? [...prev.traitSets, "bitcoin"] 
                            : prev.traitSets.filter(set => set !== "bitcoin")
                        }))}
                      />
                      <Label htmlFor="bitcoin">Bitcoin</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="cypherpunk" 
                        checked={options.traitSets.includes("cypherpunk")}
                        onCheckedChange={(checked) => setOptions(prev => ({
                          ...prev,
                          traitSets: checked 
                            ? [...prev.traitSets, "cypherpunk"] 
                            : prev.traitSets.filter(set => set !== "cypherpunk")
                        }))}
                      />
                      <Label htmlFor="cypherpunk">Cypherpunk</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="schrodinger" 
                        checked={options.traitSets.includes("schrodinger")}
                        onCheckedChange={(checked) => setOptions(prev => ({
                          ...prev,
                          traitSets: checked 
                            ? [...prev.traitSets, "schrodinger"] 
                            : prev.traitSets.filter(set => set !== "schrodinger")
                        }))}
                      />
                      <Label htmlFor="schrodinger">Schrodinger</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="experimental" 
                        checked={options.traitSets.includes("experimental")}
                        onCheckedChange={(checked) => setOptions(prev => ({
                          ...prev,
                          traitSets: checked 
                            ? [...prev.traitSets, "experimental"] 
                            : prev.traitSets.filter(set => set !== "experimental")
                        }))}
                      />
                      <Label htmlFor="experimental">Experimental</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="rarity-types">Rarity Distribution</Label>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="legendary" 
                        checked={options.includeLegendary}
                        onCheckedChange={(checked) => setOptions(prev => ({
                          ...prev,
                          includeLegendary: checked
                        }))}
                      />
                      <Label htmlFor="legendary">Legendary (10%)</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="epic" 
                        checked={options.includeEpic}
                        onCheckedChange={(checked) => setOptions(prev => ({
                          ...prev,
                          includeEpic: checked
                        }))}
                      />
                      <Label htmlFor="epic">Epic (20%)</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="rare" 
                        checked={options.includeRare}
                        onCheckedChange={(checked) => setOptions(prev => ({
                          ...prev,
                          includeRare: checked
                        }))}
                      />
                      <Label htmlFor="rare">Rare (30%)</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="common" 
                        checked={options.includeCommon}
                        onCheckedChange={(checked) => setOptions(prev => ({
                          ...prev,
                          includeCommon: checked
                        }))}
                      />
                      <Label htmlFor="common">Common (40%)</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="use-historical" 
                        checked={options.useHistoricalData}
                        onCheckedChange={(checked) => setOptions(prev => ({
                          ...prev,
                          useHistoricalData: checked
                        }))}
                      />
                      <Label htmlFor="use-historical">Use Historical Bitcoin Data</Label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      When enabled, ordinals will be linked to actual historical Bitcoin blocks and events.
                    </p>
                  </div>
                  
                  <Button variant="outline" className="w-full" onClick={generatePreviewBatch}>
                    <ListFilter className="h-4 w-4 mr-2" />
                    Generate New Examples
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Tabs for generator types */}
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="mb-8"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single">Generate Single Ordinal</TabsTrigger>
              <TabsTrigger value="batch">Batch Examples</TabsTrigger>
            </TabsList>
            
            <TabsContent value="single" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Manual Ordinal Creation</CardTitle>
                  <CardDescription>
                    Create a single ordinal with full control over the generation process.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <OrdinalBuilder onComplete={handleSingleOrdinalComplete} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="batch" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Example Ordinals</CardTitle>
                  <CardDescription>
                    Preview how ordinals will look with current settings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {generatedPreview.map((ordinal, index) => (
                      <div key={index} className="bg-muted rounded-lg overflow-hidden">
                        <div className="aspect-square bg-black flex items-center justify-center">
                          <SimpleAsciiArt 
                            type={ordinal.type} 
                            width={150} 
                            height={150}
                          />
                        </div>
                        <div className="p-3">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-sm font-semibold truncate">{ordinal.name}</h3>
                            <span className="text-xs bg-secondary/20 text-secondary px-1.5 py-0.5 rounded">
                              {ordinal.rarity}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">Block #{ordinal.blockHeight}</div>
                          <div className="mt-2 text-sm font-mono">{ordinal.price.toFixed(2)} BTC</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}