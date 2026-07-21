"use client";

import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {

    const {
        login
    } = useAuth();

    const handleLogin = async () => {

        await login(
            "username",
            "password"
        );

    };

    return (
        <button onClick={handleLogin}>
            Đăng nhập
        </button>
    );
}