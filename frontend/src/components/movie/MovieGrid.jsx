"use client";

import MovieCard from "./MovieCard";

export default function MovieGrid({ movies=[], extraActions}) {
    if (movies.length === 0) {
        return (
            <div className="flex min-h-[350px] items-center justify-center rounded-3xl border border-white/10 bg-white/5">
                <div className="text-center">
                    <h3 className="mt-4 text-2xl font-semibold text-white">
                        Không tìm thấy phim
                    </h3>
                    <p className="mt-2 text-gray-400">
                        Hãy thử thay đổi từ khóa hoặc bộ lọc tìm kiếm.
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    extraActions={extraActions? extraActions(movie): null}
                />
            ))}
        </div>
    );
    
}