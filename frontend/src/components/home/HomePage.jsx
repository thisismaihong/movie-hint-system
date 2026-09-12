"use client";

import { Button } from "antd";
import { ArrowRight, Clapperboard, Film, Heart, Search, Sparkles, Star, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router=useRouter();
    return (
        <div className="min-h-screen bg-[#07021f] text-white">

            <section className="px-5 py-8 lg:px-10 lg:py-10">
                <div className="mx-auto max-w-7xl">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#211d38]">
                        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl" />
                        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

                        <div className="relative grid min-h-[430px] lg:grid-cols-2">
                         
                            <div className="flex flex-col justify-center px-7 py-12 sm:px-10 lg:px-14">
                                <div className="mb-5 flex items-center gap-2 text-sm font-medium text-purple-300">
                                    <Clapperboard size={18} />
                                    <span>Khám phá phim theo cách của bạn</span>
                                </div>

                                <h1 className="max-w-xl text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-[52px]">
                                    Hôm nay xem gì?
                                    <br />
                                    <span className="text-purple-400">
                                        Để MovieHint giúp bạn.
                                    </span>
                                </h1>

                                <p className="mt-5 max-w-lg text-[15px] leading-7 text-gray-400">
                                    Tìm những bộ phim hợp gu của bạn dựa trên
                                    thể loại, quốc gia, năm phát hành và những
                                    gì bạn thực sự thích.
                                </p>

                                <div className="mt-7 flex flex-wrap gap-3">
                                    <Button
                                        onClick={()=>router.push("/movies")}
                                        type="primary"
                                        size="large"
                                        icon={<Sparkles size={17} />}
                                        className="!h-11 !rounded-xl !border-0 !bg-purple-600 !px-6 !font-semibold !shadow-lg !shadow-purple-600/20 hover:!bg-purple-500"
                                    >
                                        Khám phá phim
                                    </Button>

                                    <Button
                                        onClick={()=>router.push("/movies")}
                                        size="large"
                                        icon={<Search size={17} />}
                                        className="!h-11 !rounded-xl !border-white/10 !bg-white/5 !px-6 !text-white hover:!border-purple-400/30 hover:!bg-white/10 hover:!text-white"
                                    >
                                        Tìm kiếm
                                    </Button>
                                </div>

                                <div className="mt-8 flex flex-wrap gap-2">
                                    {["Action", "Drama", "Comedy", "Sci-Fi", "Romance"].map(
                                        (genre) => (
                                            <span
                                                key={genre}
                                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400"
                                            >
                                                {genre}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="relative hidden min-h-[430px] overflow-hidden lg:block">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative h-[330px] w-[230px] rotate-[-8deg] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-purple-700 via-purple-900 to-[#17122d] shadow-2xl">
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-24">
                                            <p className="text-xs uppercase tracking-widest text-purple-300">
                                                Recommended
                                            </p>
                                            <p className="mt-1 text-xl font-bold">
                                                Your next movie
                                            </p>
                                        </div>
                                        <Film
                                            size={70}
                                            strokeWidth={1}
                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/40"
                                        />
                                    </div>

                                    <div className="absolute ml-56 mt-10 h-[270px] w-[190px] rotate-[8deg] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#43356d] via-[#272044] to-[#151126] shadow-2xl">
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-20">
                                            <p className="text-xs text-gray-400">
                                                Based on your taste
                                            </p>
                                            <p className="mt-1 font-semibold">
                                                Worth watching
                                            </p>
                                        </div>
                                        <Star
                                            size={58}
                                            strokeWidth={1}
                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-300/50"
                                        />
                                    </div>

                                    <div className="absolute -ml-56 -mt-5 h-[210px] w-[150px] rotate-[5deg] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#30255b] to-[#17132d] shadow-xl">
                                        <Heart
                                            size={46}
                                            strokeWidth={1}
                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-300/50"
                                        />
                                    </div>
                                </div>

                                <div className="absolute bottom-8 right-10 flex items-center gap-2 rounded-xl border border-white/10 bg-[#17132d]/90 px-4 py-3 shadow-xl backdrop-blur">
                                    <Star
                                        size={17}
                                        className="fill-yellow-400 text-yellow-400"
                                    />
                                    <span className="text-sm text-gray-300">
                                        Phim hợp gu của bạn
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-5 pb-12 lg:px-10">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-7">
                        <p className="mb-2 text-sm font-medium text-purple-400">
                            MOVIEHINT
                        </p>

                        <h2 className="text-2xl font-bold text-white">
                            Tìm phim đúng gu, đơn giản hơn.
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Một vài bước để MovieHint hiểu bạn hơn.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-white/5 bg-[#211d38] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-purple-400/20">
                            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                                <User size={19} />
                            </div>

                            <h3 className="font-semibold text-white">
                                Chọn sở thích
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Chọn thể loại, quốc gia và khoảng thời gian
                                phim mà bạn yêu thích.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/5 bg-[#211d38] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-purple-400/20">
                            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                                <Search size={19} />
                            </div>

                            <h3 className="font-semibold text-white">
                                Mô tả điều bạn muốn
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Tìm kiếm bằng những gì bạn đang muốn xem ngay
                                lúc này.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/5 bg-[#211d38] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-purple-400/20">
                            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                                <Film size={19} />
                            </div>

                            <h3 className="font-semibold text-white">
                                Khám phá phim
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Xem những bộ phim phù hợp với sở thích và nhu
                                cầu của bạn.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/5 bg-[#211d38] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-purple-400/20">
                            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                                <Heart size={19} />
                            </div>

                            <h3 className="font-semibold text-white">
                                Càng dùng càng hiểu
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Đánh giá những bộ phim đã xem để MovieHint hiểu
                                gu của bạn hơn.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-5 pb-14 lg:px-10">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-purple-400/10 bg-purple-500/5 px-6 py-7 sm:flex-row sm:items-center sm:px-8">
                        <div>
                            <h2 className="text-xl font-bold text-white">
                                Sẵn sàng tìm bộ phim tiếp theo?
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Khám phá những bộ phim có thể bạn sẽ yêu thích.
                            </p>
                        </div>

                        <Button
                            onClick={()=>router.push("/movies")}
                            type="primary"
                            icon={<ArrowRight size={17} />}
                            iconPlacement="end"
                            className="!rounded-xl !border-0 !bg-purple-600 !px-5 !font-semibold hover:!bg-purple-500"
                        >
                            Bắt đầu khám phá
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}