"use client";

import { Card, Skeleton } from "antd";
import RecommendationCard from "./RecommendationCard";

export default function RecommendationGrid({recommendations = [], loading}) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <Card
                        key={index}
                        className="overflow-hidden rounded-3xl border-white/10 bg-[#211d38]"
                    >
                        <Skeleton active paragraph={{ rows: 4 }} />
                    </Card>
                ))}
            </div>
        );
    }

    if (recommendations.length === 0) {
        return (
            <div className="flex min-h-[350px] items-center justify-center rounded-3xl border border-white/10 bg-white/5">
                <div className="text-center">
                    <h3 className="text-2xl font-semibold text-white">
                        Không tìm thấy phim đề xuất
                    </h3>

                    <p className="mt-2 text-gray-400">
                        Hãy thử thay đổi điều kiện tìm kiếm.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recommendations.map((recommendation) => (
                <RecommendationCard
                    key={recommendation.movie.movie_id}
                    recommendation={recommendation}
                />
            ))}
        </div>
    );
}