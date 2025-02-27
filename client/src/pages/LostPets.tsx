import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Link, useLocation } from 'wouter';
import { 
  fetchAllLostPets, 
  fetchUserLostPets, 
  fetchCurrentUser,
  updateLostPetStatus,
  type LostPet 
} from '@/services/api';
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import ReportLostPetForm from '@/components/lostpets/ReportLostPetForm';
import PetDetails from '@/components/lostpets/PetDetails';
import { format } from 'date-fns';

export default function LostPets() {
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPet, setSelectedPet] = useState<LostPet | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch user data
  const { data: currentUser } = useQuery({
    queryKey: ['/api/current-user'],
    queryFn: () => fetchCurrentUser(),
  });

  // Fetch all lost pets
  const { data: allLostPets = [], isLoading: isLoadingAll } = useQuery({
    queryKey: ['/api/lost-pets'],
    queryFn: () => fetchAllLostPets(),
  });

  // Fetch user's lost pets if user is logged in
  const { data: userLostPets = [], isLoading: isLoadingUserPets } = useQuery({
    queryKey: ['/api/lost-pets/user', currentUser?.id],
    queryFn: () => fetchUserLostPets(currentUser?.id),
    enabled: !!currentUser?.id,
  });

  // Mutation for updating pet status
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, isFound }: { id: number; isFound: boolean }) => 
      updateLostPetStatus(id, isFound),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/lost-pets'] });
      queryClient.invalidateQueries({ queryKey: ['/api/lost-pets/user', currentUser?.id] });
      toast({
        title: "Pet status updated",
        description: "The pet's status has been successfully updated.",
      });
      setSelectedPet(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update pet status. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleMarkAsFound = (pet: LostPet) => {
    updateStatusMutation.mutate({ id: pet.id, isFound: true });
  };

  const handleViewDetails = (pet: LostPet) => {
    setSelectedPet(pet);
  };

  const handleBackToList = () => {
    setSelectedPet(null);
  };

  const handleReportNew = () => {
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    queryClient.invalidateQueries({ queryKey: ['/api/lost-pets'] });
    queryClient.invalidateQueries({ queryKey: ['/api/lost-pets/user', currentUser?.id] });
    toast({
      title: "Pet reported",
      description: "Your lost pet has been successfully reported.",
    });
  };

  // Filter lost pets based on active tab
  const petsToDisplay = activeTab === 'all' ? allLostPets : userLostPets;
  const isLoading = activeTab === 'all' ? isLoadingAll : isLoadingUserPets;

  if (selectedPet) {
    return <PetDetails pet={selectedPet} onBack={handleBackToList} onMarkAsFound={handleMarkAsFound} />;
  }

  if (showForm) {
    return <ReportLostPetForm onCancel={handleFormCancel} onSuccess={handleFormSuccess} userId={currentUser?.id} />;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lost Pet Finder</h1>
          <p className="text-muted-foreground mt-1">
            Help reunite lost pets with their owners through our community-driven platform
          </p>
        </div>
        <Button onClick={handleReportNew}>Report Lost Pet</Button>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Lost Pets</TabsTrigger>
          <TabsTrigger value="mine" disabled={!currentUser?.id}>My Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Recently Reported Lost Pets</h2>
          {isLoading ? (
            <p>Loading lost pets...</p>
          ) : petsToDisplay.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {petsToDisplay.filter(pet => !pet.isFound).map((pet) => (
                <PetCard key={pet.id} pet={pet} onViewDetails={handleViewDetails} />
              ))}
            </div>
          ) : (
            <p>No lost pets reported yet.</p>
          )}
        </TabsContent>

        <TabsContent value="mine" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">My Lost Pet Reports</h2>
          {isLoading ? (
            <p>Loading your reports...</p>
          ) : petsToDisplay.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {petsToDisplay.map((pet) => (
                <PetCard key={pet.id} pet={pet} onViewDetails={handleViewDetails} showStatus />
              ))}
            </div>
          ) : (
            <p>You haven't reported any lost pets yet.</p>
          )}
        </TabsContent>
      </Tabs>

      <Separator className="my-8" />

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Found Pets (Recently Reunited)</h2>
        {isLoadingAll ? (
          <p>Loading reunited pets...</p>
        ) : allLostPets.filter(pet => pet.isFound).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allLostPets
              .filter(pet => pet.isFound)
              .slice(0, 3)
              .map((pet) => (
                <PetCard key={pet.id} pet={pet} onViewDetails={handleViewDetails} showStatus />
              ))}
          </div>
        ) : (
          <p>No pets have been reunited with their owners yet.</p>
        )}
      </div>
    </div>
  );
}

interface PetCardProps {
  pet: LostPet;
  onViewDetails: (pet: LostPet) => void;
  showStatus?: boolean;
}

function PetCard({ pet, onViewDetails, showStatus = false }: PetCardProps) {
  return (
    <Card className="overflow-hidden">
      <div 
        className="w-full h-48 bg-cover bg-center" 
        style={{ backgroundImage: `url(${pet.photo})` }}
      />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{pet.name}</CardTitle>
          {showStatus && (
            <Badge variant={pet.isFound ? "success" : "destructive"}>
              {pet.isFound ? "Found" : "Missing"}
            </Badge>
          )}
        </div>
        <CardDescription>
          {pet.breed} • {pet.color} • {pet.gender} • {pet.age} years old
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-sm text-muted-foreground mb-2">
          <span className="font-medium">Last seen:</span>{" "}
          {pet.lastSeenLocation} on {format(new Date(pet.lastSeenDate), 'MMM dd, yyyy')}
        </div>
        <p className="text-sm line-clamp-2">{pet.description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => onViewDetails(pet)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}