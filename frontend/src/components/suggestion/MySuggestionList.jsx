"use client";

import { useRouter } from "next/navigation";
import useMySuggestion from "@/hooks/suggestion/useMySuggestion";
import { Empty, Spin, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const statusConfig = {
    PENDING: {
        label: "Chờ duyệt",
        className: "!border-[#F3C66D]/40 !bg-[#F3C66D]/10 !text-[#E5B34B]",
    },
    APPROVED: {
        label: "Đã duyệt",
        className: "!border-[#8BC9A8]/40 !bg-[#8BC9A8]/10 !text-[#76C092]",
    },
    REJECTED: {
        label: "Từ chối",
        className: "!border-[#E9A9C4]/40 !bg-[#E9A9C4]/10 !text-[#D98BA5]",
    },
};

const formatDate = (date) => {
    if (!date) return "—";

    const [datePart] = date.split("T");
    const [year, month, day] = datePart.split("-");

    return `${day}/${month}/${year}`;
};

export default function MySuggestionList({ activeStatus = "PENDING" }) {
    const router = useRouter();

    const { suggestions, loading, error } = useMySuggestion();

    const filteredSuggestions = suggestions.filter(
        (suggestion) => suggestion.status === activeStatus
    );

    if (loading) {
        return (
            <div className="flex justify-center py-16">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-2xl border border-red-400/20 bg-red-500/5 px-5 py-8 text-center text-sm text-red-400">
                Không thể tải danh sách phim đề xuất. Vui lòng thử lại.
            </div>
        );
    }

    if (filteredSuggestions.length === 0) {
        return (
            <div className="rounded-2xl border border-[#F3DDE4] bg-[#FFFDFC] px-5 py-12">
                <Empty
                    description={
                        <span className="text-[#9B8992]">
                            Chưa có phim đề xuất ở trạng thái này.
                        </span>
                    }
                />
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-[#F3DDE4] bg-[#FFFDFC] shadow-[0_8px_30px_rgba(91,55,70,0.06)]">
            <div className="grid grid-cols-[1.5fr_1.2fr_140px_120px_50px] border-b border-[#F3DDE4] bg-[#FFF8FA] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#806C75]">
                <span>Tên phim</span>
                <span>Quốc gia</span>
                <span>Ngày thêm</span>
                <span>Trạng thái</span>
                <span />
            </div>

            {filteredSuggestions.map((suggestion) => {
                const status = statusConfig[suggestion.status];

                return (
                    <div
                        key={suggestion.id}
                        className="grid grid-cols-[1.5fr_1.2fr_140px_120px_50px] items-center border-b border-[#F3DDE4] px-6 py-5 last:border-b-0 hover:bg-[#FFF8FA]/70"
                    >
                        <span className="pr-5 text-sm font-semibold text-[#4B3C44]">
                            {suggestion.title_vn}
                        </span>

                        <div className="flex flex-wrap gap-1.5 pr-5">
                            {suggestion.country?.map((country) => (
                                <Tag
                                    key={country}
                                    className="!mr-0 !rounded-full !border-[#E9DDE2] !bg-[#FAF4F6] !px-2.5 !py-0.5 !text-xs !text-[#75656D]"
                                >
                                    {country}
                                </Tag>
                            ))}
                        </div>

                        <span className="text-sm text-[#75656D]">
                            {formatDate(suggestion.date_added)}
                        </span>

                        <Tag
                            className={`!mr-0 !w-fit !rounded-full !px-3 !py-1 !text-xs !font-medium ${status.className}`}
                        >
                            {status.label}
                        </Tag>

                        <div>
                            {(suggestion.status === "APPROVED" ||
                                suggestion.status === "REJECTED") && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        router.push(
                                            `/my-suggestions/${suggestion.id}`
                                        )
                                    }
                                    className="flex h-8 w-8 items-center justify-center rounded-full text-[#A88C99] transition-all hover:bg-[#FBE9EF] hover:text-[#C7798F]"
                                    title="Xem chi tiết"
                                >
                                    <EyeOutlined className="!text-base" />
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}