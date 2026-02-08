"use client";

import { useState } from "react";
import { Button } from "@signalvc/ui/src/components/Button/index.web";
import { Input } from "@signalvc/ui/src/components/Input/index.web";

export default function AuthPage() {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleContinue = () => {
    if (step === "email" && email) {
      // Mock validation
      setStep("password");
    } else if (step === "password" && password) {
      console.log("Login with:", email, password);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">Welcome back</h1>
          <p className="text-gray-400">Enter your email to sign in to your account</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={step === "password"}
              className="bg-black border-zinc-800"
            />
            {step === "password" && (
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border-zinc-800 animate-in fade-in slide-in-from-top-2"
              />
            )}
          </div>
          <Button className="w-full" onClick={handleContinue}>
            {step === "email" ? "Continue with Email" : "Sign In"}
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-gray-400">Or continue with</span>
          </div>
        </div>
        <div className="grid gap-2">
          <Button variant="google" label="Google" className="w-full" />
          <Button variant="apple" label="Apple" className="w-full" />
        </div>
      </div>
    </div>
  );
}
