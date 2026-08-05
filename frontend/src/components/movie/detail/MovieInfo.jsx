"use client";

import Image from "next/image";
import { ArrowLeftOutlined, HeartOutlined, CalendarOutlined, ClockCircleOutlined, GlobalOutlined, UserOutlined, VideoCameraOutlined, HeartFilled } from "@ant-design/icons";
import { Button, Tag, Typography } from "antd";

import { useRouter } from "next/navigation";
import useAddFavorite from "@/hooks/favorite/useAddFavorite";
import { useAuth } from "@/hooks/useAuth";

const { Title, Text } = Typography;

export default function MovieInfo({ movie }) {
    const router = useRouter();
    const {loading, handleAdd}=useAddFavorite();
    const {isAuthenticated}=useAuth();

    const platformLinks = {
        "netflix": "https://www.netflix.com",
        "disney+": "https://www.disneyplus.com",
        "iqiyi":"https://www.iq.com"
    };

    return (
        <section>
            <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={() => router.back()}
                className="!mb-8 !px-0 !text-base !font-medium !text-gray-300 hover:!text-white"
            >
                Quay lại
            </Button>

            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-4">
                    <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                        <Image
                            src={ movie.poster || "/images/poster.png"}
                            width={500}
                            height={600}
                            alt=""
                            className="w-full object-cover"
                        />
                    </div>
                </div>

                <div className="col-span-8">
                    <div className="flex items-start justify-between">
                        <div>
                            <Title level={1} className="!mb-2 !text-white">
                                {movie.title_vn || movie.title_en}
                            </Title>

                            {movie.title_vn && (
                                <Text className="!text-lg !text-gray-400">
                                    {movie.title_en}
                                </Text>
                            )}

                        </div>

                        {
                            movie.is_favorite_movie ? (
                                <Button
                                    size="large"
                                    icon={<HeartFilled />}
                                    disabled
                                    className="!rounded-xl !border-0 !bg-pink-600 !text-white"
                                >
                                    Đã thêm yêu thích
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<HeartOutlined />}
                                    loading={loading}
                                    disabled={!isAuthenticated}
                                    onClick={() => handleAdd(movie.id)}
                                    className="!rounded-xl !border-0 !bg-gradient-to-r !from-purple-500 !to-fuchsia-500"
                                >
                                    Yêu thích
                                </Button>
                            )
                        }
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Tag
                            icon={<CalendarOutlined />}
                            className="!rounded-full !border-0 !bg-purple-600/20 !px-4 !py-2 !text-white"
                        >
                            {movie.release_year}
                        </Tag>

                        <Tag
                            className="!rounded-full !border-0 !bg-red-500/20 !px-4 !py-2 !text-red-300"
                        >
                            {movie.age_rating}
                        </Tag>

                        <Tag
                            icon={<ClockCircleOutlined />}
                            className="!rounded-full !border-0 !bg-sky-500/20 !px-4 !py-2 !text-sky-300"
                        >
                            {movie.duration}
                        </Tag>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        {movie.genres.map((g) => (
                            <Tag
                                key={g.id}
                                className="!rounded-full !border !border-purple-400/40 !bg-white/5 !px-4 !py-2 !text-gray-200"
                            >
                                {g.name}
                            </Tag>
                        ))}
                    </div>

                    <div className="mt-8 space-y-4">

                    <div className="space-y-5 mt-8">

                    <div className="flex items-start">
                        <span className="w-28 shrink-0 font-semibold text-white">
                            Đạo diễn:
                        </span>

                        <div className="flex flex-wrap gap-2">
                            {movie.directors.length > 0 ? (
                                movie.directors.map((d) => (
                                    <Tag
                                        key={d.id}
                                        className="!rounded-full !border-0 !bg-purple-500/20 !px-3 !py-1 !text-purple-200"
                                    >
                                        {d.name}
                                    </Tag>
                                ))
                            ) : (
                                <span className="text-gray-400">
                                    Đang cập nhật
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-start">
                        <span className="w-28 shrink-0 font-semibold text-white">
                            Diễn viên:
                        </span>

                        <div className="flex flex-wrap gap-2">
                            {movie.actors.length > 0 ? (
                                movie.actors.map((a) => (
                                    <Tag
                                        key={a.id}
                                        className="!rounded-full !border-0 !bg-blue-500/20 !px-3 !py-1 !text-blue-200"
                                    >
                                        {a.name}
                                    </Tag>
                                ))
                            ) : (
                                <span className="text-gray-400">
                                    Đang cập nhật
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-start">
                        <span className="w-28 shrink-0 font-semibold text-white">
                            Quốc gia:
                        </span>

                        <div className="flex flex-wrap gap-2">
                            {movie.countries.map((c) => (
                                <Tag
                                    key={c.id}
                                    className="!rounded-full !border-0 !bg-green-500/20 !px-3 !py-1 !text-green-200"
                                >
                                    {c.name}
                                </Tag>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-start">
                        <span className="w-28 shrink-0 font-semibold text-white">
                            Nền tảng:
                        </span>

                        <div className="flex flex-wrap gap-2">
                            {movie.platforms.map((p) => {
                                const link = platformLinks[p.name.toLowerCase()];

                                return link ? (
                                    <a
                                        key={p.id}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Tag className="!rounded-full !border-0 !bg-red-500/20 !px-3 !py-1 !text-red-200 transition hover:!bg-red-500/40">
                                            {p.name}
                                        </Tag>
                                    </a>
                                ) : (
                                    <Tag
                                        key={p.id}
                                        className="!rounded-full !border-0 !bg-red-500/20 !px-3 !py-1 !text-red-200"
                                    >
                                        {p.name}
                                    </Tag>
                                );
                            })}
                        </div>
                    </div>

                </div>

                </div>
                </div>
            </div>
        </section>
    );
}