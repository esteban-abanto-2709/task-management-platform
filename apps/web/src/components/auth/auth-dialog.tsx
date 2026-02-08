"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

export function AuthDialog() {
  const { isOpen, onClose, view } = useAuthModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {view === "login" ? "Welcome back" : "Create an account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {view === "login"
              ? "Enter your credentials to access your account"
              : "Get started with your free account today"}
          </DialogDescription>
        </DialogHeader>

        {view === "login" ? <LoginForm /> : <RegisterForm />}
      </DialogContent>
    </Dialog>
  );
}
