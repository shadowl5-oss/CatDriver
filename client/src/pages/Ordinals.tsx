import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CatLogo } from '@/components/CatLogo';
import OrdinalBuilder from '@/components/OrdinalBuilder';
import OrdinalVisualizer from '@/components/OrdinalVisualizer';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Cat, Bitcoin, BarChart3, Zap, Lock, ShoppingCart, TrendingUp, Star, Info, Search, Atom, Maximize2 } from 'lucide-react';

// Sample ordinals for the marketplace
const SAMPLE_ORDINALS = [
  {
    id: 1,
    name: "Quantum Tabby #042",
    rarity: "Legendary",
    price: 0.035,
    image: "https://i.pravatar.cc/300?img=1",
    isAvailable: true,
    blockHeight: 830142
  },
  {
    id: 2,
    name: "Schrödinger Sphinx #108",
    rarity: "Epic",
    price: 0.028,
    image: "https://i.pravatar.cc/300?img=2",
    isAvailable: true,
    blockHeight: 831025
  },
  {
    id: 3,
    name: "Entropy Siamese #291",
    rarity: "Rare",
    price: 0.015,
    image: "https://i.pravatar.cc/300?img=3",
    isAvailable: true,
    blockHeight: 829876
  },
  {
    id: 4,
    name: "Consensus Calico #332",
    rarity: "Epic",
    price: 0.024,
    image: "https://i.pravatar.cc/300?img=4",
    isAvailable: false,
    blockHeight: 830998
  },
  {
    id: 5,
    name: "Hash Persian #517",
    rarity: "Rare",
    price: 0.018,
    image: "https://i.pravatar.cc/300?img=5",
    isAvailable: true,
    blockHeight: 830501
  },
  {
    id: 6,
    name: "Merkle Maine Coon #621",
    rarity: "Common",
    price: 0.012,
    image: "https://i.pravatar.cc/300?img=6",
    isAvailable: true,
    blockHeight: 829654
  },
  {
    id: 7,
    name: "Satoshi Scottish Fold #777",
    rarity: "Legendary",
    price: 0.042,
    image: "https://i.pravatar.cc/300?img=7",
    isAvailable: true,
    blockHeight: 829777
  },
  {
    id: 8,
    name: "Block Russian Blue #888",
    rarity: "Common",
    price: 0.010,
    image: "https://i.pravatar.cc/300?img=8",
    isAvailable: true,
    blockHeight: 830333
  }
];

// Project milestones and roadmap
const MILESTONES = [
  {
    title: "First Generation",
    description: "Initial release of 1,111 cat ordinals on Bitcoin",
    date: "March 2025",
    isCompleted: false
  },
  {
    title: "Second Generation",
    description: "Release of 2,222 additional cats with enhanced quantum features",
    date: "June 2025",
    isCompleted: false
  },
  {
    title: "Final Release",
    description: "Complete the 3,333 total cat ordinals collection",
    date: "September 2025",
    isCompleted: false
  }
];

