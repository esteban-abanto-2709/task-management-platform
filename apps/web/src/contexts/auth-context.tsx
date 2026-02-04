"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api } from "@/lib/api";
import { routes } from "@/lib/routes";
import { User, AuthResponse, LoginDto, RegisterDto } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: LoginDto) => Promise<User>;
  register: (data: RegisterDto) => Promise<User>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar token y usuario al iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      loadUser(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadUser = async (authToken: string) => {
    try {
      const userData = await api.get<User>(routes.api.auth.me(), authToken);
      setUser(userData);
    } catch (error) {
      console.error("Failed to load user:", error);
      localStorage.removeItem("token");
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginDto) => {
    const response = await api.post<AuthResponse>(
      routes.api.auth.login(),
      data,
    );
    localStorage.setItem("token", response.access_token);
    setToken(response.access_token);
    setUser(response.user);
    return response.user;
  };

  const register = async (data: RegisterDto) => {
    const response = await api.post<AuthResponse>(
      routes.api.auth.register(),
      data,
    );
    localStorage.setItem("token", response.access_token);
    setToken(response.access_token);
    setUser(response.user);
    return response.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
