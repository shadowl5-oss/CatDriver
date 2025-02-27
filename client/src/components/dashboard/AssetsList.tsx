import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

type Asset = {
  id: number;
  name: string;
  symbol: string;
  price: number;
  priceChange: number;
  quantity: number;
  icon: string;
  iconColor: string;
};

export default function AssetsList() {
  const { data: currentUser } = useQuery({
    queryKey: ['/api/current-user'],
  });

  const { data: assets, isLoading } = useQuery({
    queryKey: ['/api/assets', currentUser?.id],
    enabled: !!currentUser?.id,
  });

  // Calculate value of assets
  const getAssetValue = (asset: Asset) => {
    return asset.price * asset.quantity;
  };

  // Render asset icon
  const renderIcon = (asset: Asset) => {
    if (asset.icon.startsWith('fa-')) {
      return (
        <div 
          className={asset.iconColor === 'gradient' 
            ? "cat-gradient text-white p-2 rounded-full w-10 h-10 flex items-center justify-center"
            : `bg-[${asset.iconColor}] text-white p-2 rounded-full w-10 h-10 flex items-center justify-center`
          }
        >
          <i className={`fas ${asset.icon}`}></i>
        </div>
      );
    } else if (asset.icon.startsWith('text-')) {
      return (
        <div 
          className={`bg-[${asset.iconColor}] text-white p-2 rounded-full w-10 h-10 flex items-center justify-center`}
        >
          <span className="text-xs font-bold">{asset.icon.replace('text-', '')}</span>
        </div>
      );
    } else if (asset.icon.startsWith('fab ')) {
      return (
        <div 
          className={`bg-[${asset.iconColor}] text-white p-2 rounded-full w-10 h-10 flex items-center justify-center`}
        >
          <i className={asset.icon}></i>
        </div>
      );
    }

    return (
      <div className="bg-primary bg-opacity-20 p-2 rounded-full w-10 h-10 flex items-center justify-center">
        <i className="fas fa-coins text-primary"></i>
      </div>
    );
  };

  return (
    <Card className="shadow">
      <CardHeader className="border-b border-border">
        <div className="flex justify-between items-center">
          <CardTitle>Your Assets</CardTitle>
          <button className="text-secondary hover:text-white">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        {isLoading ? (
          <div className="p-4 text-center">
            <p className="text-muted-foreground">Loading assets...</p>
          </div>
        ) : (
          <>
            {assets?.map((asset: Asset) => (
              <div 
                key={asset.id}
                className="flex items-center p-4 hover:bg-muted rounded-lg"
              >
                {renderIcon(asset)}
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-white">{asset.name}</p>
                    <p className="text-sm text-white">
                      ${getAssetValue(asset).toLocaleString(undefined, { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                      })}
                    </p>
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-muted-foreground">
                      {asset.quantity.toLocaleString()} {asset.symbol}
                    </p>
                    <p className={`text-xs ${
                      asset.priceChange > 0 
                        ? "text-green-500" 
                        : asset.priceChange < 0 
                          ? "text-red-500" 
                          : "text-muted-foreground"
                    }`}>
                      {asset.priceChange > 0 ? "+" : ""}{asset.priceChange}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="p-4">
              <Button variant="outline" className="w-full">
                View All Assets
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
