"use client";

import { useState } from "react";

import MainLayout from "@/components/layout/MainLayout";
import useSuggestions from "@/hooks/suggestion/useSuggestions";
import SuggestionStatusTabs from "@/components/review/SuggestionStatusTabs";
import ListSuggestion from "@/components/review/ListSuggestion";
import MoviePagination from "@/components/movie/MoviePagination";

export default function ReviewPage() {
    const [activeStatus, setActiveStatus] = useState("PENDING");
    const [currentPage, setCurrentPage] = useState(1);

    const {
        suggestions,
        loading,
        error,
        fetchSuggestions
    } = useSuggestions();

    const filteredSuggestions = suggestions.filter(
        (suggestion) => suggestion.status === activeStatus
    );

    const handleStatusChange = (key) => {
        setActiveStatus(key);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <MainLayout>
            <section className="mx-auto max-w-6xl pb-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Phim cần duyệt
                    </h1>

                    <div className="mt-3 h-1.5 w-12 rounded-full bg-gradient-to-r from-[#F6C978] via-[#F4A99A] to-[#E9A9C4]" />
                </div>

                <SuggestionStatusTabs
                    activeKey={activeStatus}
                    onChange={handleStatusChange}
                />

                <div className="mt-6">
                    <ListSuggestion
                        suggestions={filteredSuggestions}
                        loading={loading}
                        onDeleteSuccess={fetchSuggestions}
                    />
                </div>

                <MoviePagination
                    current={currentPage}
                    pageSize={20}
                    total={filteredSuggestions.length}
                    onChange={handlePageChange}
                />
            </section>
        </MainLayout>
    );
}