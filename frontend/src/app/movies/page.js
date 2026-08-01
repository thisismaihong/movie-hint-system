"use client";

import MainLayout from "@/components/layout/MainLayout";
import MovieGrid from "@/components/movie/MovieGrid";
import MoviePagination from "@/components/movie/MoviePagination";
import MovieSearch from "@/components/movie/MovieSearch";
import useMovies from "@/hooks/movie/useMovies";
import { CalendarOutlined } from "@ant-design/icons";

export default function MoviesPage() {
    const { movies, genres, countries, loading, filters, pagination, handleChange, handleSearch, resetFilters, fetchMovies } = useMovies();
    return (
        <MainLayout>
        
            <MovieSearch
                filters={filters}
                genres={genres}
                countries={countries}
                loading={loading}
                onChange={handleChange}
                onSearch={handleSearch}
                onReset={resetFilters}
            />

            <section className="mb-10 mt-10 flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl md:flex-row md:items-center md:justify-between">

                <div>
                    <h2 className="text-2xl font-bold text-white">
                        Kết quả tìm kiếm
                    </h2>

                    <p className="mt-2 text-gray-300">
                        Hiển thị
                        <span className="mx-2 rounded-full bg-purple-500 px-3 py-1 font-semibold text-white">
                            {pagination.total.toLocaleString()}
                        </span>
                        bộ phim.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="rounded-full border border-purple-400/40 bg-purple-500/10 px-5 py-2 text-sm font-medium text-purple-200">
                        <CalendarOutlined /> Mới nhất
                    </span>
                </div>

            </section>

            <MovieGrid movies={movies} />

            <MoviePagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={(page) => fetchMovies(page)}
            />

        </MainLayout>
    );
}