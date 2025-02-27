import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Area, 
  AreaChart
} from "recharts";

type TimeRange = "1D" | "1W" | "1M" | "1Y";
type CurrencyPair = "CDV/USD" | "CDV/ETH" | "CDV/BTC";

export default function TokenChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("1M");
  const [currencyPair, setCurrencyPair] = useState<CurrencyPair>("CDV/USD");
  
  const { data: tokenPrices, isLoading } = useQuery({
    queryKey: [`/api/token-prices/CDV`, { limit: getLimitForTimeRange(timeRange) }],
  });
  
  function getLimitForTimeRange(range: TimeRange): number {
    switch (range) {
      case "1D": return 24; // Hourly data for a day
      case "1W": return 7;  // Daily data for a week
      case "1M": return 30; // Daily data for a month
      case "1Y": return 365; // Daily data for a year
      default: return 30;
    }
  }
  
  // Calculate current price and change
  const currentPrice = tokenPrices?.[0]?.price || 0.0734;
  const previousPrice = tokenPrices?.[1]?.price || currentPrice;
  const priceChange = currentPrice - previousPrice;
  const percentChange = ((priceChange / previousPrice) * 100).toFixed(2);
  
  // Format the chart data
  const chartData = tokenPrices?.map((tp: any) => ({
    date: new Date(tp.timestamp).toLocaleDateString(),
    price: tp.price
  })).reverse() || [];
  
  return (
    <Card className="shadow overflow-hidden lg:col-span-2">
      <CardHeader className="border-b border-border">
        <div className="flex justify-between items-center">
          <CardTitle>Token Performance</CardTitle>
          <div className="flex space-x-2">
            {(["1D", "1W", "1M", "1Y"] as TimeRange[]).map((range) => (
              <button
                key={range}
                className={`px-3 py-1 rounded-lg text-sm ${
                  timeRange === range 
                    ? "bg-secondary text-white" 
                    : "bg-muted text-muted-foreground hover:text-white"
                }`}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-mono font-medium text-white">${currentPrice.toFixed(4)}</p>
            <div className="flex items-center">
              <span className={priceChange >= 0 ? "text-green-500" : "text-red-500"}>
                {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(4)} ({priceChange >= 0 ? "+" : ""}{percentChange}%)
              </span>
              <span className="text-muted-foreground text-xs ml-1">Today</span>
            </div>
          </div>
          <Select value={currencyPair} onValueChange={(value) => setCurrencyPair(value as CurrencyPair)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select pair" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CDV/USD">CDV/USD</SelectItem>
              <SelectItem value="CDV/ETH">CDV/ETH</SelectItem>
              <SelectItem value="CDV/BTC">CDV/BTC</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="h-[280px]">
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <p className="text-muted-foreground">Loading chart data...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  tickCount={5}
                />
                <YAxis 
                  hide={true}
                  domain={['auto', 'auto']}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted) / 0.4)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="hsl(var(--secondary))" 
                  fillOpacity={1}
                  fill="url(#colorPrice)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
