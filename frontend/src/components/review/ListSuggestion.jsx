"use client";

import { Button, Empty, Spin, Tag } from "antd";
import { useRouter } from "next/navigation";

export default function ListSuggestion({
    suggestions = [],
    loading = false,
}) {
    const router = useRouter();

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
        return new Date(date).toLocaleDateString("vi-VN");
    };

    const getAction = (suggestion) => {
        const { status } = suggestion;
        if (status === "PENDING") {
            return (
                <Button
                    type="primary"
                    size="small"
                    className="!h-8 !rounded-lg !border-none !bg-[#E9A9C4] !px-3 !text-xs !font-semibold !text-white hover:!bg-[#DE91B1]"
                >
                    Bắt đầu duyệt
                </Button>
            );
        }

        if (status === "APPROVED") {
            return (
                <Button
                    type="primary"
                    size="small"
                    onClick={() => router.push(`/movies/${suggestion.id}`)}
                    className="!h-8 !rounded-lg !border-none !bg-[#BFA7E8] !px-3 !text-xs !font-semibold !text-white hover:!bg-[#AD91DC]"
                >
                    Xem chi tiết
                </Button>
            );
        }

        if (status === "REJECTED") {
            return (
                <Button
                    danger
                    size="small"
                    className="!h-8 !rounded-lg !px-3 !text-xs !font-semibold"
                >
                    Xóa
                </Button>
            );
        }

        return null;
    };

    if (loading) {
        return (
            <div className="flex justify-center py-16">
                <Spin size="large" />
            </div>
        );
    }

    if (!suggestions.length) {
        return (
            <div className="rounded-2xl border border-[#F3DDE4] bg-[#FFFDFC] py-16 shadow-sm">
                <Empty
                    description={
                        <span className="text-[#8A747D]">
                            Không có phim nào.
                        </span>
                    }
                />
            </div>
        );
    }

    return (
        <div className="w-full min-w-0 overflow-hidden rounded-[22px] border border-[#F3DDE4] bg-[#FFFDFC] shadow-[0_12px_40px_rgba(91,55,70,0.08)]">
            <div className="grid w-full grid-cols-[70px_minmax(0,1fr)_115px_125px_135px] border-b border-[#F3DDE4] bg-gradient-to-r from-[#FFF1F4] via-[#FFF8F2] to-[#FFF7E5] px-5 py-4 font-semibold text-[#5C4A52]">
                <div>Mã phim</div>
                <div>Tên phim</div>
                <div>Trạng thái</div>
                <div>Ngày yêu cầu</div>
                <div>Thao tác</div>
            </div>

            {suggestions.map((suggestion) => (
                <div
                    key={suggestion.id}
                    className="grid w-full grid-cols-[70px_minmax(0,1fr)_115px_125px_135px] items-center border-b border-[#F5E8EC] px-5 py-3.5 text-[#51434A] transition-all duration-200 last:border-b-0 hover:bg-[#FFF8F5]"
                >
                    <div className="font-semibold text-[#C58B9B]">
                        #{suggestion.id}
                    </div>

                    <div className="min-w-0 truncate pr-3 font-medium text-[#51434A]">
                        {suggestion.title_vn}
                    </div>

                    <div>
                        {getStatusTag(suggestion.status)}
                    </div>

                    <div className="text-sm text-[#927F87]">
                        {formatDate(suggestion.date_added)}
                    </div>

                    <div>
                        {getAction(suggestion)}
                    </div>
                </div>
            ))}
        </div>
    );
}