"use client";

import { useState } from "react";
import { notification } from "antd";
import { useAuth } from "@/hooks/useAuth";

export default function useLogin() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (username, password) => {
        if (!username || !password) {
            notification.error({
                title: "Đăng nhập thất bại",
                description: "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.",
                placement: "topRight",
            });
            return false;
        }

        try {
            setLoading(true);
            await login(username, password);
            notification.success({
                title: "Đăng nhập thành công",
                description: "Chào mừng bạn quay trở lại MovieHint!",
                placement: "topRight",
            });
            window.location.href = "/";
            return true;
        } catch (error) {
            console.error("Login error:", error);
            notification.error({
                title: "Đăng nhập thất bại",
                description:
                    error?.response?.data?.detail ||
                    "Tên đăng nhập hoặc mật khẩu không đúng.",
                placement: "topRight",
            });
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {loading, handleLogin};
}