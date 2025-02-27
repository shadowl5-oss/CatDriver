import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bitcoin, Binary, Atom, Cpu, HardDrive, GitBranch, Zap, Cat, RefreshCw, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import SimpleAsciiArt from '@/components/SimpleAsciiArt';

// Predefined cat variants for the demo (50 variants)
const CAT_VARIANTS = [
  // Original 10 variants
  { id: 1, name: "Quantum Tabby", rarity: "Legendary", description: "Born from a block with over 2,000 transactions", btcPrice: 64289.33, blockHeight: 830142 },
  { id: 2, name: "Schrödinger Sphinx", rarity: "Epic", description: "Manifested during a major price reversal", btcPrice: 61472.18, blockHeight: 831025 },
  { id: 3, name: "Entropy Siamese", rarity: "Rare", description: "Created during Bitcoin's most volatile hour", btcPrice: 63844.91, blockHeight: 829876 },
  { id: 4, name: "Consensus Calico", rarity: "Epic", description: "Merged from 4 conflicting chains", btcPrice: 62103.45, blockHeight: 830998 },
  { id: 5, name: "Hash Persian", rarity: "Rare", description: "Inscribed with the entropy of a difficulty adjustment", btcPrice: 63257.77, blockHeight: 830501 },
  { id: 6, name: "Merkle Maine Coon", rarity: "Common", description: "Generated from the Merkle root of a lightning channel", btcPrice: 62893.21, blockHeight: 829654 },
  { id: 7, name: "Satoshi Scottish Fold", rarity: "Legendary", description: "Contains fragments of the genesis block", btcPrice: 65021.08, blockHeight: 829777 },
  { id: 8, name: "Block Russian Blue", rarity: "Common", description: "Materialized at exactly 630,000 blocks", btcPrice: 61876.33, blockHeight: 830333 },
  { id: 9, name: "UTXO Bombay", rarity: "Rare", description: "Formed from unspent Bitcoin dust", btcPrice: 62450.92, blockHeight: 830841 },
  { id: 10, name: "Lightning Lynx", rarity: "Epic", description: "Captured during a 1000+ channel formation event", btcPrice: 64102.67, blockHeight: 831145 },
  
  // Quantum-themed cats (10 variants)
  { id: 11, name: "Superposition Sphynx", rarity: "Legendary", description: "Exists in multiple quantum states simultaneously", btcPrice: 65432.10, blockHeight: 831246 },
  { id: 12, name: "Entangled Exotic", rarity: "Epic", description: "Quantum-linked with a cat on another blockchain", btcPrice: 62789.45, blockHeight: 830022 },
  { id: 13, name: "Wave Function Fold", rarity: "Rare", description: "Collapses into definite state only when observed", btcPrice: 63541.98, blockHeight: 830789 },
  { id: 14, name: "Quantum Leap Korat", rarity: "Legendary", description: "Can traverse across blocks instantaneously", btcPrice: 64890.12, blockHeight: 831387 },
  { id: 15, name: "Probability Pixiebob", rarity: "Common", description: "Trait probabilities shift with market volatility", btcPrice: 61234.56, blockHeight: 829912 },
  { id: 16, name: "Uncertainty Principle Ocicat", rarity: "Epic", description: "Position and momentum can't be precisely measured", btcPrice: 63901.23, blockHeight: 830456 },
  { id: 17, name: "Coherence Chartreux", rarity: "Rare", description: "Maintains quantum coherence for extended periods", btcPrice: 62345.67, blockHeight: 831199 },
  { id: 18, name: "Decoherence Devon Rex", rarity: "Common", description: "Gradually transitions from quantum to classical", btcPrice: 61789.34, blockHeight: 830677 },
  { id: 19, name: "Tunneling Tonkinese", rarity: "Epic", description: "Can tunnel through blockchain barriers", btcPrice: 64210.98, blockHeight: 831002 },
  { id: 20, name: "Observer Effect Oriental", rarity: "Rare", description: "Changes properties when transaction is verified", btcPrice: 63456.78, blockHeight: 830234 },
  
  // Bitcoin-themed cats (10 variants)
  { id: 21, name: "Genesis Block Burmese", rarity: "Legendary", description: "Contains data from the original Genesis block", btcPrice: 65876.54, blockHeight: 829501 },
  { id: 22, name: "Halving Havana", rarity: "Epic", description: "Born during a Bitcoin halving event", btcPrice: 63214.75, blockHeight: 830123 },
  { id: 23, name: "Difficulty Adjustment Donskoy", rarity: "Rare", description: "Adapts to mining difficulty changes", btcPrice: 62654.32, blockHeight: 830890 },
  { id: 24, name: "Blockchain Balinese", rarity: "Common", description: "Incorporates full block headers in its pattern", btcPrice: 61432.56, blockHeight: 831321 },
  { id: 25, name: "Mempool Manx", rarity: "Epic", description: "Collects and displays pending transactions", btcPrice: 64325.67, blockHeight: 830567 },
  { id: 26, name: "Satoshi Singapura", rarity: "Legendary", description: "Rumored to belong to Satoshi Nakamoto", btcPrice: 65987.43, blockHeight: 829876 },
  { id: 27, name: "Mining Munchkin", rarity: "Common", description: "Continuously mines microscopic amounts of BTC", btcPrice: 61567.89, blockHeight: 830432 },
  { id: 28, name: "Hash Rate Himalayan", rarity: "Rare", description: "Power scales with network hash rate", btcPrice: 63123.45, blockHeight: 831111 },
  { id: 29, name: "HODL Highland", rarity: "Epic", description: "Increases in value the longer it's held", btcPrice: 64765.43, blockHeight: 830321 },
  { id: 30, name: "Consensus Cornish Rex", rarity: "Common", description: "Only visible when network consensus is achieved", btcPrice: 61098.76, blockHeight: 830777 },
  
  // Cypherpunk-themed cats (10 variants)
  { id: 31, name: "Encryption Egyptian", rarity: "Legendary", description: "Self-encrypts using elliptic curve cryptography", btcPrice: 65432.10, blockHeight: 831246 },
  { id: 32, name: "Privacy Peterbald", rarity: "Epic", description: "Leaves no on-chain transaction traces", btcPrice: 62908.54, blockHeight: 830876 },
  { id: 33, name: "Decentralized Don Sphynx", rarity: "Rare", description: "Cannot be controlled by any single entity", btcPrice: 63217.65, blockHeight: 829912 },
  { id: 34, name: "Trustless Turkish Angora", rarity: "Common", description: "Requires no trusted third parties", btcPrice: 61789.32, blockHeight: 830654 },
  { id: 35, name: "Libertarian LaPerm", rarity: "Epic", description: "Free from regulatory constraints", btcPrice: 64325.87, blockHeight: 831098 },
  { id: 36, name: "Anonymous Abyssinian", rarity: "Legendary", description: "Identity remains permanently unknown", btcPrice: 65876.54, blockHeight: 830432 },
  { id: 37, name: "Censorship-Resistant Chausie", rarity: "Rare", description: "Cannot be removed from the blockchain", btcPrice: 63456.78, blockHeight: 830111 },
  { id: 38, name: "Sovereign Savannah", rarity: "Common", description: "Self-sovereign and answers to no authority", btcPrice: 61234.56, blockHeight: 831321 },
  { id: 39, name: "Cryptographic Curl", rarity: "Epic", description: "Uses advanced hash functions for security", btcPrice: 64109.87, blockHeight: 830765 },
  { id: 40, name: "Peer-to-Peer Persian", rarity: "Rare", description: "Transfers directly between wallets", btcPrice: 63210.98, blockHeight: 831002 },
  
  // Experimental cats (10 variants)
  { id: 41, name: "Multiverse Munchkin", rarity: "Legendary", description: "Exists across multiple blockchain universes", btcPrice: 65678.90, blockHeight: 831456 },
  { id: 42, name: "Temporal Anomaly Toyger", rarity: "Epic", description: "Timestamp occasionally shows future dates", btcPrice: 62345.67, blockHeight: 830321 },
  { id: 43, name: "Zero-Knowledge Zebra Cat", rarity: "Rare", description: "Proves ownership without revealing identity", btcPrice: 63789.12, blockHeight: 830654 },
  { id: 44, name: "Recursive Russian Blue", rarity: "Common", description: "Contains a smaller version of itself", btcPrice: 61456.78, blockHeight: 831098 },
  { id: 45, name: "Paradox Pixie-Bob", rarity: "Epic", description: "Both exists and doesn't exist simultaneously", btcPrice: 64321.09, blockHeight: 830543 },
  { id: 46, name: "Fractal Feline", rarity: "Legendary", description: "Pattern repeats at infinite scales", btcPrice: 65890.12, blockHeight: 830987 },
  { id: 47, name: "Quantum Noise Nebelung", rarity: "Rare", description: "Visualizes quantum randomness in real-time", btcPrice: 63210.98, blockHeight: 831234 },
  { id: 48, name: "Chaotic Curl Pattern", rarity: "Common", description: "Pattern evolves via deterministic chaos", btcPrice: 61678.90, blockHeight: 830876 },
  { id: 49, name: "Hyperdimensional Highlander", rarity: "Epic", description: "Extends into dimensions beyond blockchain", btcPrice: 64789.01, blockHeight: 830321 },
  { id: 50, name: "Cosmic Rays Chantilly", rarity: "Rare", description: "Mutates based on cosmic ray activity", btcPrice: 63456.78, blockHeight: 831111 }
];

