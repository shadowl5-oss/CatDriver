import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/dashboard/StatCard";
import TokenChart from "@/components/dashboard/TokenChart";
import AssetsList from "@/components/dashboard/AssetsList";
import CatCollection from "@/components/dashboard/CatCollection";
import GovernanceProposals from "@/components/dashboard/GovernanceProposals";
import QuantumWallet from "@/components/dashboard/QuantumWallet";
import BlockchainActivity from "@/components/dashboard/BlockchainActivity";
import { enrichCatNftWithOrdinalData } from "@/services/blockchain";

export default function Dashboard() {
  const { data: currentUser } = useQuery({
    queryKey: ['/api/current-user'],
  });
  
  const { data: portfolio, isLoading: isPortfolioLoading } = useQuery({
    queryKey: ['/api/portfolio', currentUser?.id],
    enabled: !!currentUser?.id,
  });
  
  const { data: tokenData } = useQuery({
    queryKey: ['/api/token-prices/CDV', { limit: 1 }],
  });
  
  const tokenPrice = tokenData?.[0]?.price || 0.0734;
  const tokenChange = 3.2; // Placeholder or calculate from historical data
  
  return (
    <div className="px-4 py-6 md:px-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your Cat Driven Value portfolio</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button className="bg-secondary hover:bg-secondary/90 text-white">
            <i className="fas fa-plus mr-2"></i> Add Funds
          </Button>
          <Button variant="outline">
            <i className="fas fa-download mr-2"></i> Export
          </Button>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Portfolio Value"
          value={isPortfolioLoading ? "Loading..." : `$${portfolio?.totalValue.toLocaleString()}`}
          change={portfolio?.growthChange || 12.4}
          icon="fa-wallet"
          iconBgColor="primary"
          timeFrame="past 30d"
        />
        
        <StatCard
          title="CDV Token Price"
          value={`$${tokenPrice.toFixed(4)}`}
          change={tokenChange}
          icon="fa-coins"
          iconBgColor="secondary"
          timeFrame="past 24h"
        />
        
        <StatCard
          title="Portfolio Growth"
          value={`${portfolio?.growth || 18.7}%`}
          change={portfolio?.growthChange || 5.1}
          icon="fa-chart-line"
          iconBgColor="accent"
          timeFrame="past 30d"
        />
        
        <StatCard
          title="Staking Rewards"
          value={`${portfolio?.stakingRewards || 121} CDV`}
          change={2.8}
          icon="fa-layer-group"
          iconBgColor="primary"
          timeFrame="past 7d"
        />
      </div>
      
      {/* Chart & Assets Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <TokenChart />
        <AssetsList />
      </div>
      
      {/* Middle Row - Quantum Blockchain Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <QuantumWallet />
        <BlockchainActivity />
      </div>
      
      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <CatCollection />
        <GovernanceProposals />
      </div>
    </div>
  );
}
