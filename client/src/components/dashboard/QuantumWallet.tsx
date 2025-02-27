import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

// Quantum principles applied to blockchain
type QuantumState = 'superposition' | 'entangled' | 'observed' | 'collapsed';

type QuantumAccount = {
  address: string;
  publicKey: string;
  balance: number;
  quantumState: QuantumState;
  entanglementProbability: number;
  balanceObservable: boolean;
  lastObserved: string | null;
  coherence: number; // percentage of quantum coherence (0-100)
};

export default function QuantumWallet() {
  const [walletState, setWalletState] = useState<QuantumAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [observing, setObserving] = useState(false);
  const { toast } = useToast();

  // Generate a simulated quantum-enhanced wallet account
  const generateQuantumWallet = (): QuantumAccount => {
    // Generate a deterministic "random" address for demo purposes
    const address = `qc1q${Math.random().toString(36).substring(2, 10)}`;
    const publicKey = `Q${Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)).join('')}`;
    
    // Initially in superposition until observed
    return {
      address,
      publicKey,
      balance: 0, // Balance is indeterminate in superposition
      quantumState: 'superposition',
      entanglementProbability: Math.random() * 0.8, // Probability of entanglement with other accounts
      balanceObservable: false,
      lastObserved: null,
      coherence: 100, // Full quantum coherence initially
    };
  };

  useEffect(() => {
    // Simulate wallet generation with a delay
    const timer = setTimeout(() => {
      setWalletState(generateQuantumWallet());
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Simulate quantum observation (which collapses superposition)
  const observeWallet = () => {
    if (!walletState) return;
    
    setObserving(true);
    
    // Simulating a delay in quantum observation
    setTimeout(() => {
      // Apply quantum collapse based on Schrödinger's cat principle
      const newBalance = Math.random() > 0.5 
        ? Math.random() * 5 + 3 // "Alive" state - higher balance
        : Math.random() * 0.5;  // "Dead" state - lower balance
      
      // Update quantum state
      setWalletState({
        ...walletState,
        balance: newBalance,
        quantumState: 'observed',
        balanceObservable: true,
        lastObserved: new Date().toISOString(),
        coherence: Math.random() * 40 + 10, // Coherence drops after observation
      });
      
      setObserving(false);
      
      toast({
        title: 'Quantum State Collapsed',
        description: "Your wallet's quantum state has been observed and collapsed to a specific value.",
      });
    }, 3000);
  };

  // Entangle wallet with Bitcoin blockchain
  const entangleWallet = () => {
    if (!walletState) return;
    
    setObserving(true);
    
    // Simulate blockchain entanglement delay
    setTimeout(() => {
      setWalletState({
        ...walletState,
        quantumState: 'entangled',
        entanglementProbability: 1.0,
        coherence: Math.random() * 30 + 60, // Higher coherence due to entanglement
      });
      
      setObserving(false);
      
      toast({
        title: 'Wallet Entangled',
        description: 'Your quantum wallet is now entangled with the Bitcoin blockchain.',
      });
    }, 2500);
  };

  // Format values
  const formatBitcoin = (amount: number) => {
    return amount.toFixed(8);
  };

  // Get badge style for quantum state
  const getStateBadge = (state: QuantumState) => {
    switch (state) {
      case 'superposition':
        return { variant: 'secondary' as const, icon: 'wave-square' };
      case 'entangled':
        return { variant: 'default' as const, icon: 'link' };
      case 'observed':
        return { variant: 'outline' as const, icon: 'eye' };
      case 'collapsed':
        return { variant: 'destructive' as const, icon: 'compress' };
      default:
        return { variant: 'outline' as const, icon: 'question' };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Quantum-Enhanced Wallet</span>
          {!loading && walletState && (
            <Badge variant={getStateBadge(walletState.quantumState).variant}>
              <i className={`fas fa-${getStateBadge(walletState.quantumState).icon} mr-1`}></i>
              {walletState.quantumState.charAt(0).toUpperCase() + walletState.quantumState.slice(1)}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-8 w-3/4 mx-auto" />
          </div>
        ) : walletState ? (
          <>
            <div className="p-4 bg-muted rounded-md">
              <div className="mb-2">
                <span className="text-sm text-muted-foreground">Public Address</span>
                <p className="font-mono text-sm break-all">{walletState.address}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Quantum Public Key</span>
                <p className="font-mono text-xs break-all truncate">{walletState.publicKey}</p>
              </div>
            </div>
            
            <div className="p-4 rounded-md bg-secondary/10 border border-secondary/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Balance</span>
                {walletState.balanceObservable ? (
                  <span className="font-mono font-bold">{formatBitcoin(walletState.balance)} BTC</span>
                ) : (
                  <span className="italic text-muted-foreground">
                    <i className="fas fa-wave-square mr-1"></i> In superposition
                  </span>
                )}
              </div>
              
              <div className="mb-2">
                <span className="text-xs text-muted-foreground">Quantum Coherence</span>
                <Progress value={walletState.coherence} className="h-2 mt-1" />
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  Entanglement: {(walletState.entanglementProbability * 100).toFixed(0)}%
                </span>
                {walletState.lastObserved && (
                  <span>
                    Last observed: {new Date(walletState.lastObserved).toLocaleTimeString()}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex justify-center space-x-3">
              <Button 
                variant="outline"
                disabled={walletState.quantumState === 'observed' || observing}
                onClick={observeWallet}
              >
                {observing ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i> Observing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-eye mr-2"></i> Observe State
                  </>
                )}
              </Button>
              
              <Button
                variant="default"
                disabled={walletState.quantumState === 'entangled' || observing}
                onClick={entangleWallet}
              >
                {observing ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i> Entangling...
                  </>
                ) : (
                  <>
                    <i className="fas fa-link mr-2"></i> Entangle
                  </>
                )}
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground text-center mt-2">
              <p>
                Quantum wallets exist in a superposition until observed. Like Schrödinger's cat,
                the balance exists as multiple possibilities simultaneously.
              </p>
            </div>
          </>
        ) : (
          <div className="text-center p-4">
            <p className="text-muted-foreground">Failed to generate quantum wallet</p>
            <Button onClick={() => window.location.reload()} className="mt-2">Retry</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}