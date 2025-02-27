import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { ChevronDown, Copy, ExternalLink, RefreshCw, Wallet } from 'lucide-react';
import { 
  getBlockchainProvider, 
  BlockchainProvider, 
  BlockchainTransaction 
} from '@/services/blockchain';

interface WalletConnectorProps {
  type?: 'ethereum' | 'bitcoin';
  onAddressChange?: (address: string | null) => void;
}

export default function WalletConnector({ 
  type = 'bitcoin', 
  onAddressChange 
}: WalletConnectorProps) {
  const [provider, setProvider] = useState<BlockchainProvider | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const { toast } = useToast();
  
  useEffect(() => {
    // Initialize provider
    const blockchainProvider = getBlockchainProvider(type);
    setProvider(blockchainProvider);
    
    // Check if already connected (e.g., after page refresh)
    if (blockchainProvider.isConnected()) {
      const currentAddress = blockchainProvider.getAddress();
      setAddress(currentAddress);
      if (onAddressChange) onAddressChange(currentAddress);
      
      // Load balance and transactions
      loadWalletData(blockchainProvider, currentAddress);
    }
  }, [type, onAddressChange]);
  
  const loadWalletData = async (
    providerToUse: BlockchainProvider = provider!, 
    addressToUse: string | null = address
  ) => {
    if (!providerToUse || !addressToUse) return;
    
    try {
      // Get balance
      const currentBalance = await providerToUse.getBalance(addressToUse);
      setBalance(currentBalance);
      
      // Get transaction history
      setIsLoadingTransactions(true);
      const txHistory = await getTransactionHistory(providerToUse, addressToUse);
      setTransactions(txHistory);
    } catch (error) {
      console.error('Error loading wallet data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load wallet data',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingTransactions(false);
    }
  };
  
  const getTransactionHistory = async (
    providerToUse: BlockchainProvider, 
    addressToUse: string
  ): Promise<BlockchainTransaction[]> => {
    // This would normally call a blockchain explorer API or node RPC
    // For demo purposes we're using a mock implementation
    const { getTransactionHistory } = await import('@/services/blockchain');
    return getTransactionHistory(addressToUse);
  };
  
  const connectWallet = async () => {
    if (!provider) return;
    
    try {
      setIsConnecting(true);
      const connectedAddress = await provider.connect();
      setAddress(connectedAddress);
      if (onAddressChange) onAddressChange(connectedAddress);
      
      toast({
        title: 'Wallet Connected',
        description: `Successfully connected to ${shortenAddress(connectedAddress)}`,
      });
      
      // Load wallet data
      loadWalletData(provider, connectedAddress);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: 'Connection Failed',
        description: 'Failed to connect wallet',
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(false);
    }
  };
  
  const disconnectWallet = async () => {
    if (!provider) return;
    
    try {
      await provider.disconnect();
      setAddress(null);
      setBalance(null);
      setTransactions([]);
      if (onAddressChange) onAddressChange(null);
      
      toast({
        title: 'Wallet Disconnected',
        description: 'Successfully disconnected wallet',
      });
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast({
        title: 'Disconnection Failed',
        description: 'Failed to disconnect wallet',
        variant: 'destructive',
      });
    }
  };
  
  const sendTransaction = async () => {
    if (!provider || !address || !recipientAddress || !sendAmount) return;
    
    try {
      setIsSending(true);
      setSendProgress(10);
      
      // Progress simulation
      const progressInterval = setInterval(() => {
        setSendProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 500);
      
      // Send transaction
      const amount = parseFloat(sendAmount);
      const transaction = await provider.sendTransaction(recipientAddress, amount);
      
      // Clear interval and set progress to 100%
      clearInterval(progressInterval);
      setSendProgress(100);
      
      setTimeout(() => {
        // Reset form and close dialog
        setIsSending(false);
        setSendDialogOpen(false);
        setSendProgress(0);
        setRecipientAddress('');
        setSendAmount('');
        
        // Show success toast
        toast({
          title: 'Transaction Sent',
          description: `Transaction ID: ${shortenTxId(transaction.txId)}`,
        });
        
        // Reload wallet data
        loadWalletData();
      }, 1000);
    } catch (error) {
      console.error('Error sending transaction:', error);
      setIsSending(false);
      setSendProgress(0);
      
      toast({
        title: 'Transaction Failed',
        description: 'Failed to send transaction',
        variant: 'destructive',
      });
    }
  };
  
  const copyToClipboard = (text: string, label: string = 'Address') => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${label} Copied`,
      description: 'Copied to clipboard',
    });
  };
  
  // Helper functions
  const shortenAddress = (addr: string | null): string => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };
  
  const shortenTxId = (txId: string): string => {
    return `${txId.slice(0, 8)}...${txId.slice(-8)}`;
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const generateTestAddress = () => {
    // Generate a random Bitcoin-like address for testing
    const { generateWalletAddress } = require('@/services/blockchain');
    setRecipientAddress(generateWalletAddress());
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Connection</CardTitle>
        <CardDescription>
          Connect your {type === 'bitcoin' ? 'Bitcoin' : 'Ethereum'} wallet to interact with the blockchain
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {address ? (
          <>
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <Label>Wallet Address</Label>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => copyToClipboard(address)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => window.open(`https://mempool.space/address/${address}`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="font-mono text-sm break-all">{address}</div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="space-y-1">
                <Label>Balance</Label>
                <div className="text-2xl font-bold">{balance?.toFixed(8) || '0.00000000'} {type === 'bitcoin' ? 'BTC' : 'ETH'}</div>
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => loadWalletData()}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="default"
                onClick={() => setSendDialogOpen(true)}
              >
                Send
              </Button>
              <Button 
                variant="outline"
                onClick={disconnectWallet}
              >
                Disconnect Wallet
              </Button>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Transaction History</h3>
              
              {isLoadingTransactions ? (
                <div className="text-center py-8">
                  <RefreshCw className="animate-spin h-8 w-8 mx-auto text-primary" />
                  <p className="mt-2 text-sm text-muted-foreground">Loading transactions...</p>
                </div>
              ) : transactions.length === 0 ? (
                <div className="text-center py-8 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">No transactions found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {transactions.map((tx, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">
                            {tx.fromAddress === address ? 'Sent' : 'Received'}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(tx.timestamp)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-mono ${tx.fromAddress === address ? 'text-red-500' : 'text-green-500'}`}>
                            {tx.fromAddress === address ? '-' : '+'}{tx.amount.toFixed(8)} {type === 'bitcoin' ? 'BTC' : 'ETH'}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Fee: {tx.fee.toFixed(8)}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="text-xs font-mono text-muted-foreground truncate max-w-[200px]">
                          {shortenTxId(tx.txId)}
                        </div>
                        <Badge variant={tx.status === 'confirmed' ? 'default' : tx.status === 'pending' ? 'outline' : 'destructive'}>
                          {tx.status === 'confirmed' ? `${tx.confirmations} confirmations` : tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center p-8">
            <Wallet className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
            <p className="mb-6 text-muted-foreground">
              Connect your {type === 'bitcoin' ? 'Bitcoin' : 'Ethereum'} wallet to view balance, transaction history, and manage your NFTs.
            </p>
            <Button 
              disabled={isConnecting}
              onClick={connectWallet}
              className="w-full"
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          </div>
        )}
      </CardContent>
      
      {/* Send Transaction Dialog */}
      <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send {type === 'bitcoin' ? 'Bitcoin' : 'Ethereum'}</DialogTitle>
            <DialogDescription>
              Enter the recipient address and amount to send.
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
                  placeholder="Recipient address" 
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={generateTestAddress}
                  type="button"
                >
                  Test
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="amount">Amount ({type === 'bitcoin' ? 'BTC' : 'ETH'})</Label>
                <span className="text-xs text-muted-foreground">
                  Available: {balance?.toFixed(8) || '0.00000000'}
                </span>
              </div>
              <Input 
                id="amount" 
                value={sendAmount} 
                onChange={(e) => setSendAmount(e.target.value)}
                type="number" 
                step="0.00000001"
                min="0"
                placeholder="0.00000000"
              />
            </div>
            
            {isSending && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Transaction Progress</span>
                  <span>{sendProgress}%</span>
                </div>
                <Progress value={sendProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {sendProgress < 30 ? "Initializing transaction..." : 
                   sendProgress < 70 ? "Confirming on the blockchain..." :
                   "Finalizing transaction..."}
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSendDialogOpen(false)} disabled={isSending}>
              Cancel
            </Button>
            <Button 
              onClick={sendTransaction} 
              disabled={!recipientAddress || !sendAmount || parseFloat(sendAmount) <= 0 || isSending}
            >
              {isSending ? 'Sending...' : 'Send'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}