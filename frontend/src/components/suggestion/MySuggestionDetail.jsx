"use client";

import useMySuggestionDetail from "@/hooks/suggestion/useMySuggestionDetail";
import { Empty, Spin, Tag } from "antd";

const statusConfig = {
    PENDING: {
        label: "Chờ duyệt",
        className:
            "!border-[#F3C66D]/50 !bg-[#FFF7E5] !text-[#C9962E] !shadow-[0_4px_12px_rgba(243,198,109,0.12)]",
    },
    APPROVED: {
        label: "Đã duyệt",
        className:
            "!border-[#8BC9A8]/50 !bg-[#EFFAF3] !text-[#4E9A6D] !shadow-[0_4px_12px_rgba(139,201,168,0.12)]",
    },
    REJECTED: {
        label: "Từ chối",
        className:
            "!border-[#E9A9C4]/50 !bg-[#FFF1F5] !text-[#C7798F] !shadow-[0_4px_12px_rgba(233,169,196,0.12)]",
    },
};

const formatDate = (date) => {
    if (!date) return "—";

    const [datePart, timePart] = date.split("T");

    const [year, month, day] = datePart.split("-");
    const [hour, minute] = timePart.split(":");

    return `${hour}:${minute} ${day}/${month}/${year}`;
};

export default function MySuggestionDetail({ id }) {
    const { suggestion, loading, error } = useMySuggestionDetail(id);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Spin size="large" />
            </div>
        );
    }

    if (error || !suggestion) {
        return (
            <div className="rounded-[24px] border border-[#F3DDE4] bg-[#FFFDFC] py-20 shadow-[0_12px_40px_rgba(91,55,70,0.08)]">
                <Empty description="Không tìm thấy phim đề xuất." />
            </div>
        );
    }

    const status = statusConfig[suggestion.status];

    return (
        <div className="relative overflow-hidden rounded-[28px] border border-[#EBDDE4] bg-[#FFFDFC] shadow-[0_20px_60px_rgba(91,55,70,0.12)]">
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#E9A9C4]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-[#B8DDE0]/20 blur-3xl" />

            <div className="relative border-b border-[#F0DDE5] bg-gradient-to-r from-[#FFF0F5] via-[#FFF7F0] to-[#FFF8E8] px-7 py-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C7798F]">
                            Phim đã đề xuất
                        </p>

                        <h2 className="text-2xl font-bold leading-tight text-[#40343B] md:text-[28px]">
                            {suggestion.title_vn}
                        </h2>

                        {suggestion.title_en && (
                            <p className="mt-1.5 text-sm font-medium text-[#9A858D]">
                                {suggestion.title_en}
                            </p>
                        )}
                    </div>

                    {status && (
                        <Tag
                            className={`!mr-0 !rounded-full !px-4 !py-1.5 !text-xs !font-bold ${status.className}`}
                        >
                            {status.label}
                        </Tag>
                    )}
                </div>
            </div>

            <div className="relative grid gap-4 p-6 md:grid-cols-2">
                <div className="rounded-2xl border border-[#F0D4DF] bg-[#FFF3F7] p-5">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#C7798F]">
                        Tên phim tiếng Việt
                    </p>
                    <p className="text-[15px] font-semibold text-[#51434A]">
                        {suggestion.title_vn}
                    </p>
                </div>

                <div className="rounded-2xl border border-[#E7DCC8] bg-[#FFF9E9] p-5">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#C49B43]">
                        Tên phim tiếng Anh
                    </p>
                    <p className="text-[15px] font-semibold text-[#51434A]">
                        {suggestion.title_en || "—"}
                    </p>
                </div>

                <div className="rounded-2xl border border-[#D5E5EA] bg-[#F0FAFC] p-5">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#6D9CA5]">
                        Năm phát hành
                    </p>
                    <p className="text-[15px] font-semibold text-[#51434A]">
                        {suggestion.release_year}
                    </p>
                </div>

                <div className="rounded-2xl border border-[#DDD5EB] bg-[#F7F3FC] p-5">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#8B79A8]">
                        Quốc gia
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {suggestion.country?.map((country) => (
                            <Tag
                                key={country}
                                className="!mr-0 !rounded-full !border-[#DDD2E8] !bg-[#EEE8F7] !px-2.5 !py-0.5 !text-xs !font-medium !text-[#76658D]"
                            >
                                {country}
                            </Tag>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border border-[#D8E8D8] bg-[#F2FAF2] p-5">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#6F9C76]">
                        Ngày đề xuất
                    </p>
                    <p className="text-sm font-semibold text-[#51434A]">
                        {formatDate(suggestion.date_added)}
                    </p>
                </div>

                <div className="rounded-2xl border border-[#F0DCCB] bg-[#FFF6ED] p-5">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#C58B5D]">
                        Ngày xử lý
                    </p>
                    <p className="text-sm font-semibold text-[#51434A]">
                        {formatDate(suggestion.reviewed_date)}
                    </p>
                </div>

                <div className="md:col-span-2">
                    <div className="mb-3 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#E5B76F]" />
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#A4866A]">
                            Mô tả phim
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#EBDCCB] bg-[#FFF9F1] px-5 py-4 text-sm leading-7 text-[#65565D]">
                        {suggestion.description_vn}
                    </div>
                </div>

                {suggestion.admin_note && (
                    <div className="md:col-span-2">
                        <div className="mb-3 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#D99AB2]" />
                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#A27787]">
                                Ghi chú từ quản trị viên
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[#E7D1DC] bg-[#FFF4F7] px-5 py-4 text-sm leading-7 text-[#65565D]">
                            {suggestion.admin_note}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}