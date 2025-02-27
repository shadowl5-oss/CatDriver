import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Redirect, useLocation } from "wouter";
import { CatLogo } from "@/components/CatLogo";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import SimpleAsciiArt from "@/components/SimpleAsciiArt";

const formSchema = z.object({
  password: z.string().min(1, { message: "Password is required" }),
});

type FormData = z.infer<typeof formSchema>;

export default function AuthPage() {
  // Get the previous path from localStorage or default to "/"
  const redirectTo = localStorage.getItem("lastProtectedRoute") || "/";
  const { isAuthenticated, loginMutation } = useAuth();
  const [location, navigate] = useLocation();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (data: FormData) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate(redirectTo);
      },
    });
  };

  // If already authenticated, redirect to the requested page
  if (isAuthenticated) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Column - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2">
              <CatLogo width={32} height={32} />
              <CardTitle className="font-[Orbitron]">
                Cat<span className="text-primary">Driven</span>
              </CardTitle>
            </div>
            <CardDescription>
              Enter the password to access restricted areas of the application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Access Site
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground flex justify-between">
            <span>© 2025 CatDAO</span>
            <a href="https://catdao.org" className="hover:text-primary" target="_blank" rel="noopener noreferrer">
              catdao.org
            </a>
          </CardFooter>
        </Card>
      </div>

      {/* Right Column - Hero Section */}
      <div className="flex-1 bg-primary/10 flex flex-col items-center justify-center p-8 text-center">
        <div className="max-w-lg space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold font-[Orbitron]">
            Quantum-Inspired <span className="text-primary">Blockchain</span> Platform
          </h1>
          
          <div className="w-48 h-48 mx-auto bg-black/10 rounded-xl overflow-hidden border border-primary/20 flex items-center justify-center">
            <SimpleAsciiArt 
              type="quantum" 
              width={192} 
              height={192} 
            />
          </div>
          
          <p className="text-muted-foreground">
            Access our innovative platform for digital pet collectibles, featuring
            quantum-inspired blockchain technology and community-driven pet services.
          </p>
          
          <div className="pt-4 grid grid-cols-3 gap-2">
            <div className="p-3 rounded-lg bg-card border border-border">
              <div className="text-primary text-xl font-bold">3,333</div>
              <div className="text-xs">Unique Ordinals</div>
            </div>
            <div className="p-3 rounded-lg bg-card border border-border">
              <div className="text-primary text-xl font-bold">Quantum</div>
              <div className="text-xs">Technologies</div>
            </div>
            <div className="p-3 rounded-lg bg-card border border-border">
              <div className="text-primary text-xl font-bold">Community</div>
              <div className="text-xs">Driven</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}