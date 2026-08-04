import AuthHeader from "@/components/auth/AuthHeader";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#07021f]">
            <AuthHeader />

            <div className="flex min-h-[calc(100vh-72px)] mt-[50px] items-center justify-center px-4">
                <LoginForm />
            </div>
        </div>
    );
}