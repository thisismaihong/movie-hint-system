"use client";

import { Button, Input, Select } from "antd";
import {SearchOutlined, ReloadOutlined} from "@ant-design/icons";

export default function MovieSearch({filters, genres, countries, loading, onChange, onSearch, onReset}) {
    const yearOptions = [
        {
            value: "",
            label: "Tất cả",
        },
        ...Array.from({ length: 70 }, (_, index) => {
            const year = 2026 - index;

            return {
                value: year,
                label: year.toString(),
            };
        }),
    ];

    return (
        <div className="mx-auto mb-10 w-full max-w-5xl rounded-[28px] bg-[#2d2943] p-7 shadow-xl">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-13">

                <div className="lg:col-span-5">
                    <label className="mb-2 block text-sm font-medium text-white/90">
                        Tìm kiếm
                    </label>

                    <Input
                        size="large"
                        value={filters.q}
                        onChange={(e) => onChange("q", e.target.value)}
                        placeholder="Nhập tên phim, diễn viên..."
                        prefix={<SearchOutlined className="text-white/60" />}
                        className="!h-14 !rounded-xl !border-0 !bg-[#1f1b34]"
                        classNames={{
                            input: "!text-white placeholder:!text-white/60",
                        }}
                    />
                </div>

                <div className="lg:col-span-3">
                    <label className="mb-2 block text-sm font-medium text-white/90">
                        Quốc gia
                    </label>

                    <Select
                        size="large"
                        loading={loading}
                        value={filters.country}
                        onChange={(value) =>onChange("country", value)}
                        className="w-full"
                        options={[
                            {
                                label: "Tất cả",
                                value: "",
                            },
                            ...countries.map((country) => ({
                                label: country.name,
                                value: String(country.id),
                            })),
                        ]}
                    />
                </div>
                <div className="lg:col-span-3">
                    <label className="mb-2 block text-sm font-medium text-white/90">
                        Thể loại
                    </label>

                    <Select
                        size="large"
                        loading={loading}
                        value={filters.genre}
                        onChange={(value) => onChange("genre", value)}
                        className="w-full"
                        options={[
                            {
                                label: "Tất cả",
                                value: "",
                            },
                            ...genres.map((genre) => ({
                                label: genre.name,
                                value: String(genre.id),
                            })),
                        ]}
                    />
                </div>

                <div className="lg:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-white/90">
                        Năm phát hành
                    </label>

                    <Select
                        size="large"
                        value={filters.release_year}
                        onChange={(value) => onChange("release_year", value)}
                        className="w-full"
                        options={yearOptions}
                    />
                                </div>

                <div className="lg:col-span-10 flex gap-3">
                    <Button
                        type="primary"
                        size="large"
                        onClick={onSearch}
                        className="!h-10 !rounded-xl !border-0 !px-8 !text-base !font-semibold"
                        style={{ background: "linear-gradient(90deg,#8B5CF6,#A855F7)" }}
                    >
                        Tìm kiếm
                    </Button>

                    <Button
                        size="large"
                        shape="circle"
                        onClick={onReset}
                        icon={<ReloadOutlined />}
                        className="!h-10 !w-10 !border-0 !bg-white"
                    />
                </div>

            </div>
        </div>
    );
}