import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

type Proposal = {
  id: number;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  endDate: string;
  status: string;
};

export default function GovernanceProposals() {
  const { data: proposals, isLoading } = useQuery({
    queryKey: ['/api/proposals/active'],
  });
  
  // Calculate days until proposal ends
  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    return diffDays;
  };
  
  // Calculate percentage of votes
  const getVotePercentage = (proposal: Proposal) => {
    const totalVotes = proposal.votesFor + proposal.votesAgainst;
    if (totalVotes === 0) return { for: 0, against: 0 };
    
    const forPercentage = Math.round((proposal.votesFor / totalVotes) * 100);
    const againstPercentage = 100 - forPercentage;
    
    return { for: forPercentage, against: againstPercentage };
  };

  return (
    <Card className="shadow">
      <CardHeader className="border-b border-border">
        <div className="flex justify-between items-center">
          <CardTitle>Active Governance Proposals</CardTitle>
          <Link href="/governance">
            <a className="text-secondary text-sm hover:underline">View All</a>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        {isLoading ? (
          <div className="p-4 text-center">
            <p className="text-muted-foreground">Loading proposals...</p>
          </div>
        ) : (
          <>
            {proposals?.map((proposal: Proposal) => {
              const percentages = getVotePercentage(proposal);
              const daysRemaining = getDaysRemaining(proposal.endDate);
              
              return (
                <div key={proposal.id} className="p-4 hover:bg-muted rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">{proposal.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Ends in {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}
                      </p>
                    </div>
                    <div className="bg-secondary text-white text-xs rounded-full px-2 py-1 h-fit">
                      {proposal.status}
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white">For: {percentages.for}%</span>
                      <span className="text-white">Against: {percentages.against}%</span>
                    </div>
                    <div className="governance-progress bg-muted">
                      <div 
                        className="bg-green-500 h-full" 
                        style={{ width: `${percentages.for}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            <div className="p-4">
              <Button className="w-full">
                Cast Your Vote
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
