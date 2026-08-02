"use client";

import MainLayout from "@/components/layout/MainLayout";
import MovieInfo from "@/components/movie/detail/MovieInfo";
import MovieTabs from "@/components/movie/detail/MovieTabs";

import useMovieDetail from "@/hooks/movie/useMovieDetail";
import { useParams } from "next/navigation";

export default function MovieDetailPage() {
    const {id} = useParams();

    const { movie, loading } = useMovieDetail(id);

    if (loading)
        return (
            <MainLayout>
                Loading...
            </MainLayout>
        );

    return (
        <MainLayout>

            <MovieInfo movie={movie} />

            <MovieTabs movie={movie} />

        </MainLayout>
    );
}