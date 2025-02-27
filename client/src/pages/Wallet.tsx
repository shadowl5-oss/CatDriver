import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import WalletConnector from '@/components/WalletConnector';
import { Button } from '@/components/ui/button';
import { ArrowDown, Bitcoin, Blocks, Cpu, ExternalLink, MoreHorizontal, Wallet as WalletIcon } from 'lucide-react';
import { getBlockchainProvider, BlockchainTransaction, getTransactionHistory } from '@/services/blockchain';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export default function Wallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<'bitcoin' | 'ethereum'>('bitcoin');
  
  const { data: treasuryData, isLoading: isLoadingTreasury } = useQuery({
    queryKey: ['/api/treasury-balance'],
    queryFn: async () => {
      const { getTreasuryBalance } = await import('@/services/blockchain');
      return getTreasuryBalance();
    },
    refetchInterval: 60000, // Refetch every minute
  });
  
  const currentPrice = 64289.33; // Mock current BTC price
  
  return (
    <div className="px-4 py-6 md:px-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Blockchain Wallet</h1>
        <p className="text-muted-foreground mt-1">Manage your crypto assets and transactions</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - Wallet connector and transaction history */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue={walletType} onValueChange={(value) => setWalletType(value as 'bitcoin' | 'ethereum')}>
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="bitcoin">
                <Bitcoin className="h-4 w-4 mr-2" />
                Bitcoin
              </TabsTrigger>
              <TabsTrigger value="ethereum">
                <Cpu className="h-4 w-4 mr-2" />
                Ethereum
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="bitcoin">
              <WalletConnector 
                type="bitcoin"
                onAddressChange={setAddress}
              />
            </TabsContent>
            
            <TabsContent value="ethereum">
              <WalletConnector 
                type="ethereum"
                onAddressChange={setAddress}
              />
            </TabsContent>
          </Tabs>
          
          {address && (
            <Card>
              <CardHeader>
                <CardTitle>On-Chain Analytics</CardTitle>
                <CardDescription>Blockchain statistics and network information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Network Hashrate</div>
                    <div className="text-2xl font-bold">268 EH/s</div>
                    <div className="text-xs text-green-400">+12.5% (24h)</div>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Avg. Transaction Fee</div>
                    <div className="text-2xl font-bold">12.8 sat/vB</div>
                    <div className="text-xs text-red-400">+3.2% (24h)</div>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Mempool Size</div>
                    <div className="text-2xl font-bold">12,483 tx</div>
                    <div className="text-xs text-green-400">-5.7% (24h)</div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Fee Estimates</h3>
                    <span className="text-xs text-muted-foreground">Updated 2 minutes ago</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>High Priority (10-20 minutes)</span>
                        <span>22 sat/vB</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Medium Priority (1-2 hours)</span>
                        <span>14 sat/vB</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Low Priority (1+ day)</span>
                        <span>4 sat/vB</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Sidebar - Market data and resources */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bitcoin className="h-8 w-8 text-secondary" />
                  <div>
                    <div className="font-semibold">Bitcoin</div>
                    <div className="text-xs text-muted-foreground">BTC</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">${currentPrice.toLocaleString()}</div>
                  <div className="text-xs text-green-400">+2.3% (24h)</div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Market Cap</span>
                  <span className="font-medium">${(currentPrice * 19460000).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">24h Volume</span>
                  <span className="font-medium">$28,403,123,095</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Circulating Supply</span>
                  <span className="font-medium">19,460,000 BTC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">All-Time High</span>
                  <span className="font-medium">$69,000 <span className="text-xs text-muted-foreground">Nov 10, 2021</span></span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Halving</span>
                  <span className="font-medium">Next: May 2024</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" onClick={() => window.open('https://www.coingecko.com/en/coins/bitcoin', '_blank')}>
                <ExternalLink className="h-4 w-4 mr-2" />
                View Market Data
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>CatDAO Treasury</CardTitle>
              <CardDescription>
                Community-owned assets and statistics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoadingTreasury ? (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">Loading treasury data...</p>
                </div>
              ) : (
                <>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Total Value</div>
                    <div className="text-2xl font-bold">
                      ${treasuryData?.usd.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-xs text-green-400">+5.4% (7d)</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bitcoin className="h-5 w-5 text-[#F7931A]" />
                        <span>Bitcoin</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{treasuryData?.btc.toFixed(2)} BTC</div>
                        <div className="text-xs text-muted-foreground">
                          ${(treasuryData?.btc || 0 * currentPrice).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <WalletIcon className="h-5 w-5 text-primary" />
                        <span>Cat NFTs</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">542 NFTs</div>
                        <div className="text-xs text-muted-foreground">
                          Floor: 0.45 BTC
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Recent Treasury Activity</h3>
                    <div className="space-y-2">
                      <div className="p-2 bg-muted rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ArrowDown className="h-4 w-4 text-green-400" />
                          <div className="text-sm">Treasury deposit</div>
                        </div>
                        <Badge>+1.5 BTC</Badge>
                      </div>
                      <div className="p-2 bg-muted rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Blocks className="h-4 w-4 text-blue-400" />
                          <div className="text-sm">NFT purchased</div>
                        </div>
                        <Badge variant="outline">-0.3 BTC</Badge>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}