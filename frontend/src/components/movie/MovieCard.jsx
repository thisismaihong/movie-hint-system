"use client";

import { Card } from "antd";
import Image from "next/image";
import {CalendarOutlined, GlobalOutlined, RightOutlined} from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function MovieCard({ movie }) {
    const router = useRouter();

    return (
        <Card
            hoverable
            variant="borderless"
            onClick={() => router.push(`/movies/${movie.id}`)}
            className="group overflow-hidden rounded-3xl border border-[#c3bfd4] bg-[#d7dfe4] shadow-lg shadow-purple-200/30 transition-all duration-300 hover:-translate-y-2 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-300/40"
            cover={
                <div className="relative overflow-hidden">
                    <Image
                        src={movie.poster || "/images/poster.png"}
                        alt={movie.title_vn || movie.title_en}
                        width={400}
                        height={600}
                        className="h-[250px] w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <div className="w-full p-5">
                            <h3 className="line-clamp-2 text-lg font-bold text-white">
                                {movie.title_vn || movie.title_en}
                            </h3>
                            {movie.title_vn && (
                                <p className="mt-1 line-clamp-1 text-sm text-gray-300">
                                    {movie.title_en}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="absolute right-3 top-3 rounded-full bg-purple-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
                        <CalendarOutlined className="mr-1" />
                        {movie.release_year}
                    </div>

                </div>
            }
        >
            <div className="flex h-[155px] flex-col justify-between">
                <div>
                    <h3 className="line-clamp-1 text-xl font-bold text-gray-900">
                        {movie.title_vn || movie.title_en}
                    </h3>

                    <p className="mt-1 line-clamp-1 text-sm text-gray-600 italic">
                        {movie.title_en}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                        <GlobalOutlined className="text-purple-600" />

                        <span>
                            {movie.countries[0]?.name || "Đang cập nhật"}
                        </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {movie.genres.slice(0, 3).map((genre) => (
                            <span
                                key={genre.id}
                                className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-end text-sm font-semibold text-purple-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Xem chi tiết
                    <RightOutlined className="ml-2 text-xs" />
                </div>

            </div>
        </Card>
    );
}