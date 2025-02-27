import { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BlockchainTransaction, 
  getTransactionHistory, 
  getTreasuryBalance 
} from "@/services/blockchain";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function BlockchainActivity() {
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([]);
  const [treasury, setTreasury] = useState<{ btc: number; usd: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [txHistory, treasuryData] = await Promise.all([
          getTransactionHistory(),
          getTreasuryBalance()
        ]);
        
        setTransactions(txHistory);
        setTreasury(treasuryData);
      } catch (error) {
        console.error("Error fetching blockchain data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">CatDAO Treasury</CardTitle>
          <CardDescription>Current balance and blockchain activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">BTC Balance</p>
              {loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <p className="text-2xl font-bold">{treasury?.btc.toFixed(4)} BTC</p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">USD Value</p>
              {loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <p className="text-2xl font-bold">
                  {treasury ? new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(treasury.usd) : '$0.00'}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
          <CardDescription>Latest blockchain activity</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {Array(4).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">No transactions found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.txId}>
                      <TableCell className="font-mono text-xs">
                        {tx.txId.substring(0, 8)}...
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {truncateAddress(tx.fromAddress)}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {truncateAddress(tx.toAddress)}
                      </TableCell>
                      <TableCell>
                        {tx.amount.toFixed(4)} BTC
                      </TableCell>
                      <TableCell>
                        {formatDate(tx.timestamp)}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            tx.status === 'confirmed' ? 'default' : 
                            tx.status === 'pending' ? 'outline' : 'destructive'
                          }
                        >
                          {tx.status} {tx.status === 'confirmed' && `(${tx.confirmations})`}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}