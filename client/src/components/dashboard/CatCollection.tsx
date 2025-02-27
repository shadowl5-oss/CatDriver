import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import SimpleAsciiArt from "@/components/SimpleAsciiArt";

type CatNft = {
  id: number;
  name: string;
  rarity: string;
  image: string;
  price: number;
  tokenId: string;
  ownerId: number;
};

export default function CatCollection() {
  const { data: currentUser } = useQuery({
    queryKey: ['/api/current-user'],
  });
  
  const { data: catNfts, isLoading } = useQuery({
    queryKey: ['/api/cat-nfts/user', currentUser?.id],
    enabled: !!currentUser?.id,
  });
  
  // Map rarity to color
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary": return "text-secondary";
      case "Epic": return "text-accent";
      case "Rare": return "text-amber-400";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card className="shadow">
      <CardHeader className="border-b border-border">
        <div className="flex justify-between items-center">
          <CardTitle>Your Cat Collection</CardTitle>
          <Link href="/marketplace">
            <a className="text-secondary text-sm hover:underline">View All</a>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground">Loading cat collection...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {catNfts?.map((cat: CatNft) => (
              <div key={cat.id} className="bg-muted rounded-lg overflow-hidden card-hover">
                <div className="w-full h-32 flex items-center justify-center bg-black">
                  <SimpleAsciiArt 
                    type={cat.id % 4 === 0 ? "quantum" : 
                          cat.id % 4 === 1 ? "bitcoin" : 
                          cat.id % 4 === 2 ? "cypherpunk" : "schrodinger"}
                    width={150}
                    height={110}
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-white">{cat.name}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className={`text-xs ${getRarityColor(cat.rarity)}`}>{cat.rarity}</p>
                    <p className="text-xs text-white">{cat.price} CDV</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
