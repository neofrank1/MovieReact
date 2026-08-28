import AuthLayout from "../_component/auth_layout";
import { Input, Label } from "@heroui/react";
import { Separator } from '@heroui/react';
import { Button } from "@heroui/react";

export default function Login() {
    return (
        <AuthLayout>
             <div className="text-center mb-5 uppercase text-2xl font-bold ">Login</div>
                    <Separator className="my-4" />
            <div className="flex w-80 flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <Label htmlFor="input-type-email">Email</Label>
                    <Input id="input-type-email" placeholder="example@example.com" type="email" />
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="input-type-password">Password</Label>
                    <Input id="input-type-password" placeholder="Password" type="password" />
                </div>
            </div>
            <Button className="mt-4 w-80">Login</Button>
        </AuthLayout>
    );
}