"use client";

import { Tabs } from "antd";

import MovieOverview from "./MovieOverview";
import MovieSummary from "./MovieSummary";

export default function MovieTabs({ movie }) {
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
                            children: (
                                <div className="p-8 text-gray-300">
                                    Chưa có đánh giá.
                                </div>
                            ),
                        },

                        {
                            key: "3",
                            label: (
                                <span className="px-2 text-base font-medium">
                                    Phim tương tự
                                </span>
                            ),
                            children: (
                                <div className="p-8 text-gray-300">
                                    Chưa có dữ liệu.
                                </div>
                            ),
                        },
                    ]}
                />

            </div>

        </section>
    );
}