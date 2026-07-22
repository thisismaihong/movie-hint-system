import AuthHeader from "@/components/auth/AuthHeader";
import LoginForm from "@/components/auth/LoginForm";
import {Sparkles, Brain, Bookmark, Heart, PlayCircle} from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#07021f]">
            <AuthHeader />

            <main className="relative overflow-hidden">
                <div className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-purple-900/20 blur-3xl" />
                <div className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-12 px-6 py-10 lg:grid-cols-2 lg:px-10">
                    
                    <section className="hidden lg:block">
                        <div className="relative mb-10 flex h-[430px] items-center justify-center overflow-hidden rounded-3xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-[#07021f] to-[#07021f]" />
                            <div className="relative grid grid-cols-4 gap-4 opacity-50">
                                <div className="h-64 w-32 rotate-[-6deg] rounded-xl bg-gradient-to-b from-blue-900 to-purple-950 shadow-xl" />
                                <div className="h-72 w-32 rotate-[3deg] rounded-xl bg-gradient-to-b from-gray-700 to-purple-950 shadow-xl" />
                                <div className="h-64 w-32 rotate-[-2deg] rounded-xl bg-gradient-to-b from-indigo-900 to-purple-950 shadow-xl" />
                                <div className="h-72 w-32 rotate-[6deg] rounded-xl bg-gradient-to-b from-purple-800 to-gray-900 shadow-xl" />
                            </div>

                            <div className="absolute bottom-8 left-10 flex h-20 w-20 items-center justify-center rounded-full border border-purple-500/50 bg-purple-500/10 text-purple-400 shadow-[0_0_50px_rgba(139,92,246,0.4)]">
                                <PlayCircle size={55} strokeWidth={1.5} />
                            </div>
                        </div>

                        <div className="max-w-xl">
                            <h2 className="text-4xl font-bold leading-tight text-white">
                                Phim hay cho
                                <span className="text-purple-500">
                                    {" "}mọi cảm xúc
                                </span>
                            </h2>
                            <p className="mt-5 text-lg leading-8 text-gray-400">
                                Đăng nhập để khám phá những bộ phim phù hợp với sở thích của bạn.
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                                <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                                    <Sparkles size={22} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">
                                        Gợi ý thông minh
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        MovieHint hiểu bạn thích gì
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                                    <Brain size={22} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">
                                        Cá nhân hóa
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Trải nghiệm dành riêng cho bạn
                                    </p>
                                </div>
                            </div>


                            <div className="flex items-start gap-3">
                                <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                                    <Bookmark size={22} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">
                                        Lưu & theo dõi
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Lưu phim yêu thích, xem lịch sử
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                                    <Heart size={22} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">
                                        Khám phá yêu thích
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Tìm những bộ phim phù hợp với bạn
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="flex justify-center lg:justify-end">
                        <LoginForm />
                    </section>

                </div>
            </main>
        </div>
    );
}