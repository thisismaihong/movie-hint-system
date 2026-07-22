"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#08051f] text-white">
            <Header />
            <div className="flex">
                <Sidebar />
                <main className="min-h-[calc(100vh-64px)] flex-1 p-6">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
}