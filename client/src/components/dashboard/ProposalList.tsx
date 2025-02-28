import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { VoteIcon } from "lucide-react";

type Proposal = {
  id: number;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  endDate: string;
  status: string;
};

export default function ProposalList() {
  const { data: proposals, isLoading } = useQuery({
    queryKey: ['/api/proposals/active'],
  });
  
  // Calculate days until proposal ends
  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    return diffDays > 0 ? diffDays : 0;
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
    <Card className="shadow h-full">
      <CardHeader className="border-b border-border">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <VoteIcon className="h-4 w-4 mr-2 text-secondary" />
            Active Proposals
          </CardTitle>
          <Link href="/governance">
            <span className="text-secondary text-sm hover:underline cursor-pointer">
              View All
            </span>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <div className="p-4 text-center">
            <p className="text-muted-foreground">Loading proposals...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {proposals?.length > 0 ? (
              proposals.map((proposal: Proposal) => {
                const percentages = getVotePercentage(proposal);
                const daysRemaining = getDaysRemaining(proposal.endDate);
                
                return (
                  <div key={proposal.id} className="p-3 hover:bg-muted rounded-lg">
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
                        <span>For: {percentages.for}%</span>
                        <span>Against: {percentages.against}%</span>
                      </div>
                      <Progress value={percentages.for} />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No active proposals</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}