// Color schemes for different rarity levels
const RARITY_COLORS = {
  Legendary: { primary: '#FFD700', secondary: '#FFA500', accent: '#FF4500' },
  Epic: { primary: '#9370DB', secondary: '#8A2BE2', accent: '#4B0082' },
  Rare: { primary: '#1E90FF', secondary: '#00BFFF', accent: '#0000CD' },
  Common: { primary: '#32CD32', secondary: '#008000', accent: '#006400' },
};

// Bitcoin block data simulator for visualization
const generateBlockData = (height: number) => {
  const seed = height % 100;
  return {
    height,
    hash: `000000000000000000${Math.floor(Math.random() * 1000000000000).toString(16)}`,
    transactions: 1000 + (seed * 20),
    size: 1.2 + (seed * 0.01),
    weight: 3.8 + (seed * 0.02),
    fee: 0.12 + (seed * 0.001)
  };
};

// Quantum data simulator for visualization
const generateQuantumStates = () => {
  return {
    superposition: Math.random(),
    entanglement: Math.random(),
    observation: Math.random() > 0.5,
    collapse: Math.random() > 0.7,
    coherence: Math.random() * 100
  };
};

interface OrdinalBuilderProps {
  onComplete?: (ordinal: any) => void;
}

export default function OrdinalBuilder({ onComplete }: OrdinalBuilderProps) {
  const [step, setStep] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(CAT_VARIANTS[0]);
  const [progress, setProgress] = useState(0);
  const [blockData, setBlockData] = useState<any>(null);
  const [quantumState, setQuantumState] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTab, setCurrentTab] = useState('block');
  const [entropyLevel, setEntropyLevel] = useState(50);
  const [selectedVariantType, setSelectedVariantType] = useState<'all' | 'quantum' | 'bitcoin' | 'cypherpunk' | 'experimental'>('all');
  
  // Filter variants by type
  const filteredVariants = CAT_VARIANTS.filter(variant => {
    if (selectedVariantType === 'all') return true;
    if (selectedVariantType === 'quantum' && variant.id >= 11 && variant.id <= 20) return true;
    if (selectedVariantType === 'bitcoin' && variant.id >= 21 && variant.id <= 30) return true;
    if (selectedVariantType === 'cypherpunk' && variant.id >= 31 && variant.id <= 40) return true;
    if (selectedVariantType === 'experimental' && variant.id >= 41 && variant.id <= 50) return true;
    return false;
  });

  // Simulation of the ordinal creation process
  const runOrdinalCreation = () => {
    setIsProcessing(true);
    setProgress(0);
    setIsComplete(false);
    setImageData(null);
    
    // Simulate Bitcoin block data fetching
    setTimeout(() => {
      setBlockData(generateBlockData(selectedVariant.blockHeight));
      setProgress(30);
      
      // Simulate quantum calculations
      setTimeout(() => {
        setQuantumState(generateQuantumStates());
        setProgress(60);
        
        // Simulate ordinal inscription
        setTimeout(() => {
          setProgress(85);
          
          // Simulate image generation
          setTimeout(() => {
            generateCatOrdinalImage();
            setProgress(100);
            setIsProcessing(false);
            setIsComplete(true);
          }, 1500);
        }, 1200);
      }, 1500);
    }, 1000);
  };
  
  // Reset the builder
  const resetBuilder = () => {
    setStep(0);
    setProgress(0);
    setBlockData(null);
    setQuantumState(null);
    setIsComplete(false);
    setImageData(null);
  };
  
  // Handle completion
  const handleComplete = () => {
    if (onComplete && imageData) {
      onComplete({
        ...selectedVariant,
        image: imageData,
        quantumState,
        blockData
      });
    }
    resetBuilder();
  };
  
  // Generate a visual representation of the cat ordinal
  const generateCatOrdinalImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background based on rarity
    const colors = RARITY_COLORS[selectedVariant.rarity as keyof typeof RARITY_COLORS];
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, colors.primary);
    gradient.addColorStop(0.5, colors.secondary);
    gradient.addColorStop(1, colors.accent);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw cat silhouette
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.beginPath();
    
    // Head
    ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2);
    
    // Ears
    ctx.moveTo(canvas.width / 2 - 80, canvas.height / 2 - 60);
    ctx.lineTo(canvas.width / 2 - 120, canvas.height / 2 - 120);
    ctx.lineTo(canvas.width / 2 - 40, canvas.height / 2 - 40);
    
    ctx.moveTo(canvas.width / 2 + 80, canvas.height / 2 - 60);
    ctx.lineTo(canvas.width / 2 + 120, canvas.height / 2 - 120);
    ctx.lineTo(canvas.width / 2 + 40, canvas.height / 2 - 40);
    
    ctx.fill();
    
    // Draw eyes
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.arc(canvas.width / 2 - 30, canvas.height / 2 - 10, 15, 0, Math.PI * 2);
    ctx.arc(canvas.width / 2 + 30, canvas.height / 2 - 10, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw pupils based on quantum state
    const pupilSize = quantumState ? (quantumState.observation ? 7 : 3) : 5;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.beginPath();
    ctx.arc(canvas.width / 2 - 30, canvas.height / 2 - 10, pupilSize, 0, Math.PI * 2);
    ctx.arc(canvas.width / 2 + 30, canvas.height / 2 - 10, pupilSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Add block data as binary pattern in background
    if (blockData) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      const hash = blockData.hash;
      for (let i = 0; i < hash.length; i++) {
        const x = (i % 20) * 20;
        const y = Math.floor(i / 20) * 8 + 10;
        const bit = parseInt(hash[i], 16) % 2;
        if (bit === 1) {
          ctx.fillRect(x, y, 15, 5);
        }
      }
    }
    
    // Add quantum wave patterns
    if (quantumState) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let x = 0; x < canvas.width; x += 20) {
        const amplitude = 20 + (quantumState.superposition * 30);
        const frequency = 0.02 + (quantumState.entanglement * 0.01);
        const y = (canvas.height - 40) + Math.sin(x * frequency) * amplitude;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
    }
    
    // Add rarity label
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(10, 10, 150, 30);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(selectedVariant.rarity, 20, 30);
    
    // Add block height
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(canvas.width - 160, 10, 150, 30);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(`Block: ${selectedVariant.blockHeight}`, canvas.width - 150, 30);
    
    // Add a name at the bottom
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(canvas.width / 2 - 100, canvas.height - 40, 200, 30);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(selectedVariant.name, canvas.width / 2, canvas.height - 20);
    
    // Convert canvas to image data URL
    setImageData(canvas.toDataURL('image/png'));
  };
  
  // Update entropy and regenerate
  useEffect(() => {
    if (isComplete && canvasRef.current) {
      generateCatOrdinalImage();
    }
  }, [entropyLevel]);
  
  return (
    <div className={`relative ${isExpanded ? 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm' : 'w-full'}`}>
      <Card className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl h-[80vh]' : 'w-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 flex justify-between items-center border-b">
            <div className="flex items-center gap-2">
              <Atom className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Quantum Cat Ordinal Builder</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <span className="text-xl">×</span> : <span className="text-xl">⤢</span>}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 flex-1 overflow-hidden">
            {/* Visualization Side */}
            <div className="flex flex-col h-full border-r">
              <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-black p-4">
                {isComplete ? (
                  <div className="relative flex items-center justify-center rounded-md overflow-hidden">
                    <SimpleAsciiArt 
                      type={selectedVariant.id % 4 === 0 ? "quantum" : 
                            selectedVariant.id % 4 === 1 ? "bitcoin" : 
                            selectedVariant.id % 4 === 2 ? "cypherpunk" : "schrodinger"}
                      width={400}
                      height={400}
                      showBorder={true}
                    />
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                      <span className="px-2 py-1 bg-black/70 text-white text-sm rounded">
                        {selectedVariant.name} • Block: {selectedVariant.blockHeight}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        selectedVariant.rarity === 'Legendary' ? 'bg-amber-700/80 text-amber-100' :
                        selectedVariant.rarity === 'Epic' ? 'bg-purple-700/80 text-purple-100' :
                        selectedVariant.rarity === 'Rare' ? 'bg-blue-700/80 text-blue-100' :
                        'bg-green-700/80 text-green-100'
                      }`}>
                        {selectedVariant.rarity}
                      </span>
                    </div>
                  </div>
                ) : (
                  <canvas 
                    ref={canvasRef} 
                    width={400} 
                    height={400} 
                    className="max-w-full max-h-full object-contain rounded-md shadow-lg hidden"
                  />
                )}
                
                {!imageData && !isProcessing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white p-6 text-center">
                    <Cat className="h-16 w-16 mb-4 text-primary animate-pulse" />
                    <h3 className="text-xl font-bold mb-2">Quantum Cat Ordinal Generator</h3>
                    <p className="mb-6 text-sm opacity-80">Select from 50 unique cat variants and generate a high-quality ASCII art ordinal using Bitcoin blockchain data and quantum principles.</p>
                    <Button 
                      onClick={() => runOrdinalCreation()}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Generate Cat Ordinal
                    </Button>
                  </div>
                )}
                
                {isProcessing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white">
                    <div className="text-center mb-8">
                      <h3 className="text-xl font-bold mb-2">Creating Cat Ordinal</h3>
                      <p className="text-sm opacity-70">Extracting blockchain data and quantum states...</p>
                    </div>
                    
                    <div className="w-64 flex flex-col gap-8">
                      <Progress value={progress} className="h-2" />
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Bitcoin className={`h-5 w-5 ${progress >= 20 ? 'text-primary' : 'text-muted'}`} />
                          <span className={progress >= 20 ? 'text-primary' : 'text-muted'}>Fetching Block #{selectedVariant.blockHeight}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Binary className={`h-5 w-5 ${progress >= 40 ? 'text-primary' : 'text-muted'}`} />
                          <span className={progress >= 40 ? 'text-primary' : 'text-muted'}>Calculating entropy</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Atom className={`h-5 w-5 ${progress >= 60 ? 'text-primary' : 'text-muted'}`} />
                          <span className={progress >= 60 ? 'text-primary' : 'text-muted'}>Computing quantum states</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <GitBranch className={`h-5 w-5 ${progress >= 85 ? 'text-primary' : 'text-muted'}`} />
                          <span className={progress >= 85 ? 'text-primary' : 'text-muted'}>Generating ordinal inscription</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-12">
                      <p className="animate-pulse text-xs opacity-70">Please wait as we access the quantum realm...</p>
                    </div>
                  </div>
                )}
              </div>
              
              {isComplete && (
                <div className="p-4 border-t bg-muted/30">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium">{selectedVariant.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedVariant.description}</p>
                    
                    <div className="flex gap-4 mt-2">
                      <div>
                        <span className="text-xs text-muted-foreground">Rarity</span>
                        <p className="font-medium">{selectedVariant.rarity}</p>
                      </div>
                      
                      <div>
                        <span className="text-xs text-muted-foreground">Block Height</span>
                        <p className="font-medium">{selectedVariant.blockHeight}</p>
                      </div>
                      
                      <div>
                        <span className="text-xs text-muted-foreground">BTC Price</span>
                        <p className="font-medium">${selectedVariant.btcPrice.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <label className="text-xs text-muted-foreground">Entropy Level</label>
                      <Slider
                        value={[entropyLevel]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => setEntropyLevel(value[0])}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Controls Side */}
            <div className="flex flex-col h-full overflow-y-auto">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Select Cat Variant</h3>
                  <div className="flex items-center gap-1">
                    <Shuffle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">50 Variants</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mb-4 flex-wrap">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setSelectedVariant(CAT_VARIANTS[Math.floor(Math.random() * CAT_VARIANTS.length)])}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Random
                  </Button>
                  <Button 
                    variant={selectedVariantType === "all" ? "default" : "outline"} 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setSelectedVariantType("all")}
                  >
                    All Types
                  </Button>
                  <Button 
                    variant={selectedVariantType === "quantum" ? "default" : "outline"} 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setSelectedVariantType("quantum")}
                  >
                    Quantum
                  </Button>
                  <Button 
                    variant={selectedVariantType === "bitcoin" ? "default" : "outline"} 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setSelectedVariantType("bitcoin")}
                  >
                    Bitcoin
                  </Button>
                  <Button 
                    variant={selectedVariantType === "cypherpunk" ? "default" : "outline"} 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setSelectedVariantType("cypherpunk")}
                  >
                    Cypherpunk
                  </Button>
                  <Button 
                    variant={selectedVariantType === "experimental" ? "default" : "outline"} 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setSelectedVariantType("experimental")}
                  >
                    Experimental
                  </Button>
                </div>
                
                <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
                  {filteredVariants.map((variant) => (
                    <div
                      key={variant.id}
                      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors 
                        ${selectedVariant.id === variant.id 
                          ? 'bg-primary/10 border border-primary/30' 
                          : 'hover:bg-muted'}`}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, 
                            ${RARITY_COLORS[variant.rarity as keyof typeof RARITY_COLORS].primary}, 
                            ${RARITY_COLORS[variant.rarity as keyof typeof RARITY_COLORS].secondary})` 
                        }}
                      >
                        <Cat className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{variant.name}</div>
                        <div className="text-xs text-muted-foreground">Block {variant.blockHeight}</div>
                      </div>
                      
                      <div className="ml-auto">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          variant.rarity === 'Legendary' ? 'bg-amber-100 text-amber-800' :
                          variant.rarity === 'Epic' ? 'bg-purple-100 text-purple-800' :
                          variant.rarity === 'Rare' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {variant.rarity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-1">
                {isComplete && blockData && quantumState && (
                  <div className="p-4">
                    <Tabs value={currentTab} onValueChange={setCurrentTab}>
                      <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="block">
                          <Bitcoin className="h-4 w-4 mr-2" />
                          Block Data
                        </TabsTrigger>
                        <TabsTrigger value="quantum">
                          <Atom className="h-4 w-4 mr-2" />
                          Quantum States
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="block" className="p-2 space-y-4">
                        <div>
                          <span className="text-xs text-muted-foreground">Block Height</span>
                          <p className="font-medium">{blockData.height}</p>
                        </div>
                        
                        <div>
                          <span className="text-xs text-muted-foreground">Block Hash</span>
                          <p className="font-mono text-xs truncate bg-muted p-2 rounded">{blockData.hash}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-xs text-muted-foreground">Transactions</span>
                            <p className="font-medium">{blockData.transactions.toLocaleString()}</p>
                          </div>
                          
                          <div>
                            <span className="text-xs text-muted-foreground">Size</span>
                            <p className="font-medium">{blockData.size.toFixed(2)} MB</p>
                          </div>
                          
                          <div>
                            <span className="text-xs text-muted-foreground">Weight</span>
                            <p className="font-medium">{blockData.weight.toFixed(2)} MWU</p>
                          </div>
                          
                          <div>
                            <span className="text-xs text-muted-foreground">Fee</span>
                            <p className="font-medium">{blockData.fee.toFixed(3)} BTC</p>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-xs text-muted-foreground">Inscription Process</span>
                          <p className="text-sm mt-1">
                            This ordinal was inscribed using data from block {blockData.height},
                            which contained {blockData.transactions.toLocaleString()} transactions.
                            The block's unique characteristics were used to influence the cat's appearance and properties.
                          </p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="quantum" className="p-2 space-y-4">
                        <div>
                          <span className="text-xs text-muted-foreground">Quantum Superposition</span>
                          <Progress value={quantumState.superposition * 100} className="h-2 mt-1" />
                          <p className="text-xs mt-1 text-muted-foreground">
                            {quantumState.superposition > 0.7 
                              ? 'High superposition state - exists in multiple states simultaneously' 
                              : 'Low superposition state - approaching classical behavior'}
                          </p>
                        </div>
                        
                        <div>
                          <span className="text-xs text-muted-foreground">Quantum Entanglement</span>
                          <Progress value={quantumState.entanglement * 100} className="h-2 mt-1" />
                          <p className="text-xs mt-1 text-muted-foreground">
                            {quantumState.entanglement > 0.6 
                              ? 'Strongly entangled with other cat ordinals' 
                              : 'Minimal entanglement with other ordinals'}
                          </p>
                        </div>
                        
                        <div>
                          <span className="text-xs text-muted-foreground">Quantum Observation State</span>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`w-3 h-3 rounded-full ${quantumState.observation ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span>{quantumState.observation ? 'Observed' : 'Unobserved'}</span>
                          </div>
                          <p className="text-xs mt-1 text-muted-foreground">
                            {quantumState.observation 
                              ? 'This cat has been observed and has collapsed into a definite state' 
                              : 'This cat remains in an indeterminate state until observed by a buyer'}
                          </p>
                        </div>
                        
                        <div>
                          <span className="text-xs text-muted-foreground">Quantum Coherence</span>
                          <Progress value={quantumState.coherence} className="h-2 mt-1" />
                          <p className="text-xs mt-1 text-muted-foreground">
                            {quantumState.coherence > 70 
                              ? 'High coherence - quantum properties remain stable for longer' 
                              : 'Low coherence - quantum properties decay rapidly'}
                          </p>
                        </div>
                        
                        <div>
                          <span className="text-xs text-muted-foreground">Schrödinger State</span>
                          <p className="text-sm mt-1">
                            Inspired by Schrödinger's famous thought experiment, this cat ordinal exists in a
                            {quantumState.observation 
                              ? ' collapsed quantum state, with defined properties' 
                              : ' superposition of states - both alive and not-alive simultaneously'}. 
                            Its properties fluctuate with Bitcoin's price movements.
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t mt-auto">
                {!isComplete ? (
                  <Button 
                    onClick={() => runOrdinalCreation()}
                    className="w-full" 
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Generate Cat Ordinal'}
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={resetBuilder}>
                      Start Over
                    </Button>
                    <Button className="flex-1" onClick={handleComplete}>
                      Get This Ordinal
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}