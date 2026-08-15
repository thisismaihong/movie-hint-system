"use client";

import { Card, Tag, Tooltip, Typography } from "antd";
import { BulbOutlined, CalendarOutlined, StarFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Text } = Typography;

export default function SearchMovieCard({ movie }) {
    const router = useRouter();

    const title = movie.title_vn || movie.title_en;
    const score = Math.round((movie.score || 0) * 100);

    const handleClick = () => {
        router.push(`/movies/${movie.movie_id}`);
    };

    return (
        <Card
            hoverable
            onClick={handleClick}
            variant={false}
            className="group h-full cursor-pointer !overflow-hidden !rounded-[24px] !border !border-[#E8E0F0] !bg-white transition-all duration-300 hover:-translate-y-1 hover:!border-[#B9A7E8]/60 hover:shadow-[0_16px_40px_rgba(111,91,149,0.12)]"
            styles={{ body: { padding: 0 } }}
        >
            <div className="flex h-full flex-col p-5">
                <div className="mb-5 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="line-clamp-2 text-lg font-bold leading-7 text-[#29252F]">
                            {title}
                        </h3>

                        {movie.title_vn && movie.title_en && (
                            <Text className="mt-1 block !text-sm !text-[#8A838F]">
                                {movie.title_en}
                            </Text>
                        )}
                    </div>

                    <Tag
                        icon={<CalendarOutlined />}
                        className="!m-0 !shrink-0 !rounded-full !border-[#B9A7E8]/30 !bg-[#F3EFFB] !px-3 !py-1 !text-[#6F5B95]"
                    >
                        {movie.release_year}
                    </Tag>
                </div>

                <div className="mb-5 flex items-center justify-between rounded-2xl bg-[#F8F5FC] px-4 py-3">
                    <div className="flex items-center gap-2">
                        <StarFilled className="!text-[#A995DC]" />

                        <span className="text-sm font-medium text-[#716A78]">
                            Mức độ phù hợp
                        </span>
                    </div>

                    <span className="font-bold text-[#6F5B95]">
                        {score}%
                    </span>
                </div>

                <div className="mb-5 flex-1">
                    <Tooltip
                        title={movie.reason}
                        placement="top"
                        color="#F5F1FB"
                        styles={{
                            body: {
                                maxWidth: 420,
                                color: "#332D3B",
                                lineHeight: 1.6,
                            },
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-2xl border border-[#B9A7E8]/30 bg-[#F0EAF9] p-4 transition-all duration-300 hover:border-[#A995DC]/50 hover:bg-[#ECE5F7]"
                        >
                            <div className="mb-2 flex items-center gap-2">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#B9A7E8]/20">
                                    <BulbOutlined className="!text-[#806BAA]" />
                                </div>

                                <Text className="!font-semibold !text-[#5F4C7F]">
                                    Vì sao phù hợp?
                                </Text>
                            </div>

                            <p className="line-clamp-3 text-sm leading-6 text-[#4F4859]">
                                {movie.reason}
                            </p>

                            <span className="mt-2 block text-xs text-[#806BAA] opacity-0 transition-opacity group-hover:opacity-100">
                                Di chuột để xem đầy đủ
                            </span>
                        </div>
                    </Tooltip>
                </div>

                <div className="mt-auto border-t border-[#EEEAF1] pt-4">
                    <span className="text-xs font-medium text-[#A09AA5]">
                        ID phim: {movie.movie_id}
                    </span>
                </div>
            </div>
        </Card>
    );
}