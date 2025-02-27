import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { 
  fetchLostPetSightings, 
  createLostPetSighting,
  verifyLostPetSighting,
  type LostPet, 
  type LostPetSighting 
} from '@/services/api';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { format } from 'date-fns';
import { ArrowLeft, MapPin, Calendar, Phone, Mail, Check, X } from 'lucide-react';

interface PetDetailsProps {
  pet: LostPet;
  onBack: () => void;
  onMarkAsFound: (pet: LostPet) => void;
}

const sightingSchema = z.object({
  sightingLocation: z.string().min(5, "Location must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  contactPhone: z.string().min(10, "Phone number must be at least 10 characters"),
  contactEmail: z.string().email("Invalid email address"),
  reportedBy: z.string().min(2, "Name must be at least 2 characters"),
  photo: z.string().optional(),
});

type SightingFormValues = z.infer<typeof sightingSchema>;

export default function PetDetails({ pet, onBack, onMarkAsFound }: PetDetailsProps) {
  const { toast } = useToast();
  const [showReportForm, setShowReportForm] = useState(false);

  // Fetch sightings for this pet
  const { data: sightings = [], isLoading } = useQuery({
    queryKey: ['/api/lost-pet-sightings', pet.id],
    queryFn: () => fetchLostPetSightings(pet.id),
  });

  // Form for reporting a sighting
  const form = useForm<SightingFormValues>({
    resolver: zodResolver(sightingSchema),
    defaultValues: {
      sightingLocation: '',
      description: '',
      contactPhone: '',
      contactEmail: '',
      reportedBy: '',
      photo: '',
    },
  });

  // Mutation for creating a new sighting
  const createSightingMutation = useMutation({
    mutationFn: (data: SightingFormValues) => {
      const sightingData = {
        ...data,
        lostPetId: pet.id,
        sightingDate: new Date().toISOString(),
        isVerified: false,
      };
      return createLostPetSighting(sightingData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/lost-pet-sightings', pet.id] });
      setShowReportForm(false);
      form.reset();
      toast({
        title: "Sighting reported",
        description: "Thank you for reporting a sighting of this pet.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to report sighting. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Mutation for verifying a sighting
  const verifySightingMutation = useMutation({
    mutationFn: ({ id, isVerified }: { id: number; isVerified: boolean }) => 
      verifyLostPetSighting(id, isVerified),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/lost-pet-sightings', pet.id] });
      toast({
        title: "Sighting updated",
        description: "The sighting status has been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update sighting status. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmitSighting = (data: SightingFormValues) => {
    createSightingMutation.mutate(data);
  };

  const handleVerifySighting = (sighting: LostPetSighting, isVerified: boolean) => {
    verifySightingMutation.mutate({ id: sighting.id, isVerified });
  };

  return (
    <div className="container mx-auto py-6">
      <Button 
        variant="ghost" 
        onClick={onBack} 
        className="mb-4 flex items-center"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to lost pets
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div 
            className="w-full h-72 bg-cover bg-center rounded-lg shadow-md mb-4" 
            style={{ backgroundImage: `url(${pet.photo})` }}
          />

          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{pet.contactPhone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{pet.contactEmail}</span>
              </div>
              {pet.reward && (
                <div className="mt-4 p-3 bg-accent/50 rounded-md text-center">
                  <span className="font-medium">Reward: ${pet.reward.toFixed(2)}</span>
                </div>
              )}
              {pet.microchipId && (
                <div className="mt-2">
                  <span className="text-sm text-muted-foreground">Microchip ID: {pet.microchipId}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {!pet.isFound && (
            <Button 
              onClick={() => onMarkAsFound(pet)} 
              className="w-full mt-4"
            >
              Mark as Found
            </Button>
          )}
        </div>

        <div className="md:col-span-2">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{pet.name}</h1>
            <Badge variant={pet.isFound ? "success" : "destructive"}>
              {pet.isFound ? "Found" : "Missing"}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            {pet.species} • {pet.breed} • {pet.color} • {pet.gender} • {pet.age} years old
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Last seen at {pet.lastSeenLocation}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>On {format(new Date(pet.lastSeenDate), 'MMMM dd, yyyy')}</span>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="whitespace-pre-line">{pet.description}</p>
          </div>

          <Separator className="my-6" />

          <Tabs defaultValue="sightings">
            <TabsList>
              <TabsTrigger value="sightings">Sightings</TabsTrigger>
              <TabsTrigger value="report">Report a Sighting</TabsTrigger>
            </TabsList>
            <TabsContent value="sightings" className="pt-4">
              <h2 className="text-xl font-semibold mb-4">Recent Sightings</h2>
              {isLoading ? (
                <p>Loading sightings...</p>
              ) : sightings.length > 0 ? (
                <div className="space-y-4">
                  {sightings.map((sighting) => (
                    <Card key={sighting.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{sighting.sightingLocation}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{format(new Date(sighting.sightingDate), 'MMMM dd, yyyy')}</span>
                            </div>
                            <p className="mt-3">{sighting.description}</p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Reported by: {sighting.reportedBy}
                            </p>
                          </div>
                          <div>
                            <Badge variant={sighting.isVerified ? "success" : "outline"}>
                              {sighting.isVerified ? "Verified" : "Unverified"}
                            </Badge>
                            <div className="flex mt-2 space-x-2">
                              <Button 
                                variant="outline"
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleVerifySighting(sighting, true)}
                                disabled={sighting.isVerified}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleVerifySighting(sighting, false)}
                                disabled={!sighting.isVerified}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p>No sightings reported yet. If you've seen this pet, please report a sighting.</p>
              )}
            </TabsContent>
            <TabsContent value="report" className="pt-4">
              <h2 className="text-xl font-semibold mb-4">Report a Sighting</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitSighting)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="sightingLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Where did you see this pet?</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Central Park, near the pond" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description of the sighting</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please provide details about the pet's condition, behavior, and any other relevant information" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="reportedBy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="photo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Photo URL (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="URL to photo of the pet" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <Button variant="outline" type="button" onClick={() => form.reset()}>
                      Reset
                    </Button>
                    <Button type="submit" disabled={createSightingMutation.isPending}>
                      {createSightingMutation.isPending ? "Submitting..." : "Submit Sighting"}
                    </Button>
                  </div>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}