"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import SuggestionStatusTabs from "@/components/review/SuggestionStatusTabs";
import MySuggestionList from "@/components/suggestion/MySuggestionList";

export default function MySuggestionsPage() {
    const [activeStatus, setActiveStatus] = useState("PENDING");

    return (
        <MainLayout>
            <section className="mx-auto max-w-6xl pb-16">
                <div className="mb-8">
                    <div className="mb-3 flex items-center gap-3">
                        <span className="h-px w-8 bg-gradient-to-r from-[#E9A9C4] to-[#F3C66D]" />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7798F]">
                            Phim đã đề xuất
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-[#F8F3F6]">
                        Đề xuất của tôi
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#927F87]">
                        Theo dõi trạng thái những bộ phim bạn đã đề xuất cho
                        MovieHint.
                    </p>
                </div>

                <SuggestionStatusTabs
                    activeKey={activeStatus}
                    onChange={setActiveStatus}
                />

                <MySuggestionList activeStatus={activeStatus} />
            </section>
        </MainLayout>
    );
}