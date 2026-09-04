"use client";

import { Tabs } from "antd";

import MovieOverview from "./MovieOverview";
import MovieSummary from "./MovieSummary";
import MovieFeedbacks from "./MovieFeedbacks";
import { useAuth } from "@/hooks/useAuth";
import { LoginOutlined } from "@ant-design/icons";

export default function MovieTabs({ movie }) {
    const {isAuthenticated}=useAuth();
    return (
        <section className="mt-12">

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#2b2740] shadow-xl">

                <Tabs
                    defaultActiveKey="1"
                    size="large"
                    className="movie-tabs"
                    tabBarStyle={{
                        margin: 0,
                        padding: "0 28px",
                        background: "#211d35",
                        borderBottom: "1px solid rgba(255,255,255,.08)",
                    }}
                    items={[
                        {
                            key: "1",
                            label: (
                                <span className="px-2 text-base font-medium">
                                    Tổng quan
                                </span>
                            ),
                            children: (
                                <div className="space-y-8 p-8">
                                    <MovieOverview movie={movie} />
                                    <MovieSummary movie={movie} />
                                </div>
                            ),
                        },

                        {
                            key: "2",
                            label: (
                                <span className="px-2 text-base font-medium">
                                    Đánh giá
                                </span>
                            ),
                            children: isAuthenticated ? (
                                <MovieFeedbacks movieId={movie.id} />
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-8 text-center">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/15 text-xl text-purple-400">
                                        <LoginOutlined />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Bạn chưa đăng nhập</p>
                                        <p className="mt-1 text-sm text-gray-400">Vui lòng đăng nhập để đánh giá phim.</p>
                                    </div>
                                </div>
                            ),
                        },

                        // {
                        //     key: "3",
                        //     label: (
                        //         <span className="px-2 text-base font-medium">
                        //             Phim tương tự
                        //         </span>
                        //     ),
                        //     children: (
                        //         <div className="p-8 text-gray-300">
                        //             Chưa có dữ liệu.
                        //         </div>
                        //     ),
                        // },
                    ]}
                />

            </div>

        </section>
    );
}