import AuthLayout from "../_components/auth_layout";
import AuthForm from "../_components/auth_form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up"
};

export default function SignUp() {
    
    return (
        <AuthLayout>
           <AuthForm formType={1} />
        </AuthLayout>
    );
}