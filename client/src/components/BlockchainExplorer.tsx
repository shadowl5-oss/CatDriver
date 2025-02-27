import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const MOCK_BLOCKS = [
  {
    height: 790213,
    hash: '00000000000000000000e5cba9f36d1482de3a48f25a6aab5155760203afd2cd',
    timestamp: '2023-05-15T14:23:41Z',
    transactions: 2416,
    size: 1548823,
    quantumEntropy: 87,
    miner: 'F2Pool',
    fee: 0.42156,
    difficulty: 48.71,
    quantumState: 'high'
  },
  {
    height: 790212,
    hash: '00000000000000000000f76ae6a96f32ecceadad0ce16c9c357d47b866d6d855',
    timestamp: '2023-05-15T14:12:22Z',
    transactions: 1987,
    size: 1246729,
    quantumEntropy: 62,
    miner: 'Binance Pool',
    fee: 0.35421,
    difficulty: 48.71,
    quantumState: 'medium'
  },
  {
    height: 790211,
    hash: '00000000000000000003d4883a05263d6fae1fb7e9923b7f66138897c5d3553b',
    timestamp: '2023-05-15T13:58:47Z',
    transactions: 2231,
    size: 1376942,
    quantumEntropy: 79,
    miner: 'AntPool',
    fee: 0.37896,
    difficulty: 48.71,
    quantumState: 'high'
  },
  {
    height: 790210,
    hash: '00000000000000000001c8ac9ffe0dc73c2b4adbfb0c7e9e47fd47b00720c2df',
    timestamp: '2023-05-15T13:42:18Z',
    transactions: 1674,
    size: 1124563,
    quantumEntropy: 41,
    miner: 'Foundry USA',
    fee: 0.28921,
    difficulty: 48.71,
    quantumState: 'low'
  },
  {
    height: 790209,
    hash: '000000000000000000026a8613a3b9ee2ca9427cc12a12678da4f1ef8d622439',
    timestamp: '2023-05-15T13:29:55Z',
    transactions: 1945,
    size: 1298731,
    quantumEntropy: 58,
    miner: 'ViaBTC',
    fee: 0.32415,
    difficulty: 48.71,
    quantumState: 'medium'
  }
];

const MOCK_TXNS = [
  {
    txid: '92f1b7a9df43b987c9e9f0110cb2db3bf9bd8f42aed732f7e6c3019da9c12345',
    block: 790213,
    timestamp: '2023-05-15T14:22:37Z',
    inputs: 2,
    outputs: 3,
    amount: 1.25643,
    fee: 0.00012,
    quantumProbability: 94,
    quantumState: 'entangled'
  },
  {
    txid: '63a7b2d1e5f9c8a4b6d5e3f2a1c9b8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1',
    block: 790213,
    timestamp: '2023-05-15T14:21:19Z',
    inputs: 1,
    outputs: 2,
    amount: 0.52146,
    fee: 0.00005,
    quantumProbability: 62,
    quantumState: 'observed'
  },
  {
    txid: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    block: 790212,
    timestamp: '2023-05-15T14:11:43Z',
    inputs: 3,
    outputs: 2,
    amount: 2.74159,
    fee: 0.00018,
    quantumProbability: 78,
    quantumState: 'superposition'
  },
  {
    txid: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
    block: 790212,
    timestamp: '2023-05-15T14:10:27Z',
    inputs: 1,
    outputs: 1,
    amount: 0.18932,
    fee: 0.00003,
    quantumProbability: 31,
    quantumState: 'collapsed'
  },
  {
    txid: 'f1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e6d7c8b9a0f1e2',
    block: 790211,
    timestamp: '2023-05-15T13:58:12Z',
    inputs: 2,
    outputs: 4,
    amount: 1.86427,
    fee: 0.00014,
    quantumProbability: 85,
    quantumState: 'entangled'
  }
];

