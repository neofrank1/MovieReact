"use client";

import { useState } from "react";
import { Button, Input, Label, Separator } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthForm({ formType }: { formType: number }) {
  const isSignUp = formType === 1;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = isSignUp
      ? await authClient.signUp.email({ email, password, name })
      : await authClient.signIn.email({ email, password });

    if (result.data?.token) router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">MovieCritique</p>
        <h1 className="mt-2 text-2xl font-bold text-foreground">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-foreground-500">
          {isSignUp ? "Join the conversation about every movie." : "Sign in to continue your movie journey."}
        </p>
      </div>

      <Separator className="my-6" />

      <div className="flex w-full flex-col gap-4">
        {isSignUp && (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="input-type-name">Name</Label>
            <Input
              id="input-type-name"
              aria-label="Name"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="input-type-email">Email</Label>
          <Input
            id="input-type-email"
            placeholder="example@example.com"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="input-type-password">Password</Label>
          <Input
            id="input-type-password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
      </div>

      <Button className="mt-6 w-full" type="submit">
        {isSignUp ? "Create account" : "Login"}
      </Button>
      <p className="mt-5 text-center text-sm text-foreground-500">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <Link href={isSignUp ? "/login" : "/signup"} className="font-medium text-primary hover:underline">
          {isSignUp ? "Login" : "Sign up"}
        </Link>
      </p>
    </form>
  );
}
