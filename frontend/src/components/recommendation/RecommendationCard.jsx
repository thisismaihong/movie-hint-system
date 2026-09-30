"use client";

import { Card, Divider, Progress, Tag, Tooltip, Typography } from "antd";
import { BulbOutlined, CalendarOutlined, StarFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Text } = Typography;

export default function RecommendationCard({ recommendation }) {
    const router = useRouter();
    const movie=recommendation.movie;

    const score = Math.round((recommendation.score || 0) * 100);
    const title = movie.title_vn || movie.title_en;

    const handleClick = () => {
        router.push(`/movies/${movie.movie_id}`);
    };

    return (
        <Card
            hoverable
            onClick={handleClick}
            variant={false}
            className="cursor-pointer !overflow-hidden !rounded-[24px] !border !border-[#E5E0D8] !bg-white transition-all duration-300 hover:-translate-y-1 hover:!border-[#D6B84C]/40 hover:shadow-[0_12px_40px_rgba(80,70,40,0.10)]"
            styles={{ body: { padding: 0 } }}
        >
            <div className="p-5">
                <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="line-clamp-2 text-lg font-bold leading-7 text-[#24211D]">
                            {title}
                        </h3>

                        {movie.title_vn && movie.title_en && (
                            <Text className="mt-1 block !text-sm !text-[#77716A]">
                                {movie.title_en}
                            </Text>
                        )}
                    </div>

                    <Tag
                        icon={<CalendarOutlined />}
                        className="!m-0 !shrink-0 !rounded-full !border-[#DDD7CC] !bg-[#F7F5F1] !px-3 !py-1 !text-[#5F5952]"
                    >
                        {movie.release_year}
                    </Tag>
                </div>

                <div className="mb-4">
                    <div className="mb-1.5 flex items-center justify-between">
                        <Text className="!text-sm !text-[#77716A]">
                            Độ phù hợp
                        </Text>

                        <div className="flex items-center gap-1.5">
                            <StarFilled className="!text-[#D6A91D]" />
                            <Text className="!text-sm !font-semibold !text-[#8A6D16]">
                                {score}%
                            </Text>
                        </div>
                    </div>

                    <Progress
                        percent={score}
                        showInfo={false}
                        strokeColor="#D6B84C"
                        railColor="#EAE6DE"
                        size="small"
                    />
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                    {movie.genres?.map((genre) => (
                        <Tag
                            key={genre}
                            className="!m-0 !rounded-full !border-[#DDD7CC] !bg-[#F7F5F1] !text-[#5F5952]"
                        >
                            {genre}
                        </Tag>
                    ))}
                </div>
                <Divider className="!my-4 !border-[#E8E3DB]" />
                <Tooltip
                    title={recommendation.reason}
                    placement="top"
                    color="#FFF8D6"
                    styles={{
                        body: {
                            maxWidth: 420,
                            color: "#2D2926",
                            lineHeight: 1.6,
                        },
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="group rounded-2xl border border-[#D6B84C]/30 bg-[#F7E7A8] p-4 transition-all duration-300 hover:border-[#C9A92E]/50 hover:bg-[#F9EAB5]"
                    >
                        <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D6B84C]/20">
                                <BulbOutlined className="!text-[#8A6D16]" />
                            </div>

                            <Text className="!font-semibold !text-[#3A321F]">
                                Được đề xuất vì
                            </Text>
                        </div>
                        <p className="line-clamp-3 text-sm leading-6 text-[#3A362D]">
                            {recommendation.reason}
                        </p>
                        <span className="mt-2 block text-xs text-[#8A6D16] opacity-0 transition-opacity group-hover:opacity-100">
                            Di chuột để xem đầy đủ lý do
                        </span>
                    </div>
                </Tooltip>
            </div>
        </Card>
    );
}