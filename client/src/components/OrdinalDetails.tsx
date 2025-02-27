import React, { useState, useEffect } from 'react';
import { CatNft } from '@/services/api';
import { 
  CatOrdinal, 
  enrichCatNftWithOrdinalData, 
  observeQuantumState,
  transferOrdinal,
  generateWalletAddress 
} from '@/services/blockchain';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

interface OrdinalDetailsProps {
  nft: CatNft;
  onBack: () => void;
}

export default function OrdinalDetails({ nft, onBack }: OrdinalDetailsProps) {
  const [ordinalData, setOrdinalData] = useState<CatOrdinal | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadOrdinalData = async () => {
      try {
        setLoading(true);
        const enrichedNft = await enrichCatNftWithOrdinalData(nft);
        setOrdinalData(enrichedNft);
      } catch (error) {
        console.error('Error loading ordinal data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load ordinal blockchain data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadOrdinalData();
  }, [nft, toast]);

  const handleObserve = () => {
    if (ordinalData) {
      const newState = observeQuantumState(ordinalData.id);
      setOrdinalData({
        ...ordinalData,
        quantumState: newState,
      });
      
      toast({
        title: 'Quantum State Changed',
        description: `The cat ordinal has been observed and its quantum state collapsed!`,
      });
    }
  };

  const formatBitcoinPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // States for the transfer dialog
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState(nft.price.toString());
  const [transferProgress, setTransferProgress] = useState(0);
  const [isTransferring, setIsTransferring] = useState(false);

  // Handle the ordinal transfer
  const handleTransfer = async () => {
    if (!ordinalData || !recipientAddress) return;
    
    try {
      setIsTransferring(true);
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setTransferProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.floor(Math.random() * 10) + 1;
        });
      }, 500);
      
      // Call the blockchain service to transfer the ordinal
      const transaction = await transferOrdinal(
        ordinalData.tokenId,
        recipientAddress,
        parseFloat(transferAmount) || 0
      );
      
      clearInterval(progressInterval);
      setTransferProgress(100);
      
      // Complete the transfer after a short delay to show 100% progress
      setTimeout(() => {
        setIsTransferring(false);
        setTransferDialogOpen(false);
        
        toast({
          title: 'Ordinal Transferred',
          description: `Transaction ID: ${transaction.txId.substring(0, 8)}...`,
        });
        
        // Reset the form
        setRecipientAddress('');
        setTransferAmount(nft.price.toString());
        setTransferProgress(0);
      }, 1000);
      
    } catch (error) {
      console.error('Error transferring ordinal:', error);
      setIsTransferring(false);
      
      toast({
        title: 'Transfer Failed',
        description: 'There was an error transferring the ordinal.',
        variant: 'destructive',
      });
    }
  };
  
  // Generate a new wallet address for demonstration
  const generateNewAddress = () => {
    const newAddress = generateWalletAddress();
    setRecipientAddress(newAddress);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" onClick={onBack}>
            ← Back
          </Button>
          <Badge variant={nft.rarity === 'Legendary' ? 'destructive' : 
                          nft.rarity === 'Epic' ? 'default' : 
                          nft.rarity === 'Rare' ? 'secondary' : 'outline'}>
            {nft.rarity}
          </Badge>
        </div>
        <CardTitle className="text-2xl mt-4">{nft.name}</CardTitle>
        <CardDescription>
          Ordinal #{ordinalData?.ordinalData.number || 'Loading...'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 relative">
            {loading ? (
              <Skeleton className="h-[300px] w-full rounded-md" />
            ) : (
              <div className="relative">
                <img 
                  src={nft.image} 
                  alt={nft.name} 
                  className="w-full h-auto rounded-md object-cover"
                />
                {ordinalData?.quantumState === 'unobserved' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white mb-2">This cat ordinal exists in a quantum superposition</p>
                      <Button onClick={handleObserve}>Observe Quantum State</Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="w-full md:w-1/2 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Inscription ID</h3>
              <p className="text-sm font-mono">{loading ? <Skeleton className="h-4 w-48" /> : ordinalData?.ordinalData.id}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Token ID</h3>
              <p className="font-mono">{nft.tokenId}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Inscription Date</h3>
              <p>{loading ? <Skeleton className="h-4 w-32" /> : (ordinalData?.inscriptionDate ? formatDate(ordinalData.inscriptionDate) : 'Unknown')}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Block Height</h3>
              <p>{loading ? <Skeleton className="h-4 w-20" /> : ordinalData?.blockHeight || 'Unknown'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Satoshi</h3>
              <p>{loading ? <Skeleton className="h-4 w-28" /> : ordinalData?.ordinalData.satoshi.toLocaleString() || 'Unknown'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">BTC Price at Inscription</h3>
              <p>{loading ? <Skeleton className="h-4 w-24" /> : (ordinalData?.btcPrice ? formatBitcoinPrice(ordinalData.btcPrice) : 'Unknown')}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Quantum State</h3>
              <Badge variant={ordinalData?.quantumState === 'observed' ? 'default' : 'outline'}>
                {loading ? <Skeleton className="h-4 w-20" /> : (ordinalData?.quantumState === 'observed' ? 'Observed' : 'Unobserved')}
              </Badge>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <h3 className="font-medium">Schrödinger's Cat Theory</h3>
          <p className="text-sm text-muted-foreground">
            This Cat Ordinal implements the famous Schrödinger's cat thought experiment. 
            Like the quantum cat that exists in a superposition of states until observed, 
            this ordinal's properties remain in flux until someone observes it. 
            Each observation collapses the quantum wave function and can affect the ordinal's value.
          </p>
        </div>
        
        {/* Quantum effects visualization */}
        {ordinalData?.quantumState === 'observed' && (
          <div className="p-4 bg-secondary/10 rounded-md border border-secondary/20">
            <h3 className="font-medium mb-2">Quantum Effects</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Coherence</h4>
                <Progress value={65} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Determines stability and reliability of quantum properties
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Entanglement</h4>
                <Progress value={43} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Connection with other quantum cat ordinals in the blockchain
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Current Value</p>
          <p className="text-xl font-bold">{nft.price} BTC</p>
        </div>
        
        <Dialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={loading}>Transfer Ordinal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Transfer Ordinal</DialogTitle>
              <DialogDescription>
                Transfer this ordinal to another Bitcoin wallet. This process will move the underlying satoshi.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Address</Label>
                <div className="flex gap-2">
                  <Input 
                    id="recipient" 
                    value={recipientAddress} 
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    placeholder="Bitcoin address" 
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={generateNewAddress}
                    type="button"
                  >
                    Generate
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Transfer Amount (BTC)</Label>
                <Input 
                  id="amount" 
                  value={transferAmount} 
                  onChange={(e) => setTransferAmount(e.target.value)}
                  type="number" 
                  step="0.0001"
                  min="0"
                />
              </div>
              
              {isTransferring && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Transfer Progress</span>
                    <span>{transferProgress}%</span>
                  </div>
                  <Progress value={transferProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {transferProgress < 30 ? "Initializing transfer..." : 
                     transferProgress < 70 ? "Confirming on the Bitcoin network..." :
                     "Finalizing quantum state transfer..."}
                  </p>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setTransferDialogOpen(false)} disabled={isTransferring}>
                Cancel
              </Button>
              <Button onClick={handleTransfer} disabled={!recipientAddress || isTransferring}>
                {isTransferring ? 'Transferring...' : 'Transfer Ordinal'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}