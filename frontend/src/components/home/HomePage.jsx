"use client";

import { Button, Card, Steps } from "antd";
import {Sparkles, Brain, Heart, User, Film, Star} from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-[#07021f] text-white">
            <section className="px-6 py-8 lg:px-10">
                <div className="mx-auto max-w-7xl">
                    <Card variant="borderless" className="!border-0 !bg-transparent">
                        <div className="relative min-h-[400px] overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-r from-[#10062f] via-[#16073e] to-[#21094d] shadow-2xl">

                            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />
                            <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

                            <div className="relative z-10 flex min-h-[400px] w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-14">
                                <div className="mb-4 flex items-center gap-2">
                                    <Sparkles size={28} className="text-purple-400" />
                                    <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1 text-sm text-purple-300">
                                        Movie Recommendation
                                    </span>
                                </div>

                                <h1 className="text-4xl text-white font-bold leading-tight md:text-5xl">
                                    Gợi ý phim
                                    <br />
                                    <span className="text-purple-500">
                                        chuẩn gu của bạn
                                    </span>
                                </h1>

                                <p className="mt-5 max-w-lg text-base leading-7 text-gray-300">
                                    MH hiểu bạn thích gì, đề xuất những bộ phim phù hợp với sở thích và cảm xúc của bạn.
                                </p>

                                <div className="mt-7">
                                    <Button type="primary" size="large" icon={<Sparkles size={18} />} className="!h-12 !rounded-xl !border-0 !bg-gradient-to-r !from-purple-600 !to-indigo-500 !px-7 !font-semibold shadow-lg shadow-purple-500/20">
                                        Khám phá gợi ý ngay
                                    </Button>
                                </div>

                                <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-300">

                                    <div className="flex items-center gap-2">
                                        <Heart size={18} className="text-purple-400" />
                                        <span>Đề xuất cá nhân hóa</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Brain size={18} className="text-purple-400" />
                                        <span>Tìm kiếm thông minh</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Star size={18} className="text-purple-400" />
                                        <span>Tóm tắt nội dung</span>
                                    </div>

                                </div>
                            </div>

                            <div className="absolute bottom-0 right-0 hidden h-full w-1/2 items-center justify-center lg:flex">
                                <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-purple-500/40 bg-purple-600/10 shadow-[0_0_80px_rgba(139,92,246,0.35)]">
                                    <div className="absolute inset-5 rounded-full border border-purple-400/20" />
                                    <Brain size={110} strokeWidth={1.2} className="text-purple-400" />
                                </div>
                                <div className="absolute left-10 top-20 rounded-xl border border-purple-400/20 bg-[#201044]/80 px-4 py-2 text-sm text-purple-200 backdrop-blur">
                                    Thể loại yêu thích
                                </div>
                                <div className="absolute right-10 top-24 rounded-xl border border-purple-400/20 bg-[#201044]/80 px-4 py-2 text-sm text-purple-200 backdrop-blur">
                                    Quốc gia yêu thích
                                </div>
                                <div className="absolute bottom-24 left-24 rounded-xl border border-purple-400/20 bg-[#201044]/80 px-4 py-2 text-sm text-purple-200 backdrop-blur">
                                    Năm sản xuất
                                </div>
                                <div className="absolute bottom-20 right-20 rounded-xl border border-purple-400/20 bg-[#201044]/80 px-4 py-2 text-sm text-purple-200 backdrop-blur">
                                    Cảm xúc hôm nay
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            <section className="px-6 pb-10 lg:px-10">
                <div className="mx-auto max-w-7xl">
                    <Card variant="borderless" className="!border-0 !bg-transparent">

                        <h2 className="mb-8 text-2xl font-bold text-white">
                            MovieHint hoạt động như thế nào?
                        </h2>

                        <Steps
                            responsive
                            items={[
                                {
                                    title: <span className="text-white">Chia sẻ sở thích</span>,
                                    content: <span className="text-gray-400">Bạn chia sẻ các thể loại phim yêu thích của mình.</span>,
                                    icon: <User className="text-purple-400" />,
                                },
                                {
                                    title: <span className="text-white">MH phân tích</span>,
                                    content: <span className="text-gray-400">MH phân tích thói quen và sở thích xem phim của bạn.</span>,
                                    icon: <Brain className="text-purple-400" />,
                                },
                                {
                                    title: <span className="text-white">Nhận đề xuất</span>,
                                    content: <span className="text-gray-400">Hệ thống đề xuất danh sách phim phù hợp nhất.</span>,
                                    icon: <Film className="text-purple-400" />,
                                },
                                {
                                    title: <span className="text-white">Đánh giá & cải thiện</span>,
                                    content: <span className="text-gray-400">Bạn đánh giá phim để MH ngày càng hiểu gu của bạn hơn.</span>,
                                    icon: <Heart className="text-purple-400" />,
                                },
                            ]}
                        />
                    </Card>

                </div>
            </section>
        </div>
    );
}