"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import MainLayout from "@/components/layout/MainLayout";
import MySuggestionDetail from "@/components/suggestion/MySuggestionDetail";

export default function MySuggestionDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    return (
        <MainLayout>
            <section className="mx-auto max-w-5xl pb-16">
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.back()}
                    className="!mb-7 !flex !h-9 !items-center !px-0 !text-sm !font-medium !text-[#B8AAB2] hover:!text-white"
                >
                    Quay lại
                </Button>

                <div className="mb-8">
                    <div className="mb-3 flex items-center gap-3">
                        <span className="h-px w-8 bg-gradient-to-r from-[#E9A9C4] to-[#F3C66D]" />

                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D99AAA]">
                            Lịch sử bổ sung phim
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Chi tiết phim đề xuất
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-[#A99DA6]">
                        Xem thông tin và trạng thái xử lý phim bạn đã đề xuất.
                    </p>
                </div>

                <MySuggestionDetail id={id} />
            </section>
        </MainLayout>
    );
}