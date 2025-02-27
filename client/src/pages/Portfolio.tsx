import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import BlockchainActivity from "@/components/dashboard/BlockchainActivity";
import { generateWalletAddress } from "@/services/blockchain";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("allocation");
  
  const { data: currentUser } = useQuery({
    queryKey: ['/api/current-user'],
  });
  
  const { data: portfolio } = useQuery({
    queryKey: ['/api/portfolio', currentUser?.id],
    enabled: !!currentUser?.id,
  });
  
  const { data: assets } = useQuery({
    queryKey: ['/api/assets', currentUser?.id],
    enabled: !!currentUser?.id,
  });
  
  // Calculate asset allocation for pie chart
  const getAllocationData = () => {
    if (!assets) return [];
    
    return assets.map((asset: any) => ({
      name: asset.symbol,
      value: asset.price * asset.quantity,
      color: asset.symbol === "CDV" ? "hsl(var(--secondary))" : 
             asset.symbol === "BTC" ? "#F7931A" :
             asset.symbol === "ETH" ? "#627EEA" : 
             "hsl(var(--accent))"
    }));
  };
  
  // Create transaction history data (mock data for now)
  const transactionHistory = [
    { date: "2023-04-30", type: "Buy", asset: "CDV", amount: "5,000", price: "$0.0681", total: "$340.50" },
    { date: "2023-04-25", type: "Sell", asset: "BTC", amount: "0.05", price: "$63,200", total: "$3,160.00" },
    { date: "2023-04-18", type: "Buy", asset: "ETH", amount: "0.5", price: "$3,920", total: "$1,960.00" },
    { date: "2023-04-10", type: "Stake", asset: "CDV", amount: "10,000", price: "$0.0702", total: "$702.00" },
    { date: "2023-04-05", type: "Buy", asset: "CDV", amount: "15,000", price: "$0.0695", total: "$1,042.50" }
  ];
  
  // Create historical performance data (mock data)
  const performanceHistory = [
    { month: "Jan", value: 125000 },
    { month: "Feb", value: 130000 },
    { month: "Mar", value: 128000 },
    { month: "Apr", value: 135000 },
    { month: "May", value: 152483 }
  ];
  
  return (
    <div className="px-4 py-6 md:px-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Portfolio</h1>
          <p className="text-muted-foreground mt-1">Manage and track your investments</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button>
            <i className="fas fa-exchange-alt mr-2"></i> Transfer
          </Button>
          <Button variant="outline">
            <i className="fas fa-file-export mr-2"></i> Export CSV
          </Button>
        </div>
      </div>
      
      {/* Portfolio Summary */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-muted-foreground mb-1">Total Value</p>
              <p className="text-3xl font-mono font-medium text-white">
                ${portfolio?.totalValue.toLocaleString()}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-green-500">+${(portfolio?.totalValue * (portfolio?.growthChange / 100)).toFixed(2)} ({portfolio?.growthChange}%)</span>
                <span className="text-muted-foreground text-xs ml-1">past 30d</span>
              </div>
            </div>
            
            <div>
              <p className="text-muted-foreground mb-1">CDV Holdings</p>
              <p className="text-3xl font-mono font-medium text-white">
                {assets?.find((a: any) => a.symbol === "CDV")?.quantity.toLocaleString()} CDV
              </p>
              <div className="flex items-center mt-2">
                <span className="text-green-500">
                  +{assets?.find((a: any) => a.symbol === "CDV")?.priceChange || 3.2}%
                </span>
                <span className="text-muted-foreground text-xs ml-1">past 24h</span>
              </div>
            </div>
            
            <div>
              <p className="text-muted-foreground mb-1">NFT Collection Value</p>
              <p className="text-3xl font-mono font-medium text-white">13 CDV</p>
              <div className="flex items-center mt-2">
                <span className="text-green-500">+1.5 CDV (13.0%)</span>
                <span className="text-muted-foreground text-xs ml-1">past 30d</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Blockchain Wallet */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Bitcoin Wallet</span>
            <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(generateWalletAddress())}>
              <i className="fas fa-copy mr-2"></i>
              Copy Address
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-mono text-sm p-3 bg-muted rounded-md overflow-auto">
            {generateWalletAddress()}
          </div>
          <BlockchainActivity />
        </CardContent>
      </Card>
      
      {/* Portfolio Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="performance">Historical Performance</TabsTrigger>
          <TabsTrigger value="ordinals">Bitcoin Ordinals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="allocation">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getAllocationData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {getAllocationData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => `$${value.toLocaleString()}`}
                        contentStyle={{ backgroundColor: 'hsl(var(--card))' }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Asset Breakdown</h3>
                  <div className="space-y-4">
                    {assets?.map((asset: any) => {
                      const value = asset.price * asset.quantity;
                      const percentage = portfolio?.totalValue ? ((value / portfolio.totalValue) * 100).toFixed(1) : "0";
                      
                      return (
                        <div key={asset.id} className="p-4 bg-muted rounded-lg">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <div className={asset.icon.includes("fa-") ? `bg-opacity-20 p-2 rounded-lg mr-2 bg-[${asset.iconColor}]` : "p-2 rounded-lg mr-2"}>
                                <i className={`${asset.icon.includes("fa-") ? `fas ${asset.icon}` : asset.icon} text-[${asset.iconColor}]`}></i>
                              </div>
                              <div>
                                <p className="font-medium">{asset.name}</p>
                                <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${value.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">{percentage}% of portfolio</p>
                            </div>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                asset.symbol === "CDV" ? "bg-secondary" : 
                                asset.symbol === "BTC" ? "bg-[#F7931A]" :
                                asset.symbol === "ETH" ? "bg-[#627EEA]" : 
                                "bg-accent"
                              }`} 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-4 py-3 text-muted-foreground">Date</th>
                      <th className="text-left px-4 py-3 text-muted-foreground">Type</th>
                      <th className="text-left px-4 py-3 text-muted-foreground">Asset</th>
                      <th className="text-left px-4 py-3 text-muted-foreground">Amount</th>
                      <th className="text-left px-4 py-3 text-muted-foreground">Price</th>
                      <th className="text-left px-4 py-3 text-muted-foreground">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionHistory.map((tx, index) => (
                      <tr key={index} className="border-b border-border hover:bg-muted">
                        <td className="px-4 py-3">{tx.date}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                            tx.type === "Buy" ? "bg-green-500/20 text-green-500" :
                            tx.type === "Sell" ? "bg-red-500/20 text-red-500" :
                            "bg-secondary/20 text-secondary"
                          }`}>
                            {tx.type}
                          </span>
                        </td>
                        <td className="px-4 py-3">{tx.asset}</td>
                        <td className="px-4 py-3">{tx.amount}</td>
                        <td className="px-4 py-3">{tx.price}</td>
                        <td className="px-4 py-3">{tx.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline">Load More Transactions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-[400px]">
                  {/* Performance chart here */}
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={performanceHistory}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={150}
                        fill="hsl(var(--secondary))"
                        dataKey="value"
                        label={({ month, value }) => `${month}: $${value.toLocaleString()}`}
                      />
                      <Tooltip 
                        formatter={(value: any) => `$${value.toLocaleString()}`}
                        contentStyle={{ backgroundColor: 'hsl(var(--card))' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg flex justify-between">
                      <span>Starting Value (Jan 2023)</span>
                      <span className="font-mono">$125,000.00</span>
                    </div>
                    <div className="p-4 bg-muted rounded-lg flex justify-between">
                      <span>Current Value (May 2023)</span>
                      <span className="font-mono">${portfolio?.totalValue.toLocaleString()}</span>
                    </div>
                    <div className="p-4 bg-muted rounded-lg flex justify-between">
                      <span>Total Growth</span>
                      <span className="font-mono text-green-500">+$27,483.56 (22.0%)</span>
                    </div>
                    <div className="p-4 bg-muted rounded-lg flex justify-between">
                      <span>Monthly Average</span>
                      <span className="font-mono text-green-500">+4.4%</span>
                    </div>
                    <div className="p-4 bg-muted rounded-lg flex justify-between">
                      <span>Best Month</span>
                      <span className="font-mono">May (+12.9%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ordinals">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Bitcoin Ordinals Collection</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <i className="fas fa-refresh mr-2"></i> Refresh
                  </Button>
                  <Button size="sm">
                    <i className="fas fa-plus mr-2"></i> Inscribe New
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-secondary/10 rounded-md border border-secondary/20">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <i className="fas fa-info-circle mr-2 text-secondary"></i>
                  About Bitcoin Ordinals
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ordinals are digital artifacts native to the Bitcoin blockchain. Unlike traditional NFTs, 
                  Ordinals are inscribed directly onto individual satoshis (the smallest unit of Bitcoin), 
                  making them truly on-chain and permanent. Your Cat Ordinals use Schrödinger's quantum mechanics 
                  principles, existing in multiple states until observed.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Inscribed Cats */}
                <div className="p-4 bg-muted rounded-lg">
                  <div className="aspect-square rounded-md overflow-hidden mb-3">
                    <img 
                      src="https://i.pravatar.cc/300?img=1" 
                      alt="Legendary Sphinx Cat" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium">Legendary Sphinx Cat #042</h4>
                  <div className="flex justify-between items-center mt-1 mb-3">
                    <span className="text-xs text-muted-foreground">Inscription #784901</span>
                    <span className="text-xs font-mono">7.5 BTC</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full">
                      <i className="fas fa-star mr-1"></i> Legendary
                    </span>
                    <span className="text-secondary">Block #790213</span>
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <div className="aspect-square rounded-md overflow-hidden mb-3">
                    <img 
                      src="https://i.pravatar.cc/300?img=2" 
                      alt="Epic Maine Coon" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium">Epic Maine Coon #108</h4>
                  <div className="flex justify-between items-center mt-1 mb-3">
                    <span className="text-xs text-muted-foreground">Inscription #782115</span>
                    <span className="text-xs font-mono">3.2 BTC</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center bg-purple-500/20 text-purple-500 px-2 py-1 rounded-full">
                      <i className="fas fa-trophy mr-1"></i> Epic
                    </span>
                    <span className="text-secondary">Block #788156</span>
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <div className="aspect-square rounded-md overflow-hidden mb-3">
                    <img 
                      src="https://i.pravatar.cc/300?img=3" 
                      alt="Rare Siamese" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium">Rare Siamese #291</h4>
                  <div className="flex justify-between items-center mt-1 mb-3">
                    <span className="text-xs text-muted-foreground">Inscription #779323</span>
                    <span className="text-xs font-mono">1.8 BTC</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center bg-blue-500/20 text-blue-500 px-2 py-1 rounded-full">
                      <i className="fas fa-gem mr-1"></i> Rare
                    </span>
                    <span className="text-secondary">Block #784992</span>
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <div className="aspect-square rounded-md overflow-hidden mb-3">
                    <img 
                      src="https://i.pravatar.cc/300?img=4" 
                      alt="Common Tabby" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium">Common Tabby #573</h4>
                  <div className="flex justify-between items-center mt-1 mb-3">
                    <span className="text-xs text-muted-foreground">Inscription #775668</span>
                    <span className="text-xs font-mono">0.5 BTC</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
                      <i className="fas fa-tag mr-1"></i> Common
                    </span>
                    <span className="text-secondary">Block #781435</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Bitcoin Blockchain Data</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left px-4 py-2 text-muted-foreground">Inscription</th>
                        <th className="text-left px-4 py-2 text-muted-foreground">Block</th>
                        <th className="text-left px-4 py-2 text-muted-foreground">Satoshi</th>
                        <th className="text-left px-4 py-2 text-muted-foreground">Timestamp</th>
                        <th className="text-left px-4 py-2 text-muted-foreground">State</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border hover:bg-muted">
                        <td className="px-4 py-2 font-mono text-xs">#784901</td>
                        <td className="px-4 py-2">790213</td>
                        <td className="px-4 py-2 font-mono text-xs">2100000000</td>
                        <td className="px-4 py-2">2025-01-15 14:32 UTC</td>
                        <td className="px-4 py-2"><span className="text-green-500">Observed</span></td>
                      </tr>
                      <tr className="border-b border-border hover:bg-muted">
                        <td className="px-4 py-2 font-mono text-xs">#782115</td>
                        <td className="px-4 py-2">788156</td>
                        <td className="px-4 py-2 font-mono text-xs">2099989200</td>
                        <td className="px-4 py-2">2025-01-12 09:17 UTC</td>
                        <td className="px-4 py-2"><span className="text-green-500">Observed</span></td>
                      </tr>
                      <tr className="border-b border-border hover:bg-muted">
                        <td className="px-4 py-2 font-mono text-xs">#779323</td>
                        <td className="px-4 py-2">784992</td>
                        <td className="px-4 py-2 font-mono text-xs">2099970900</td>
                        <td className="px-4 py-2">2025-01-08 21:45 UTC</td>
                        <td className="px-4 py-2"><span className="text-amber-500">Unobserved</span></td>
                      </tr>
                      <tr className="border-b border-border hover:bg-muted">
                        <td className="px-4 py-2 font-mono text-xs">#775668</td>
                        <td className="px-4 py-2">781435</td>
                        <td className="px-4 py-2 font-mono text-xs">2099957300</td>
                        <td className="px-4 py-2">2025-01-03 11:02 UTC</td>
                        <td className="px-4 py-2"><span className="text-green-500">Observed</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
