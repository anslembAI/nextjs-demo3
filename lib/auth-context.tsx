"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role?: string;
  createdAt: number;
  updatedAt: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  sessionToken: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_TOKEN_KEY = "voyage_session_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get current user by session token
  const currentUser = useQuery(
    api.passwordAuth.getCurrentUser,
    sessionToken ? { sessionToken } : "skip"
  );

  const signOutMutation = useMutation(api.passwordAuth.signOut);

  // Load session token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem(SESSION_TOKEN_KEY);
    if (token) {
      setSessionToken(token);
    }
    setIsLoading(false);
  }, []);

  // Update localStorage when session token changes
  useEffect(() => {
    if (sessionToken) {
      localStorage.setItem(SESSION_TOKEN_KEY, sessionToken);
    } else {
      localStorage.removeItem(SESSION_TOKEN_KEY);
    }
  }, [sessionToken]);

  const signIn = useCallback(async (email: string, password: string) => {
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Sign in failed");
    }

    const data = await response.json();
    setSessionToken(data.sessionToken);
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Sign up failed");
    }

    const data = await response.json();
    setSessionToken(data.sessionToken);
  }, []);

  const signOut = useCallback(async () => {
    if (sessionToken) {
      await signOutMutation({ sessionToken });
    }
    setSessionToken(null);
  }, [sessionToken, signOutMutation]);

  const isConvexLoading = sessionToken !== null && currentUser === undefined;
  const isAuthLoading = isLoading || isConvexLoading;

  const value: AuthContextType = {
    user: currentUser || null,
    isLoading: isAuthLoading,
    isAuthenticated: !!currentUser,
    sessionToken,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
