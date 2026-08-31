'use client';
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { useEffect } from "react";
export default function DashboardPage() {
const router = useRouter();
const {data: session, isPending} = useSession();

useEffect(() => {
    if (!session && !isPending) {
        router.push("/login");
    }
},[session, isPending, router]);

const hadleLogout = async () => {
    await signOut();
    router.push("/login");
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard</h1>
      <p className="text-lg">This is your dashboard page.</p>
      <Button onClick={hadleLogout} className="mt-4">Logout</Button>
    </div>
  );
}