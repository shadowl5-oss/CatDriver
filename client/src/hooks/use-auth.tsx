import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "../lib/queryClient";

type User = {
  id: number;
  username: string;
  displayName: string;
  isAdmin?: boolean;
};

type LoginData = {
  password: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: any;
  logoutMutation: any;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

// The password used for authentication
const SITE_PASSWORD = "catdao2025";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | null, Error>({
    queryKey: ["/api/current-user"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/current-user");
        if (!res.ok) {
          return null;
        }
        return await res.json();
      } catch (err) {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      if (credentials.password === SITE_PASSWORD) {
        localStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);
        return true;
      } else {
        throw new Error("Invalid password");
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      localStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false);
      return true;
    },
    onSuccess: () => {
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}