'use client';
import { useState } from "react";
import { Input, Label } from "@heroui/react";
import { Separator } from '@heroui/react';
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthForm({formType} : {formType: number}) {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", { email, password, name });
        if (formType === 1) {
            const result = await authClient.signUp.email({ email, password, name });
            if (result.data?.token) {
                console.log("Sign Up successful:", result);
                router.push("/");
            } else {
                console.log("Sign Up failed");
            }
        } else {
            const result = await authClient.signIn.email({ email, password });
            if (result.data?.token) {
                console.log("Login successful:", result);
                router.push("/");
            } else {
                console.log("Login failed");
            }
    }
    };

    return (
    <> 
    <form onSubmit={handleSubmit}>
       {formType === 1 ? ( // Sign Up form
         <>
           <div className="text-center mb-5 uppercase text-2xl font-bold ">Sign Up</div>
           <Separator className="my-4" />
           <div className="flex w-80 flex-col gap-4">
               <div className="flex flex-col gap-1">
                   <Label htmlFor="input-type-name">Name</Label>
                   <Input aria-label="Name" placeholder="Enter your name" id="input-type-name" value={name} onChange={(e) => setName(e.target.value)}/>
               </div>
               <div className="flex flex-col gap-1">
                   <Label htmlFor="input-type-email">Email</Label>
                   <Input id="input-type-email" placeholder="example@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
               </div>
               <div className="flex flex-col gap-1">
                   <Label htmlFor="input-type-password">Password</Label>
                   <Input id="input-type-password" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
               </div>
           </div>
           <Button className="mt-4 w-80" type="submit" >Sign Up</Button>
           <div className="mt-4 text-center text-sm text-gray-600">
                Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
           </div>
         </>
       ) : ( // Login form
         <>
           <div className="text-center mb-5 uppercase text-2xl font-bold ">Login</div>
                    <Separator className="my-4" />
            <div className="flex w-80 flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <Label htmlFor="input-type-email">Email</Label>
                    <Input id="input-type-email" placeholder="example@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="input-type-password">Password</Label>
                    <Input id="input-type-password" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <Button className="mt-4 w-80" type="submit" >Login</Button>
            <div className="mt-4 text-center text-sm text-gray-600">
                Don't have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
            </div>
         </>
       )}
    </form>
    </>
    )
}