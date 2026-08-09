"use client";

import { Typography } from "antd";
import MainLayout from "@/components/layout/MainLayout";
import RecommendationGrid from "@/components/recommendation/RecommendationGrid";
import useRecommendations from "@/hooks/recommendations/useRecommendations";

const { Title, Paragraph } = Typography;

export default function RecommendationPage() {
    const { recommendation, loading, error } = useRecommendations();

    return (
        <MainLayout>
        <main className="min-h-screen bg-[#17142a] px-6 py-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <Title level={1} className="!mb-2 !text-white">
                        Phim đề xuất cho bạn
                    </Title>

                    <Paragraph className="!mb-0 !text-base !text-gray-400">
                        Những bộ phim được lựa chọn dựa trên sở thích và hành vi
                        của bạn.
                    </Paragraph>
                </div>

                {error ? (
                    <div className="rounded-[24px] border border-red-400/10 bg-red-500/5 p-6 text-center">
                        <p className="text-red-400">
                            Không thể tải danh sách phim đề xuất.
                        </p>
                    </div>
                ) : (
                    <RecommendationGrid
                        movies={recommendation}
                        loading={loading}
                    />
                )}
            </div>
        </main>
        </MainLayout>
    );
}