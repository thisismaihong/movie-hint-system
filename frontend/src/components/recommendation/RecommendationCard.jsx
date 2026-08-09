"use client";

import { Card, Divider, Progress, Tag, Tooltip, Typography } from "antd";
import { BulbOutlined, CalendarOutlined, StarFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Text } = Typography;

export default function RecommendationCard({ movie }) {
    const router = useRouter();

    const score = Math.round((movie.recommendation_score || 0) * 100);
    const title = movie.title_vn || movie.title_en;

    const handleClick = () => {
        router.push(`/movies/${movie.movie_id}`);
    };

    return (
        <Card
            hoverable
            onClick={handleClick}
            variant={false}
            className="cursor-pointer !overflow-hidden !rounded-[24px] !border !border-white/10 !bg-[#211d38] transition-all duration-300 hover:-translate-y-1 hover:!border-purple-500/40 hover:shadow-[0_12px_40px_rgba(124,58,237,0.15)]"
            styles={{ body: { padding: 0 } }}
        >
            <div className="p-5">
                {/* Header */}
                <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="line-clamp-2 text-lg font-bold leading-7 text-white">
                            {title}
                        </h3>

                        {movie.title_vn && movie.title_en && (
                            <Text className="mt-1 block !text-sm !text-gray-500">
                                {movie.title_en}
                            </Text>
                        )}
                    </div>

                    <Tag
                        icon={<CalendarOutlined />}
                        className="!m-0 !shrink-0 !rounded-full !border-purple-400/20 !bg-purple-500/10 !px-3 !py-1 !text-purple-300"
                    >
                        {movie.release_year}
                    </Tag>
                </div>

                {/* Match score */}
                <div className="mb-4">
                    <div className="mb-1.5 flex items-center justify-between">
                        <Text className="!text-sm !text-gray-400">
                            Độ phù hợp
                        </Text>

                        <div className="flex items-center gap-1.5">
                            <StarFilled className="!text-yellow-400" />
                            <Text className="!text-sm !font-semibold !text-purple-300">
                                {score}%
                            </Text>
                        </div>
                    </div>

                    <Progress
                        percent={score}
                        showInfo={false}
                        strokeColor="#8B5CF6"
                        railColor="#3a3552"
                        size="small"
                    />
                </div>

                <Divider className="!my-4 !border-white/10" />

                {/* AI reason */}
                <Tooltip
                    title={movie.reason}
                    placement="top"
                    color="#2d2943"
                    styles={{
                        body: {
                            maxWidth: 420,
                            color: "#e5e7eb",
                            lineHeight: 1.6,
                        },
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="group rounded-2xl border border-purple-400/10 bg-purple-500/5 p-4 transition-all duration-300 hover:border-purple-400/30 hover:bg-purple-500/10"
                    >
                        <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/15">
                                <BulbOutlined className="!text-purple-400" />
                            </div>

                            <Text className="!font-semibold !text-purple-300">
                                Vì sao đề xuất?
                            </Text>
                        </div>

                        <p className="line-clamp-3 text-sm leading-6 text-gray-300">
                            {movie.reason}
                        </p>

                        <span className="mt-2 block text-xs text-purple-400 opacity-0 transition-opacity group-hover:opacity-100">
                            Di chuột để xem đầy đủ lý do
                        </span>
                    </div>
                </Tooltip>
            </div>
        </Card>
    );
}