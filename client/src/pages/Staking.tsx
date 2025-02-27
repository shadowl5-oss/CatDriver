import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

export default function Staking() {
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const { toast } = useToast();
  
  // Mock staking data
  const stakingData = {
    stakedAmount: 1530782,
    rewardRate: 5.2,
    totalRewards: 121,
    stakingPeriod: 45,
    totalStakers: 12548,
    availableBalance: 0
  };
  
  // Mock rewards history data
  const rewardsHistory = [
    { week: "Week 1", rewards: 23 },
    { week: "Week 2", rewards: 25 },
    { week: "Week 3", rewards: 27 },
    { week: "Week 4", rewards: 22 },
    { week: "Week 5", rewards: 24 }
  ];
  
  // Handle staking
  const handleStake = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to stake",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Tokens staked successfully",
      description: `You have staked ${stakeAmount} CDV tokens`
    });
    
    setStakeAmount("");
  };
  
  // Handle unstaking
  const handleUnstake = () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to unstake",
        variant: "destructive"
      });
      return;
    }
    
    if (parseFloat(unstakeAmount) > stakingData.stakedAmount) {
      toast({
        title: "Insufficient staked balance",
        description: "You don't have enough staked tokens",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Tokens unstaked successfully",
      description: `You have unstaked ${unstakeAmount} CDV tokens`
    });
    
    setUnstakeAmount("");
  };
  
  // Handle claiming rewards
  const handleClaimRewards = () => {
    if (stakingData.totalRewards <= 0) {
      toast({
        title: "No rewards to claim",
        description: "You don't have any rewards to claim right now",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Rewards claimed successfully",
      description: `You have claimed ${stakingData.totalRewards} CDV tokens`
    });
  };
  
  return (
    <div className="px-4 py-6 md:px-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Staking</h1>
          <p className="text-muted-foreground mt-1">Stake your CDV tokens and earn rewards</p>
        </div>
      </div>
      
      {/* Staking Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-1">Total Staked</p>
              <p className="text-3xl font-mono font-medium">
                {stakingData.stakedAmount.toLocaleString()} CDV
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-1">Current APY</p>
              <p className="text-3xl font-mono font-medium text-secondary">
                {stakingData.rewardRate}%
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-1">Your Rewards</p>
              <p className="text-3xl font-mono font-medium text-green-500">
                {stakingData.totalRewards} CDV
              </p>
              <Button className="mt-4" onClick={handleClaimRewards}>
                Claim Rewards
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Staking Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Stake & Unstake</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="stake">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="stake" className="flex-1">Stake Tokens</TabsTrigger>
                <TabsTrigger value="unstake" className="flex-1">Unstake Tokens</TabsTrigger>
              </TabsList>
              
              <TabsContent value="stake">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Available Balance: {stakingData.availableBalance.toLocaleString()} CDV
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Enter amount to stake"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                      />
                      <Button variant="outline" onClick={() => setStakeAmount("1000")}>
                        Max
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Staking Period</span>
                      <span>30 days minimum</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Early Unstaking Fee</span>
                      <span>10%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Reward Rate</span>
                      <span className="text-secondary">{stakingData.rewardRate}% APY</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" onClick={handleStake}>
                    Stake Tokens
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="unstake">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Staked Balance: {stakingData.stakedAmount.toLocaleString()} CDV
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Enter amount to unstake"
                        value={unstakeAmount}
                        onChange={(e) => setUnstakeAmount(e.target.value)}
                      />
                      <Button variant="outline" onClick={() => setUnstakeAmount(stakingData.stakedAmount.toString())}>
                        Max
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Staking Period Elapsed</span>
                      <span>{stakingData.stakingPeriod} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Fee</span>
                      <span>{stakingData.stakingPeriod > 30 ? "0%" : "10%"}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" onClick={handleUnstake}>
                    Unstake Tokens
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Staking Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Rewards Earned</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rewardsHistory}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted) / 0.4)" />
                    <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--border))',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                    <Bar dataKey="rewards" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Staking Progress</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Minimum Staking Period</span>
                    <span>{stakingData.stakingPeriod} / 30 days</span>
                  </div>
                  <Progress value={(stakingData.stakingPeriod / 30) * 100} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Next Reward</span>
                    <span>In 2 days</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold">Tip:</span> The longer you stake, the more rewards you earn. Bonus multipliers apply after 90 days of continuous staking.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Staking Pool Info */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Staking Pool Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Total Stakers</p>
                <p className="text-xl font-medium">{stakingData.totalStakers.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Average Staking Period</p>
                <p className="text-xl font-medium">68 days</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Pool Utilization</p>
                <p className="text-xl font-medium">87%</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Total Value Locked</p>
                <p className="text-xl font-medium">112,359,210 CDV</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Rewards Distribution</p>
                <p className="text-xl font-medium">Daily</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Current Pool Size</p>
                <p className="text-xl font-medium">125,000,000 CDV</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Reward Calculation</p>
                <p className="text-base">Based on your share of the total staking pool</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Reward Boosters</p>
                <p className="text-base">
                  90+ days: 1.2x multiplier<br />
                  180+ days: 1.5x multiplier
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
