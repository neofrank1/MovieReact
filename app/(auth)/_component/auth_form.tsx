"use client";

import { useState } from "react";
import { Button, Input, Label, Separator } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Alert } from "@heroui/react";

export default function AuthForm({ formType }: { formType: number }) {
  const isSignUp = formType === 1;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [last_name, setLastName] = useState("");
  const [first_name, setFirstName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = isSignUp
      ? await authClient.signUp.email({ email, password, name, first_name, last_name})
      : await authClient.signIn.email({ email, password });
    
    if (result.error) {
      setError(result.error.message);
      return;
    }
      
    if (result.data?.token) router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">MovieCritique</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-foreground-500">
          {isSignUp ? "Join the conversation about every movie." : "Sign in to continue your movie journey."}
        </p>
      </div>

      <Separator className="my-6" />

      <div className="flex w-full flex-col gap-4">
        {error && (
          <Alert status="danger">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Error</Alert.Title>
              <Alert.Description>
                {error}
              </Alert.Description>
            </Alert.Content>
          </Alert>
        )}

        {isSignUp && (
          <>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="input-type-name">Nickname</Label>
                <Input
                  id="input-type-name"
                  aria-label="NickName"
                  placeholder="Enter your nickname"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="input-type-lastname">Last Name</Label>
                <Input
                  id="input-type-lastname"
                  aria-label="LastName"
                  placeholder="Enter your Last Name"
                  value={last_name}
                  onChange={(event) => setLastName(event.target.value)}
                />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="input-type-firstname">First Name</Label>
                <Input
                  id="input-type-firstname"
                  aria-label="FirstName"
                  placeholder="Enter your First Name"
                  value={first_name}
                  onChange={(event) => setFirstName(event.target.value)}
                />
            </div>
          </>
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
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
      </div>

      <Button className="mt-7 h-11 w-full font-semibold" type="submit">
        {isSignUp ? "Create account" : "Login"}
      </Button>
      <p className="mt-6 text-center text-sm text-foreground-500">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <Link href={isSignUp ? "/login" : "/signup"} className="font-medium text-primary hover:underline">
          {isSignUp ? "Login" : "Sign up"}
        </Link>
      </p>
    </form>
  );
}