export default function BlockchainExplorer() {
  const [activeTab, setActiveTab] = useState('blocks');
  const [blockHeight, setBlockHeight] = useState('');
  const [txId, setTxId] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<typeof MOCK_BLOCKS[0] | null>(null);
  const [selectedTx, setSelectedTx] = useState<typeof MOCK_TXNS[0] | null>(null);
  
  const handleSearch = () => {
    if (activeTab === 'blocks' && blockHeight) {
      const block = MOCK_BLOCKS.find(b => b.height === parseInt(blockHeight));
      setSelectedBlock(block || null);
      if (!block) {
        alert('Block not found');
      }
    } else if (activeTab === 'transactions' && txId) {
      const tx = MOCK_TXNS.find(t => t.txid.includes(txId));
      setSelectedTx(tx || null);
      if (!tx) {
        alert('Transaction not found');
      }
    }
  };
  
  const getStateColor = (state: string) => {
    switch (state) {
      case 'high': return 'bg-green-600';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
      case 'entangled': return 'bg-purple-600';
      case 'superposition': return 'bg-blue-500';
      case 'observed': return 'bg-cyan-500';
      case 'collapsed': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };
  
  const formatHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 6)}`;
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quantum Blockchain Explorer</CardTitle>
        <CardDescription>
          Explore Bitcoin blocks with quantum properties
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="blocks">Blocks</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          
          <div className="mb-6">
            <div className="flex gap-3">
              {activeTab === 'blocks' ? (
                <div className="flex-1">
                  <Label htmlFor="blockSearch">Search by Block Height</Label>
                  <div className="flex gap-2 mt-1">
                    <Input 
                      id="blockSearch" 
                      placeholder="Enter block height" 
                      value={blockHeight}
                      onChange={(e) => setBlockHeight(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleSearch}>Search</Button>
                  </div>
                </div>
              ) : (
                <div className="flex-1">
                  <Label htmlFor="txSearch">Search by Transaction ID</Label>
                  <div className="flex gap-2 mt-1">
                    <Input 
                      id="txSearch" 
                      placeholder="Enter transaction ID" 
                      value={txId}
                      onChange={(e) => setTxId(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleSearch}>Search</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {selectedBlock && activeTab === 'blocks' ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Block #{selectedBlock.height}</h3>
                <Badge>
                  Quantum Entropy: {selectedBlock.quantumEntropy}%
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Block Hash</Label>
                  <p className="font-mono text-sm break-all">{selectedBlock.hash}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Timestamp</Label>
                    <p>{formatDate(selectedBlock.timestamp)}</p>
                  </div>
                  <div>
                    <Label>Miner</Label>
                    <p>{selectedBlock.miner}</p>
                  </div>
                  <div>
                    <Label>Difficulty</Label>
                    <p>{selectedBlock.difficulty} T</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Transactions</Label>
                    <p>{selectedBlock.transactions}</p>
                  </div>
                  <div>
                    <Label>Size</Label>
                    <p>{selectedBlock.size.toLocaleString()} bytes</p>
                  </div>
                  <div>
                    <Label>Fees</Label>
                    <p>{selectedBlock.fee.toFixed(5)} BTC</p>
                  </div>
                  <div>
                    <Label>Quantum State</Label>
                    <div className="flex items-center mt-1">
                      <div 
                        className={`w-3 h-3 rounded-full mr-2 ${getStateColor(selectedBlock.quantumState)}`}
                      ></div>
                      <span className="capitalize">{selectedBlock.quantumState}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Quantum Entropy</Label>
                  <div className="mt-1">
                    <Progress value={selectedBlock.quantumEntropy} className="h-2" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Higher entropy indicates increased quantum uncertainty in block mining
                  </p>
                </div>
              </div>
              
              <div>
                <Button variant="outline" size="sm" onClick={() => setSelectedBlock(null)}>
                  Back to List
                </Button>
              </div>
            </div>
          ) : selectedTx && activeTab === 'transactions' ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Transaction Details</h3>
                <Badge variant={selectedTx.quantumState === 'entangled' ? 'default' : 
                               selectedTx.quantumState === 'superposition' ? 'secondary' : 'outline'}>
                  {selectedTx.quantumState}
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Transaction ID</Label>
                  <p className="font-mono text-sm break-all">{selectedTx.txid}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Block</Label>
                    <p>#{selectedTx.block}</p>
                  </div>
                  <div>
                    <Label>Timestamp</Label>
                    <p>{formatDate(selectedTx.timestamp)}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge variant="outline">Confirmed</Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Amount</Label>
                    <p>{selectedTx.amount.toFixed(8)} BTC</p>
                  </div>
                  <div>
                    <Label>Fee</Label>
                    <p>{selectedTx.fee.toFixed(5)} BTC</p>
                  </div>
                  <div>
                    <Label>Inputs</Label>
                    <p>{selectedTx.inputs}</p>
                  </div>
                  <div>
                    <Label>Outputs</Label>
                    <p>{selectedTx.outputs}</p>
                  </div>
                </div>
                
                <div>
                  <Label>Quantum Probability</Label>
                  <div className="mt-1">
                    <Progress value={selectedTx.quantumProbability} className="h-2" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Probability of quantum effects influencing transaction outcomes
                  </p>
                </div>
                
                <div className="p-4 bg-secondary/10 rounded-md border border-secondary/20">
                  <h4 className="font-medium mb-2">Quantum State Explanation</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedTx.quantumState === 'entangled' ? 
                      "This transaction is entangled with other transactions. Its quantum state is linked to them, creating potential correlations across the blockchain." : 
                     selectedTx.quantumState === 'superposition' ? 
                      "This transaction exists in multiple potential states simultaneously. Its final state hasn't been determined until explicitly observed." : 
                     selectedTx.quantumState === 'observed' ? 
                      "This transaction has been observed, collapsing its quantum superposition to a specific state, but maintaining some quantum properties." : 
                      "This transaction's quantum state has fully collapsed to a classical state with deterministic properties."}
                  </p>
                </div>
              </div>
              
              <div>
                <Button variant="outline" size="sm" onClick={() => setSelectedTx(null)}>
                  Back to List
                </Button>
              </div>
            </div>
          ) : (
            <TabsContent value="blocks" className="mt-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Height</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Transactions</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Quantum Entropy</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_BLOCKS.map((block) => (
                      <TableRow key={block.height}>
                        <TableCell>{block.height}</TableCell>
                        <TableCell>{formatDate(block.timestamp)}</TableCell>
                        <TableCell>{block.transactions}</TableCell>
                        <TableCell>{(block.size / 1000000).toFixed(2)} MB</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div 
                              className={`w-2 h-2 rounded-full mr-2 ${getStateColor(block.quantumState)}`}
                            ></div>
                            <span>{block.quantumEntropy}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedBlock(block)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          )}
          
          <TabsContent value="transactions" className="mt-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Block</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Amount (BTC)</TableHead>
                    <TableHead>Quantum State</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_TXNS.map((tx) => (
                    <TableRow key={tx.txid}>
                      <TableCell className="font-mono text-xs">{formatHash(tx.txid)}</TableCell>
                      <TableCell>{tx.block}</TableCell>
                      <TableCell>{formatDate(tx.timestamp)}</TableCell>
                      <TableCell>{tx.amount.toFixed(5)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div 
                            className={`w-2 h-2 rounded-full mr-2 ${getStateColor(tx.quantumState)}`}
                          ></div>
                          <span className="capitalize">{tx.quantumState}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedTx(tx)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-6" />
        
        <div>
          <h3 className="text-lg font-medium mb-2">Quantum Mechanics in the Blockchain</h3>
          <p className="text-sm text-muted-foreground">
            We use principles from quantum mechanics to analyze Bitcoin blocks and transactions. 
            Blocks with high entropy may contain special quantum properties that affect ordinal 
            values and states. Our system measures quantum entanglement between transactions and 
            tracks quantum superposition states for unobserved blockchain data.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}