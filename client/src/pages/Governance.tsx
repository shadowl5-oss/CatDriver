import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Quantum from "@/components/Quantum";

export default function Governance() {
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [voteDialogOpen, setVoteDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const { data: allProposals, isLoading } = useQuery({
    queryKey: ['/api/proposals'],
  });
  
  // Filter proposals by status
  const activeProposals = allProposals?.filter((p: any) => p.status === "Voting") || [];
  const passedProposals = allProposals?.filter((p: any) => p.status === "Passed") || [];
  const rejectedProposals = allProposals?.filter((p: any) => p.status === "Rejected") || [];
  
  // Calculate days until proposal ends
  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    return diffDays;
  };
  
  // Calculate vote percentages
  const getVotePercentages = (proposal: any) => {
    const totalVotes = proposal.votesFor + proposal.votesAgainst;
    if (totalVotes === 0) return { for: 0, against: 0 };
    
    const forPercentage = Math.round((proposal.votesFor / totalVotes) * 100);
    const againstPercentage = 100 - forPercentage;
    
    return { for: forPercentage, against: againstPercentage };
  };
  
  // Handle voting
  const handleVote = async (proposalId: number, voteFor: boolean) => {
    try {
      await apiRequest("POST", `/api/proposals/${proposalId}/vote`, { voteFor });
      
      queryClient.invalidateQueries({ queryKey: ['/api/proposals'] });
      
      toast({
        title: "Vote cast successfully",
        description: `You voted ${voteFor ? "for" : "against"} the proposal.`,
      });
      
      setVoteDialogOpen(false);
    } catch (error) {
      toast({
        title: "Failed to cast vote",
        description: "There was an error casting your vote. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const renderProposalCard = (proposal: any) => {
    const percentages = getVotePercentages(proposal);
    const daysRemaining = getDaysRemaining(proposal.endDate);
    
    return (
      <Card key={proposal.id} className="mb-4">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>{proposal.title}</CardTitle>
            <div className="bg-secondary text-white text-xs rounded-full px-2 py-1">
              {proposal.status}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{proposal.description}</p>
          
          {proposal.status === "Voting" && (
            <p className="text-sm mb-4">
              Voting ends in {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}
            </p>
          )}
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>For: {percentages.for}%</span>
              <span>Against: {percentages.against}%</span>
            </div>
            <Progress value={percentages.for} />
            <div className="flex justify-between text-xs mt-2 text-muted-foreground">
              <span>{proposal.votesFor} votes</span>
              <span>{proposal.votesAgainst} votes</span>
            </div>
          </div>
          
          {proposal.status === "Voting" && (
            <Button
              className="w-full"
              onClick={() => {
                setSelectedProposal(proposal);
                setVoteDialogOpen(true);
              }}
            >
              Cast Your Vote
            </Button>
          )}
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="px-4 py-6 md:px-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Governance</h1>
          <p className="text-muted-foreground mt-1">Vote on protocol proposals and shape the future of CDV</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-secondary hover:bg-secondary/90 text-white">
                <i className="fas fa-plus mr-2"></i> Create Proposal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Proposal</DialogTitle>
                <DialogDescription>
                  Submit a new proposal for the community to vote on. You need at least 10,000 CDV tokens to create a proposal.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Proposal Title</label>
                  <input
                    className="w-full p-2 rounded-md bg-muted border border-border"
                    placeholder="CDVP-XX: Your Proposal Title"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    className="w-full p-2 rounded-md bg-muted border border-border min-h-[100px]"
                    placeholder="Describe your proposal in detail..."
                  ></textarea>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Voting Period</label>
                  <select className="w-full p-2 rounded-md bg-muted border border-border">
                    <option>3 days</option>
                    <option>5 days</option>
                    <option>7 days</option>
                    <option>14 days</option>
                  </select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Submit Proposal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Governance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-1">Total Proposals</p>
              <p className="text-3xl font-medium">{allProposals?.length || 0}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-1">Active Votes</p>
              <p className="text-3xl font-medium">{activeProposals.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-1">Your Voting Power</p>
              <p className="text-3xl font-medium">15,307</p>
              <p className="text-xs text-muted-foreground mt-1">Based on your CDV holdings</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quantum Theory */}
      <div className="mb-8">
        <Quantum />
      </div>
      
      {/* Proposals Tabs */}
      <Tabs defaultValue="active" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Proposals ({activeProposals.length})</TabsTrigger>
          <TabsTrigger value="passed">Passed ({passedProposals.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedProposals.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading proposals...</p>
            </div>
          ) : activeProposals.length > 0 ? (
            activeProposals.map(renderProposalCard)
          ) : (
            <div className="text-center py-8 bg-muted rounded-lg">
              <i className="fas fa-vote-yea text-4xl text-muted-foreground mb-4"></i>
              <p className="text-muted-foreground">No active proposals at the moment</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="passed">
          {passedProposals.length > 0 ? (
            passedProposals.map(renderProposalCard)
          ) : (
            <div className="text-center py-8 bg-muted rounded-lg">
              <p className="text-muted-foreground">No passed proposals</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rejected">
          {rejectedProposals.length > 0 ? (
            rejectedProposals.map(renderProposalCard)
          ) : (
            <div className="text-center py-8 bg-muted rounded-lg">
              <p className="text-muted-foreground">No rejected proposals</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Voting Dialog */}
      {selectedProposal && (
        <Dialog open={voteDialogOpen} onOpenChange={setVoteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cast Your Vote</DialogTitle>
              <DialogDescription>
                Vote on: {selectedProposal.title}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <p className="mb-4">{selectedProposal.description}</p>
              <p className="text-muted-foreground text-sm mb-6">
                Your voting power: 15,307 votes
              </p>
              
              <div className="flex gap-4">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => handleVote(selectedProposal.id, true)}
                >
                  <i className="fas fa-check mr-2"></i> Vote For
                </Button>
                <Button 
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={() => handleVote(selectedProposal.id, false)}
                >
                  <i className="fas fa-times mr-2"></i> Vote Against
                </Button>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setVoteDialogOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
