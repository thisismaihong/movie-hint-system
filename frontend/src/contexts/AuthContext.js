"use client";

import {
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";

import api, { endpoints } from "@/configs/api";

import {
    login as loginService,
    register as registerService,
} from "@/services/authService";


export const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);


    const fetchUser = useCallback(async () => {
        try {
            const response = await api.get(endpoints.profile);

            setUser(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");

            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsInitializing(false);
        }
    }, []);


    useEffect(() => {
        const access = localStorage.getItem("access_token");
        if (!access) {
            setIsInitializing(false);
            return;
        }
        setToken(access);
        fetchUser();
    }, [fetchUser]);


    const login = async (username, password) => {
        try {
            const data = await loginService({
                username,
                password,
            });
            const access = data.access_token;
            const refresh = data.refresh_token;

            localStorage.setItem(
                "access_token",
                access
            );
            localStorage.setItem(
                "refresh_token",
                refresh
            );

            setToken(access);
            await fetchUser();
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };


    const register = async (payload) => {
        return await registerService(payload);
    };


    const logout = () => {
        localStorage.removeItem(
            "access_token"
        );
        localStorage.removeItem(
            "refresh_token"
        );

        setToken(null);
        setUser(null);
        setIsAuthenticated(false);

        window.location.href = "/login";

    };


    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isInitializing,
                isAuthenticated,
                setUser,
                fetchUser,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};