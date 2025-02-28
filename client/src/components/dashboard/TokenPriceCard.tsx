import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, TrendingDown, Percent } from "lucide-react";
import { Link } from "wouter";

export default function TokenPriceCard() {
  const { data: tokenPrices, isLoading } = useQuery({
    queryKey: ['/api/token-prices/CDV', { limit: 2 }],
  });
  
  // Calculate current price and change
  const currentPrice = tokenPrices?.[0]?.price || 0.0;
  const previousPrice = tokenPrices?.[1]?.price || currentPrice;
  const priceChange = currentPrice - previousPrice;
  const percentChange = ((priceChange / previousPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;
  
  return (
    <Card className="shadow h-full">
      <CardHeader className="border-b border-border px-4 py-3">
        <CardTitle className="text-lg flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-secondary" />
          CDV Token
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-36">
            <p className="text-muted-foreground text-sm">Loading token data...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-secondary/20 flex items-center justify-center rounded-full mr-3">
                <span className="text-secondary font-mono text-lg">₡</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CatDAO Token</p>
                <p className="font-mono">CDV</p>
              </div>
            </div>
            
            <div className="mb-6 pt-2">
              <div className="text-2xl font-mono font-medium text-white">${currentPrice.toFixed(4)}</div>
              <div className="flex items-center mt-1">
                {isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={isPositive ? "text-green-500" : "text-red-500"}>
                  {isPositive ? "+" : ""}{priceChange.toFixed(4)} 
                  <span className="ml-1">
                    ({isPositive ? "+" : ""}{percentChange}%)
                  </span>
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Market Cap</p>
                <p className="text-sm font-mono">$12.5M</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground">24h Volume</p>
                <p className="text-sm font-mono">$421K</p>
              </div>
            </div>
            
            <Link href="/portfolio">
              <Button className="w-full">View Portfolio</Button>
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
}