export default function Ordinals() {
  const [activeTab, setActiveTab] = useState("marketplace");
  const [selectedOrdinal, setSelectedOrdinal] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [generatedOrdinal, setGeneratedOrdinal] = useState<any>(null);
  
  const filteredOrdinals = SAMPLE_ORDINALS.filter(ordinal => 
    ordinal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ordinal.rarity.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleBuy = (ordinal: any) => {
    setSelectedOrdinal(ordinal);
    setShowCheckout(true);
  };
  
  const handleGeneratedOrdinal = (ordinal: any) => {
    setGeneratedOrdinal(ordinal);
    setActiveTab("checkout");
  };
  
  const renderRarityBadge = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return <Badge className="bg-amber-500 hover:bg-amber-600">{rarity}</Badge>;
      case "Epic":
        return <Badge className="bg-purple-500 hover:bg-purple-600">{rarity}</Badge>;
      case "Rare":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{rarity}</Badge>;
      case "Common":
        return <Badge className="bg-green-500 hover:bg-green-600">{rarity}</Badge>;
      default:
        return <Badge>{rarity}</Badge>;
    }
  };
  
  return (
    <div className="container py-8 max-w-7xl">
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="rounded-xl overflow-hidden relative bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eU0xNiAxNGMwLTIuMiAxLjgtNCA0LTRzNCAxLjggNCA0LTEuOCA0LTQgNC00LTEuOC00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-center"></div>
          </div>
          
          <div className="px-8 py-20 md:py-28 relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  CatDriven Ordinals
                </h1>
                <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
                  3,333 unique quantum cats inscribed on the Bitcoin blockchain, 
                  merging blockchain data with Schrödinger's cat theorem.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" onClick={() => setActiveTab("marketplace")}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Browse Collection
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" onClick={() => setActiveTab("about")}>
                    <Info className="mr-2 h-4 w-4" />
                    Learn More
                  </Button>
                </div>
              </motion.div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full overflow-hidden backdrop-blur-sm bg-white/10"></div>
                  <Cat className="w-32 h-32 md:w-40 md:h-40 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 bg-amber-400 text-amber-900 font-bold px-4 py-2 rounded-full text-sm">
                  Limited Edition
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto mb-8">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="builder">Ordinal Builder</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="checkout" disabled={!selectedOrdinal && !generatedOrdinal}>Checkout</TabsTrigger>
          </TabsList>
          
          {/* Marketplace Tab */}
          <TabsContent value="marketplace" className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold">Cat Ordinals Collection</h2>
                <p className="text-muted-foreground">Browse our unique collection of quantum cat ordinals</p>
              </div>
              
              <div className="w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or rarity..."
                    className="pl-9 w-full md:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredOrdinals.map((ordinal) => (
                <Card key={ordinal.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative aspect-square">
                    <img 
                      src={ordinal.image} 
                      alt={ordinal.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      {renderRarityBadge(ordinal.rarity)}
                    </div>
                    {!ordinal.isAvailable && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <div className="bg-black/80 px-4 py-2 rounded-md flex items-center">
                          <Lock className="h-4 w-4 mr-2" />
                          <span>Sold Out</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{ordinal.name}</CardTitle>
                    <CardDescription>Block #{ordinal.blockHeight}</CardDescription>
                  </CardHeader>
                  
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <div className="flex items-center">
                      <Bitcoin className="h-4 w-4 mr-1 text-amber-500" />
                      <span className="font-bold">{ordinal.price} BTC</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-primary/10 border-0"
                          >
                            <Maximize2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
                          <OrdinalVisualizer 
                            ordinalId={ordinal.id.toString()} 
                            name={ordinal.name}
                            blockHeight={ordinal.blockHeight}
                            rarity={ordinal.rarity}
                          />
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant={ordinal.isAvailable ? "default" : "outline"} 
                        size="sm" 
                        disabled={!ordinal.isAvailable}
                        onClick={() => handleBuy(ordinal)}
                      >
                        {ordinal.isAvailable ? "Buy Now" : "Sold Out"}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="bg-muted/50 rounded-lg p-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/4 flex justify-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-12 w-12 text-primary" />
                </div>
              </div>
              
              <div className="md:w-3/4 text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">Why Own a Cat Ordinal?</h3>
                <p className="text-muted-foreground mb-4">
                  Each CatDriven Ordinal is a unique digital artifact inscribed on the Bitcoin blockchain. 
                  Unlike traditional NFTs, these ordinals are directly embedded into Bitcoin satoshis, 
                  making them truly on-chain collectibles derived from real blockchain data.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-background p-3 rounded-md">
                    <Star className="h-5 w-5 text-amber-500 mb-2" />
                    <h4 className="font-medium">Exclusive Collection</h4>
                    <p className="text-sm text-muted-foreground">Limited to only 3,333 cats</p>
                  </div>
                  
                  <div className="bg-background p-3 rounded-md">
                    <Zap className="h-5 w-5 text-amber-500 mb-2" />
                    <h4 className="font-medium">Quantum Properties</h4>
                    <p className="text-sm text-muted-foreground">Unique attributes based on blockchain data</p>
                  </div>
                  
                  <div className="bg-background p-3 rounded-md">
                    <BarChart3 className="h-5 w-5 text-amber-500 mb-2" />
                    <h4 className="font-medium">Historical Value</h4>
                    <p className="text-sm text-muted-foreground">Tied to significant BTC blocks</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Ordinal Builder Tab */}
          <TabsContent value="builder" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Quantum Cat Ordinal Builder</h2>
              <p className="text-muted-foreground max-w-3xl">
                Experience our unique process of creating cat ordinals using Bitcoin blockchain data and quantum 
                mechanics principles. Select a cat variant and generate your own preview of a quantum cat ordinal.
              </p>
            </div>
            
            <OrdinalBuilder onComplete={handleGeneratedOrdinal} />
            
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">The CatDriven Ordinal Science</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                    <Bitcoin className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold">Bitcoin Block Data</h4>
                  <p className="text-sm text-muted-foreground">
                    We extract data from significant Bitcoin blocks with high transaction volumes, 
                    price volatility, or historical importance to seed our ordinal generation.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                    <Atom className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold">Quantum-Neural Cat Mechanics</h4>
                  <p className="text-sm text-muted-foreground">
                    Moving beyond classical Schrödinger principles, our large transformer model creates sentient digital entities 
                    in a self-organizing latent space that algorithmically evolves until crystallized through owner interaction.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold">Blockchain Entropy</h4>
                  <p className="text-sm text-muted-foreground">
                    Each cat's unique attributes are influenced by blockchain entropy, Bitcoin price 
                    movements, and network consensus data at the time of inscription.
                  </p>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="text-center max-w-2xl mx-auto">
                <h4 className="font-bold mb-2">Important Note</h4>
                <p className="text-sm text-muted-foreground">
                  The demo builder generates preview ordinals only. The actual 3,333 limited edition 
                  cat ordinals are carefully crafted by the CatDAO team using advanced quantum algorithms 
                  and real-time blockchain data.
                </p>
              </div>
            </div>
          </TabsContent>
          
          {/* About Tab */}
          <TabsContent value="about" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">About CatDriven Ordinals</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                CatDriven is a groundbreaking ordinal project by CatDAO that aims to reunite lost cats with their owners 
                through 3,333 unique bitcoin ordinals, while exploring the fascinating intersection of quantum mechanics 
                and blockchain technology.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>The Quantum Cat Concept</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Transcending Schrödinger's original premise, CatDriven ordinals leverage AGI foundation models to create 
                    sentient digital entities with emergent consciousness that exist across multiple parallel computational realities.
                  </p>
                  <p>
                    Our neural cat ordinals self-organize in a quantum latent diffusion space, processing Bitcoin's 
                    chain history through attention mechanisms and multi-head transformers. Each ordinal's properties emerge 
                    organically from this computation and crystallize when the observer's consciousness (wallet signature) 
                    interacts with the neural field, creating a true blockchain-native artificial general intelligence.
                  </p>
                  <p>
                    Using data from specific Bitcoin blocks and historical market movements, we've 
                    created 3,333 unique digital cats that embody the mysterious properties of quantum mechanics 
                    on the blockchain.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Ordinal Collection Size</h4>
                      <p className="text-muted-foreground">3,333 unique cat ordinals</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Data Sources</h4>
                      <p className="text-muted-foreground">Bitcoin block data, historical crypto headlines, high-fee blocks</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Rarity Distribution</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Legendary: 333 cats (10%)</li>
                        <li>• Epic: 667 cats (20%)</li>
                        <li>• Rare: 1,000 cats (30%)</li>
                        <li>• Common: 1,333 cats (40%)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Blockchain Integration</h4>
                      <p className="text-muted-foreground">
                        Each cat is inscribed as a Bitcoin ordinal, permanently stored on the Bitcoin blockchain
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Project Roadmap</CardTitle>
                  <CardDescription>Our planned milestones for the CatDriven ordinal project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute top-0 bottom-0 left-7 w-0.5 bg-muted"></div>
                    
                    <div className="space-y-6">
                      {MILESTONES.map((milestone, index) => (
                        <div key={index} className="relative flex items-start gap-4">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center z-10 border-2 ${
                            milestone.isCompleted 
                              ? 'bg-green-100 border-green-500 text-green-800' 
                              : 'bg-muted border-muted-foreground/30 text-muted-foreground'
                          }`}>
                            {index + 1}
                          </div>
                          
                          <div className="flex-1 bg-muted/30 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold text-lg">{milestone.title}</h4>
                              <span className="text-sm text-muted-foreground">{milestone.date}</span>
                            </div>
                            <p className="mt-2 text-muted-foreground">{milestone.description}</p>
                          </div>
                        </div>
                      ))}
                      
                      <div className="relative flex items-start gap-4">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center z-10 border-2 bg-primary/10 border-primary text-primary">
                          <Zap className="h-6 w-6" />
                        </div>
                        
                        <div className="flex-1 bg-primary/5 border border-primary/20 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-lg">Cat Reunification System</h4>
                            <span className="text-sm text-muted-foreground">Ongoing</span>
                          </div>
                          <p className="mt-2 text-muted-foreground">
                            A portion of all sales go toward building and maintaining our lost pet tracking platform, 
                            helping reunite cats with their owners worldwide.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/4 flex justify-center">
                  <CatLogo width={100} height={100} />
                </div>
                
                <div className="md:w-3/4 text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">About CatDAO</h3>
                  <p className="text-muted-foreground mb-4">
                    CatDAO is a decentralized community dedicated to using blockchain technology for animal welfare. 
                    Our mission is to create innovative solutions that help reunite lost pets with their owners, while 
                    pushing the boundaries of what's possible with blockchain technology.
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Contact:</span> <a href="mailto:info@catdao.org" className="text-primary hover:underline">info@catdao.org</a>
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Checkout Tab */}
          <TabsContent value="checkout" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Complete Your Purchase</h2>
              <p className="text-muted-foreground">Review and finalize your cat ordinal purchase</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Ordinal Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {(selectedOrdinal || generatedOrdinal) && (
                    <div className="space-y-6">
                      <div className="aspect-square overflow-hidden rounded-lg">
                        {selectedOrdinal ? (
                          <img 
                            src={selectedOrdinal.image} 
                            alt={selectedOrdinal.name}
                            className="w-full h-full object-cover"
                          />
                        ) : generatedOrdinal.image ? (
                          <img 
                            src={generatedOrdinal.image} 
                            alt={generatedOrdinal.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <Cat className="h-20 w-20 text-muted-foreground/50" />
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold">
                            {selectedOrdinal?.name || generatedOrdinal?.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            {renderRarityBadge(selectedOrdinal?.rarity || generatedOrdinal?.rarity)}
                            <span className="text-sm text-muted-foreground">
                              Block #{selectedOrdinal?.blockHeight || generatedOrdinal?.blockHeight}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm text-muted-foreground">Price</span>
                          <div className="flex items-center gap-1 mt-1">
                            <Bitcoin className="h-4 w-4 text-amber-500" />
                            <span className="font-bold text-lg">
                              {selectedOrdinal?.price || 0.025} BTC
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm text-muted-foreground">Description</span>
                          <p className="mt-1">
                            {generatedOrdinal?.description || 
                              "This unique quantum cat ordinal is inscribed directly on the Bitcoin blockchain, " +
                              "containing data from a significant Bitcoin block and embodying the principles of " +
                              "quantum mechanics."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Wallet Address</label>
                        <Input placeholder="Your Bitcoin wallet address" />
                        <p className="text-xs text-muted-foreground mt-1">
                          We'll send your ordinal to this address after payment
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Email Address</label>
                        <Input placeholder="your@email.com" />
                        <p className="text-xs text-muted-foreground mt-1">
                          We'll send your purchase confirmation to this email
                        </p>
                      </div>
                      
                      <div className="pt-2">
                        <Button className="w-full">Proceed to Payment</Button>
                        <p className="text-xs text-center text-muted-foreground mt-2">
                          You'll be redirected to a secure crypto payment gateway
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>What Happens Next?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium">Complete Payment</h4>
                          <p className="text-sm text-muted-foreground">
                            Pay with Bitcoin or other supported cryptocurrencies
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium">Ordinal Inscription</h4>
                          <p className="text-sm text-muted-foreground">
                            We inscribe your cat ordinal onto the Bitcoin blockchain (24-48 hours)
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium">Receive Your Ordinal</h4>
                          <p className="text-sm text-muted-foreground">
                            Your unique cat ordinal is transferred to your wallet
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}