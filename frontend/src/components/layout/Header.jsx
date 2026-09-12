"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
    const {user, isAuthenticated, logout} = useAuth();

    return (
        <header className="h-16 w-full border-b border-gray-200 bg-white shadow-sm">
            <div className="flex h-full items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    <Image
                        src="/images/logo.png"
                        alt="MovieHint logo"
                        width={70}
                        height={50}
                        className="object-contain"
                    />
                    <h2 className="text-2xl font-bold italic tracking-tight text-[#111827]">
                        Movie
                        <span className="text-purple-600">
                            Hint
                        </span>
                    </h2>
                </Link>

                <div className="flex items-center gap-3">

                    {isAuthenticated ? (
                        <>
                            <Link href="/" className="flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-purple-50">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-sm font-bold text-white shadow-sm">
                                    {user?.first_name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "U"}
                                </div>
                                <span className="hidden font-medium text-gray-700 sm:block">
                                    {user?.username || "Người dùng"}
                                </span>
                            </Link>
                            <button
                                onClick={logout}
                                className="rounded-lg border border-red-200 px-4 py-2 font-medium text-red-500 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
                            >
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-purple-50 hover:text-purple-600">
                                Đăng nhập
                            </Link>
                            <Link href="/register" className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2 font-medium text-white shadow-md shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-300">
                                Đăng ký
                            </Link>
                        </>
                    )}

                </div>

            </div>
        </header>
    );
}