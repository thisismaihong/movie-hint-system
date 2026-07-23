"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthHeader() {
    const pathname = usePathname();

    const isRegisterPage = pathname === "/register";

    return (
        <header className="h-16 w-full border-b border-gray-200 bg-white shadow-sm">
            <div className="flex h-full items-center justify-between px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    <Image src="/images/logo.png" alt="MovieHint logo" width={70} height={50} className="object-contain" />

                    <h2 className="text-2xl font-bold italic tracking-tight text-[#111827]">
                        Movie<span className="text-purple-600">Hint</span>
                    </h2>
                </Link>

                <div className="flex items-center gap-3 text-sm">
                    {isRegisterPage ? (
                        <>
                            <span className="text-gray-600">
                                Đã có tài khoản?
                            </span>

                            <Link href="/login" className="font-semibold text-purple-600 transition hover:text-purple-800">
                                Đăng nhập
                            </Link>
                        </>
                    ) : (
                        <>
                            <span className="text-gray-600">
                                Chưa có tài khoản?
                            </span>

                            <Link href="/register" className="font-semibold text-purple-600 transition hover:text-purple-800">
                                Đăng ký
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}