"use client";

import { Typography } from "antd";
import MainLayout from "@/components/layout/MainLayout";
import MovieSearch from "@/components/movie/MovieSearch";
import MoviePagination from "@/components/movie/MoviePagination";
import RecommendationGrid from "@/components/recommendation/RecommendationGrid";
import useRecommendations from "@/hooks/recommendations/useRecommendations";

const { Title, Paragraph } = Typography;

export default function RecommendationPage() {
    const { recommendation, genres, countries, loading, error, filters, pagination, 
        handleChange, handleSearch, resetFilters, fetchRecommendations } = useRecommendations();

    return (
        <MainLayout>
            <main className="min-h-screen bg-[#17142a] px-6 py-10">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8">
                        <Title level={1} className="!mb-2 !text-white">
                            Phim đề xuất cho bạn
                        </Title>
                        <Paragraph className="!mb-0 !text-base !text-gray-400">
                            Những bộ phim được lựa chọn dựa trên sở thích và
                            hành vi của bạn.
                        </Paragraph>
                    </div>

                    <MovieSearch
                        filters={filters}
                        genres={genres}
                        countries={countries}
                        loading={loading}
                        onChange={handleChange}
                        onSearch={handleSearch}
                        onReset={resetFilters}
                    />

                    {error ? (
                        <div className="rounded-[24px] border border-red-400/10 bg-red-500/5 p-6 text-center">
                            <p className="text-red-400">
                                Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.
                            </p>
                        </div>
                    ) : (
                        <>
                            <section className="mb-10 mt-10 flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">
                                        Đề xuất dành cho bạn
                                    </h2>
                                    <p className="mt-2 text-gray-300">
                                        Hiển thị
                                        <span className="mx-2 rounded-full bg-purple-500 px-3 py-1 font-semibold text-white">
                                            {pagination.total.toLocaleString()}
                                        </span>
                                        bộ phim.
                                    </p>
                                </div>
                            </section>
                            <RecommendationGrid
                                recommendations={recommendation}
                                loading={loading}
                            />
                            <MoviePagination
                                current={pagination.current}
                                pageSize={pagination.pageSize}
                                total={pagination.total}
                                onChange={(page) =>
                                    fetchRecommendations(page)
                                }
                            />
                        </>
                    )}
                </div>
            </main>
        </MainLayout>
    );
}