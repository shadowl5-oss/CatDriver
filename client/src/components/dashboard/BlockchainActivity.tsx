import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BlockchainTransaction, 
  getTransactionHistory, 
  getTreasuryBalance 
} from '@/services/blockchain';
import { useQuery } from '@tanstack/react-query';

export default function BlockchainActivity() {
  const [activeTab, setActiveTab] = useState('transactions');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  
  // Fetch transaction history
  const { data: transactions } = useQuery({
    queryKey: ['blockchain-transactions', timeRange],
    queryFn: async () => {
      return await getTransactionHistory();
    }
  });
  
  // Fetch treasury balance
  const { data: treasuryBalance } = useQuery({
    queryKey: ['treasury-balance'],
    queryFn: async () => {
      return await getTreasuryBalance();
    }
  });
  
  // Calculate blockchain metrics
  const pendingTransactions = transactions?.filter(tx => tx.status === 'pending').length || 0;
  const confirmedTransactions = transactions?.filter(tx => tx.status === 'confirmed').length || 0;
  const totalVolume = transactions?.reduce((sum, tx) => sum + tx.amount, 0) || 0;
  
  // Get status badge for transaction
  const getStatusBadge = (status: 'pending' | 'confirmed' | 'failed') => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="default">Confirmed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
    }
  };
  
  // Format timestamp to relative time
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    }
  };
  
  // Format address to shorter version
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Blockchain Activity</span>
          <div className="flex space-x-1">
            <Badge variant={timeRange === '24h' ? 'default' : 'outline'} 
                  className="cursor-pointer"
                  onClick={() => setTimeRange('24h')}>
              24h
            </Badge>
            <Badge variant={timeRange === '7d' ? 'default' : 'outline'} 
                  className="cursor-pointer"
                  onClick={() => setTimeRange('7d')}>
              7d
            </Badge>
            <Badge variant={timeRange === '30d' ? 'default' : 'outline'} 
                  className="cursor-pointer"
                  onClick={() => setTimeRange('30d')}>
              30d
            </Badge>
          </div>
        </CardTitle>
        <CardDescription>
          Recent blockchain transactions and network statistics
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="statistics">Network Stats</TabsTrigger>
            <TabsTrigger value="treasury">CatDAO Treasury</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground font-medium">
              <div className="w-5/12">Details</div>
              <div className="w-3/12 text-right">Amount</div>
              <div className="w-2/12 text-right">Status</div>
              <div className="w-2/12 text-right">Time</div>
            </div>
            
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-2">
              {transactions?.map((tx: BlockchainTransaction) => (
                <div key={tx.txId} className="flex justify-between items-center py-2 border-b text-sm">
                  <div className="w-5/12">
                    <div className="font-medium">{formatAddress(tx.fromAddress)}</div>
                    <div className="text-muted-foreground text-xs">To: {formatAddress(tx.toAddress)}</div>
                  </div>
                  <div className="w-3/12 text-right font-mono">
                    {tx.amount.toFixed(6)} BTC
                    <div className="text-muted-foreground text-xs">Fee: {tx.fee.toFixed(8)}</div>
                  </div>
                  <div className="w-2/12 text-right">
                    {getStatusBadge(tx.status)}
                  </div>
                  <div className="w-2/12 text-right text-muted-foreground">
                    {formatRelativeTime(tx.timestamp)}
                  </div>
                </div>
              ))}
              
              {transactions?.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No transactions found
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="statistics">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-muted rounded-md">
                <div className="text-3xl font-bold">{pendingTransactions}</div>
                <div className="text-muted-foreground text-sm">Pending Transactions</div>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <div className="text-3xl font-bold">{confirmedTransactions}</div>
                <div className="text-muted-foreground text-sm">Confirmed Transactions</div>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <div className="text-3xl font-bold">{totalVolume.toFixed(4)}</div>
                <div className="text-muted-foreground text-sm">Total Volume (BTC)</div>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <div className="text-3xl font-bold">{transactions?.length || 0}</div>
                <div className="text-muted-foreground text-sm">Total Transactions</div>
              </div>
            </div>
            
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-4">Network Quantum Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Quantum Entropy</span>
                  <span className="font-mono">84.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Entangled Ordinals</span>
                  <span className="font-mono">1,279 / 3,333</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Observed States</span>
                  <span className="font-mono">43.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Uncertainty Factor</span>
                  <span className="font-mono">±0.26</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="treasury">
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-lg border">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-medium">CatDAO Treasury</h3>
                  <Badge variant="outline">Multisig 3/5</Badge>
                </div>
                
                <div className="text-4xl font-bold mb-1">
                  {treasuryBalance?.btc.toFixed(4)} BTC
                </div>
                <div className="text-xl text-muted-foreground mb-6">
                  ≈ ${treasuryBalance?.usd.toLocaleString()}
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>Treasury Allocation</span>
                    <span></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                    <span className="text-sm">Development Fund - 45%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-secondary"></div>
                    <span className="text-sm">Pet Rescue Initiative - 30%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                    <span className="text-sm">Community Grants - 15%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    <span className="text-sm">Emergency Reserve - 10%</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Recent Treasury Activity</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b text-sm">
                    <div>
                      <div className="font-medium">Pet Rescue Donation</div>
                      <div className="text-xs text-muted-foreground">Approved by governance vote</div>
                    </div>
                    <div className="font-mono text-red-500">-0.25 BTC</div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b text-sm">
                    <div>
                      <div className="font-medium">NFT Royalties</div>
                      <div className="text-xs text-muted-foreground">Secondary market sales</div>
                    </div>
                    <div className="font-mono text-green-500">+0.42 BTC</div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b text-sm">
                    <div>
                      <div className="font-medium">Protocol Fees</div>
                      <div className="text-xs text-muted-foreground">7-day accumulation</div>
                    </div>
                    <div className="font-mono text-green-500">+0.18 BTC</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}