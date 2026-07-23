import AuthHeader from "@/components/auth/AuthHeader";
import RegisterForm from "@/components/auth/RegisterForm";
import Footer from "@/components/layout/Footer";

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-[#0b061f]">
            <AuthHeader />
            <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-12">
                <RegisterForm />
            </main>
            <Footer/>
        </div>
    );
}