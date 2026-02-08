"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { routes } from "@/lib/routes";
import { useAuthModal } from "@/hooks/use-auth-modal";

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter();
  const { login } = useAuth();
  const { onSwitchView, onClose } = useAuthModal();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const user = await login({ email, password });
      onClose(); // Close modal on success
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(routes.userDashboard(user.slug));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {/* TODO: Add forgot password link if needed */}
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            disabled={isLoading}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">
          Don&apos;t have an account?{" "}
        </span>
        <button
          onClick={onSwitchView}
          className="text-primary hover:underline font-medium focus:outline-hidden"
          type="button"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
