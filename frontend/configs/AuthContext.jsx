"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "./axios";
import endpoints from "./endpoints";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("access_token"));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const [user, setUser] = useState(null);
    const [isInitializing, setIsInitializing] = useState(!!localStorage.getItem("access_token"));


    useEffect(() => {
        const checkAuth = async () => {
            if (!token) {
                setIsInitializing(false);
                return;
            }

            try {
                const res = await axiosInstance.get(endpoints.profile);

                setUser(res.data);
                setIsAuthenticated(true);
            } catch {
                localStorage.removeItem("access_token");
                setToken(null);
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setIsInitializing(false);
            }
        };

        checkAuth();
    }, [token]);


    const fetchUser = async (token) => {
        try {
            const res = await axiosInstance.get(endpoints.profile);
            setUser(res.data);
            setIsAuthenticated(true);
        }
        catch {
            console.log("Lỗi token!");
            localStorage.removeItem("access_token");
            setToken(null);
            setIsAuthenticated(false);
            setUser(null);
        }
    }

    // const login = async (username, password) => {
    //     try {
    //         const formData = new FormData();
    //         formData.append("username", username);
    //         formData.append("password", password);
    //         formData.append("grant_type", "password");
    //         formData.append("client_id", import.meta.env.VITE_OAUTH_CLIENT_ID);
    //         formData.append("client_secret", import.meta.env.VITE_OAUTH_CLIENT_SECRET);

    //         const response = await axiosInstance.post(endpoints.login, formData);

    //         const newToken = response.data.access;

    //         localStorage.setItem("access", newToken);
    //         setToken(newToken);
    //         setIsAuthenticated(true);

    //         await fetchUser(newToken);

    //         console.log("LOGIN RESPONSE:", response.data);

    //         return response;

    //     } catch (err) {
    //         console.error(err);
    //         throw err;
    //     }
    // };

    // const register = async (payload) => {
    //     const response = await axiosInstance.post(endpoints.register, payload);
    //     return response;
    // }

    

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setToken(null);
        setIsAuthenticated(false);
        setUser(null);
        window.location.href = "/";
    }


    if (isInitializing) {
        return React.createElement(
            "div",
            { className: "min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4" },

            React.createElement("div", {
                className: "w-18 h-18 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4",
                role: "status",
                "aria-label": "Đang tải dữ liệu"
            }),

            React.createElement(
                "h2",
                { className: "text-xl font-semibold text-gray-800 text-center" },
                "Vui lòng đợi trong giây lát"
            ),

            React.createElement(
                "p",
                { className: "text-lg text-gray-500 mt-2 text-center animate-pulse" },
                "Đang chuẩn bị nội dung cần thiết"
            )
        );
    }
    return React.createElement(
        AuthContext.Provider,
        { value: { token, setToken, isAuthenticated, setIsAuthenticated, user, setUser, fetchUser, logout } },
        children
    )

};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth phải được sử dụng bên trong AuthProvider");
    }
    return context;
};

