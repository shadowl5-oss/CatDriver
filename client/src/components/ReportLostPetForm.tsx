import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createLostPet } from '@/services/api';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft } from 'lucide-react';

interface ReportLostPetFormProps {
  onCancel: () => void;
  onSuccess: () => void;
  userId: number;
}

const lostPetSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  species: z.string().min(2, "Species must be at least 2 characters"),
  breed: z.string().min(2, "Breed must be at least 2 characters"),
  color: z.string().min(2, "Color must be at least 2 characters"),
  age: z.coerce.number().min(0, "Age must be a positive number"),
  gender: z.string().min(1, "Gender is required"),
  lastSeenLocation: z.string().min(5, "Location must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  contactPhone: z.string().min(10, "Phone number must be at least 10 characters"),
  contactEmail: z.string().email("Invalid email address"),
  photo: z.string().url("Must be a valid URL"),
  microchipId: z.string().optional(),
  reward: z.coerce.number().optional(),
});

type LostPetFormValues = z.infer<typeof lostPetSchema>;

export default function ReportLostPetForm({ onCancel, onSuccess, userId }: ReportLostPetFormProps) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  // Form for reporting a lost pet
  const form = useForm<LostPetFormValues>({
    resolver: zodResolver(lostPetSchema),
    defaultValues: {
      name: '',
      species: 'Cat',
      breed: '',
      color: '',
      age: 0,
      gender: '',
      lastSeenLocation: '',
      description: '',
      contactPhone: '',
      contactEmail: '',
      photo: '',
      microchipId: '',
      reward: 0,
    },
  });

  // Mutation for creating a new lost pet report
  const createLostPetMutation = useMutation({
    mutationFn: (data: LostPetFormValues) => {
      const lostPetData = {
        ...data,
        userId,
        lastSeenDate: new Date().toISOString(),
        isFound: false,
      };
      return createLostPet(lostPetData);
    },
    onSuccess: () => {
      setSubmitting(false);
      onSuccess();
      toast({
        title: "Pet reported",
        description: "Your lost pet has been successfully reported.",
      });
    },
    onError: () => {
      setSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to report lost pet. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LostPetFormValues) => {
    setSubmitting(true);
    createLostPetMutation.mutate(data);
  };

  return (
    <div className="container mx-auto py-6">
      <Button 
        variant="ghost" 
        onClick={onCancel} 
        className="mb-4 flex items-center"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to lost pets
      </Button>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Report a Lost Pet</h1>
        <p className="text-muted-foreground mb-6">CatDAO's community-driven lost pet reunification service. <a href="https://catdao.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Learn more at catdao.org</a></p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pet Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Fluffy" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="species"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Species</FormLabel>
                      <FormControl>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select species" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Cat">Cat</SelectItem>
                            <SelectItem value="Dog">Dog</SelectItem>
                            <SelectItem value="Bird">Bird</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="breed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Breed</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Tabby, Siamese" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Orange" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age (years)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Unknown">Unknown</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="lastSeenLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Seen Location</FormLabel>
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please provide details about the pet's appearance, behavior, and any distinguishing features" 
                          className="min-h-[120px]"
                          {...field} 
                        />
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
                      <FormLabel>Photo URL</FormLabel>
                      <FormControl>
                        <Input placeholder="URL to photo of the pet" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please provide a direct link to a photo of your pet
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="microchipId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Microchip ID (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reward"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reward ($) (optional)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-6">
              <Button 
                variant="outline" 
                type="button" 
                onClick={onCancel}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}