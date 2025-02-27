import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

type Rarity = "All" | "Common" | "Rare" | "Epic" | "Legendary";
type SortOption = "newest" | "oldest" | "price-asc" | "price-desc";

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRarity, setSelectedRarity] = useState<Rarity>("All");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  
  const { data: allCats, isLoading } = useQuery({
    queryKey: ['/api/cat-nfts'],
  });
  
  // Filter cats based on search query and rarity
  const filteredCats = allCats?.filter((cat: any) => {
    const matchesSearch = searchQuery === "" || 
      cat.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRarity = selectedRarity === "All" || cat.rarity === selectedRarity;
    
    return matchesSearch && matchesRarity;
  });
  
  // Sort cats based on selected option
  const sortedCats = [...(filteredCats || [])].sort((a: any, b: any) => {
    switch (sortOption) {
      case "newest":
        return b.id - a.id; // Assuming higher IDs are newer
      case "oldest":
        return a.id - b.id;
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });
  
  // Map rarity to badge color
  const getRarityBadgeVariant = (rarity: string) => {
    switch (rarity) {
      case "Legendary": return "secondary";
      case "Epic": return "default";
      case "Rare": return "outline";
      default: return "secondary";
    }
  };
  
  // Generate trending collections (mock data)
  const trendingCollections = [
    { name: "Crypto Cats", floor: 3.5, volume: 2540, change: "+15.2%" },
    { name: "Space Kittens", floor: 2.1, volume: 1870, change: "+8.7%" },
    { name: "Purr Punks", floor: 1.8, volume: 1320, change: "+5.3%" },
    { name: "Meow Meow Club", floor: 0.8, volume: 950, change: "+2.1%" }
  ];
  
  return (
    <div className="px-4 py-6 md:px-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">NFT Marketplace</h1>
          <p className="text-muted-foreground mt-1">Browse and collect Cat NFTs</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button className="bg-secondary hover:bg-secondary/90 text-white">
            <i className="fas fa-plus mr-2"></i> Create NFT
          </Button>
          <Button variant="outline">
            <i className="fas fa-wallet mr-2"></i> Connect Wallet
          </Button>
        </div>
      </div>
      
      {/* Marketplace Tabs */}
      <Tabs defaultValue="explore" className="mb-8">
        <TabsList>
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="my-nfts">My NFTs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="explore" className="pt-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="w-full md:w-auto flex-1 max-w-md">
              <Input
                placeholder="Search cat NFTs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select value={selectedRarity} onValueChange={(value) => setSelectedRarity(value as Rarity)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter by rarity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Rarities</SelectItem>
                  <SelectItem value="Common">Common</SelectItem>
                  <SelectItem value="Rare">Rare</SelectItem>
                  <SelectItem value="Epic">Epic</SelectItem>
                  <SelectItem value="Legendary">Legendary</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* NFT Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading NFTs...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedCats?.map((cat: any) => (
                <Card key={cat.id} className="card-hover transition-all duration-300 overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-500" 
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-foreground font-semibold text-base">{cat.name}</h3>
                      <Badge variant={getRarityBadgeVariant(cat.rarity)}>
                        {cat.rarity}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-muted-foreground text-sm">#{cat.tokenId.slice(-3)}</p>
                      <p className="font-mono text-secondary">{cat.price} CDV</p>
                    </div>
                    <Button className="w-full mt-4">
                      <i className="fas fa-shopping-cart mr-2"></i> Buy Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {sortedCats?.length === 0 && !isLoading && (
            <div className="text-center py-12 bg-muted rounded-lg">
              <i className="fas fa-search text-4xl text-muted-foreground mb-4"></i>
              <p className="text-muted-foreground">No NFTs found matching your criteria</p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchQuery("");
                setSelectedRarity("All");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="trending" className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trending Collections */}
            <Card>
              <CardHeader>
                <CardTitle>Trending Collections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingCollections.map((collection, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{collection.name}</h3>
                        <p className="text-xs text-muted-foreground">Floor: {collection.floor} CDV</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{collection.volume} CDV</p>
                        <p className="text-xs text-green-500">{collection.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Trading Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg flex items-center">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <p className="font-semibold">Siamese #291</p>
                      <p className="text-xs text-muted-foreground">Sold 5 minutes ago</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono">1.8 CDV</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg flex items-center">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <p className="font-semibold">Sphinx #042</p>
                      <p className="text-xs text-muted-foreground">Sold 15 minutes ago</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono">7.5 CDV</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg flex items-center">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <p className="font-semibold">Maine Coon #108</p>
                      <p className="text-xs text-muted-foreground">Sold 32 minutes ago</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono">3.2 CDV</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg flex items-center">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <p className="font-semibold">Tabby #573</p>
                      <p className="text-xs text-muted-foreground">Sold 45 minutes ago</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono">0.5 CDV</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="my-nfts" className="pt-6">
          <div className="text-center py-12 bg-muted rounded-lg">
            <i className="fas fa-cat text-4xl text-secondary mb-4"></i>
            <h2 className="text-xl font-bold mb-2">Connect your wallet</h2>
            <p className="text-muted-foreground mb-6">Connect your wallet to view your NFT collection</p>
            <Button>
              <i className="fas fa-wallet mr-2"></i> Connect Wallet
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
