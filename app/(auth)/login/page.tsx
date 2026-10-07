import AuthLayout from "../_components/auth_layout";
import AuthForm from "../_components/auth_form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login"
};

export default function Login() {
    return (
        <AuthLayout>
            <AuthForm formType={0} />
        </AuthLayout>
    );
}