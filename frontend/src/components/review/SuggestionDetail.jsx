"use client";

import useDetailSuggestion from "@/hooks/suggestion/useDetailSuggestion";
import { Empty, Spin, Tag } from "antd";

export default function SuggestionDetail({ id }) {
    const { suggestion, loading, error } = useDetailSuggestion(id);

    const getStatusTag = (status) => {
        const statusConfig = {
            PENDING: {
                label: "Chờ duyệt",
                color: "gold",
            },
            APPROVED: {
                label: "Đã duyệt",
                color: "green",
            },
            REJECTED: {
                label: "Từ chối",
                color: "red",
            },
        };

        const config = statusConfig[status] || {
            label: status,
            color: "default",
        };

        return <Tag color={config.color}>{config.label}</Tag>;
    };

    const formatDate = (date) => {
        if (!date) return "—";

        const [datePart, timePart] = date.split("T");
        const [year, month, day] = datePart.split("-");
        const [hour, minute] = timePart.split(":");

        return `${hour}:${minute} ${day}/${month}/${year}`;
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Spin size="large" />
            </div>
        );
    }

    if (error || !suggestion) {
        return (
            <div className="rounded-[22px] border border-[#F3DDE4] bg-[#FFFDFC] py-16 shadow-[0_12px_40px_rgba(91,55,70,0.08)]">
                <Empty
                    description={
                        <span className="text-[#8A747D]">
                            Không tìm thấy thông tin phim đề xuất.
                        </span>
                    }
                />
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden rounded-[24px] border border-[#F3DDE4] bg-[#FFFDFC] shadow-[0_14px_45px_rgba(91,55,70,0.08)]">
            
            <div className="border-b border-[#F3DDE4] bg-gradient-to-r from-[#FFF0F4] via-[#FFF8F2] to-[#FFF7E4] px-7 py-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="mb-1 text-sm font-medium text-[#C58B9B]">
                            ĐỀ XUẤT PHIM
                        </p>
                        <h2 className="text-2xl font-bold tracking-tight text-[#5C4A52]">
                            {suggestion.title_vn}
                        </h2>
                    </div>

                    <div className="shrink-0">
                        {getStatusTag(suggestion.status)}
                    </div>
                </div>
            </div>

            <div className="p-7">
                <div className="grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#B49AA3]">
                            Mã phim
                        </p>
                        <p className="font-semibold text-[#51434A]">
                            #{suggestion.id}
                        </p>
                    </div>

                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#B49AA3]">
                            Trạng thái
                        </p>
                        <div>{getStatusTag(suggestion.status)}</div>
                    </div>

                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#B49AA3]">
                            Tên phim tiếng Việt
                        </p>
                        <p className="font-semibold text-[#51434A]">
                            {suggestion.title_vn}
                        </p>
                    </div>

                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#B49AA3]">
                            Tên phim tiếng Anh
                        </p>
                        <p className="text-[#51434A]">
                            {suggestion.title_en || "Chưa có"}
                        </p>
                    </div>

                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#B49AA3]">
                            Năm phát hành
                        </p>
                        <p className="font-medium text-[#51434A]">
                            {suggestion.release_year}
                        </p>
                    </div>

                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#B49AA3]">
                            Quốc gia
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {suggestion.country?.length ? (
                                suggestion.country.map((country) => (
                                    <Tag
                                        key={country}
                                        className="!m-0 !rounded-full !border-[#E8D8DE] !bg-[#FFF3F6] !px-3 !py-1 !text-[#8A6672]"
                                    >
                                        {country}
                                    </Tag>
                                ))
                            ) : (
                                <span className="text-[#927F87]">Chưa có</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#B49AA3]">
                            Người đề xuất
                        </p>
                        <p className="font-medium text-[#51434A]">
                            {suggestion.suggested_by}
                        </p>
                    </div>

                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#B49AA3]">
                            Ngày đề xuất
                        </p>
                        <p className="text-[#51434A]">
                            {formatDate(suggestion.date_added)}
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <div className="rounded-2xl border border-[#F5E3E7] bg-gradient-to-br from-[#FFF9F7] to-[#FFFDF8] p-5">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#C58B9B]">
                                Mô tả phim
                            </p>
                            <p className="leading-7 text-[#51434A]">
                                {suggestion.description_vn}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}