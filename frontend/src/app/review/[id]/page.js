"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import MainLayout from "@/components/layout/MainLayout";
import SuggestionDetail from "@/components/review/SuggestionDetail";
import ApproveMovieForm from "@/components/review/ApproveMovieForm";

export default function ReviewDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    const handleApproveSuccess = () => {
        router.push(`/movies/${id}`);
    };

    return (
        <MainLayout>
            <section className="relative mx-auto max-w-5xl pb-16">
                <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#E9A9C4]/10 blur-3xl" />
                <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-[#BFA7E8]/10 blur-3xl" />

                <div className="relative">
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => router.back()}
                        className="!mb-7 !flex !h-9 !items-center !px-0 !text-sm !font-medium !text-[#B8AAB2] hover:!text-white"
                    >
                        Quay lại danh sách
                    </Button>

                    <div className="mb-9">
                        <div className="mb-3 flex items-center gap-3">
                            <span className="h-px w-8 bg-gradient-to-r from-[#E9A9C4] to-[#F3C66D]" />
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D99AAA]">
                                Review phim
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                            Chi tiết phim đề xuất
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#A99DA6]">
                            Kiểm tra thông tin phim và thực hiện phê duyệt đề
                            xuất.
                        </p>
                    </div>

                    <div className="mb-7 flex items-center gap-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#5C4B5A] to-transparent" />
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#897783]">
                            Thông tin đề xuất
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#5C4B5A] to-transparent" />
                    </div>

                    <SuggestionDetail id={id} />

                    <div className="my-9 flex items-center gap-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#5C4B5A] to-transparent" />
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#897783]">
                            Xử lý đề xuất
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#5C4B5A] to-transparent" />
                    </div>

                    <div className="relative overflow-hidden rounded-[24px] border border-[#DDB5C5]/20 bg-gradient-to-br from-[#211A2C] via-[#1D1928] to-[#201C2A] p-[1px] shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                        <div className="relative overflow-hidden rounded-[23px] bg-[#17131F]/95 p-7 md:p-8">
                            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#E9A9C4]/10 blur-3xl" />
                            <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-[#F3C66D]/5 blur-3xl" />

                            <div className="relative">
                                <div className="mb-6">
                                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#D99AAA]">
                                        Quyết định
                                    </p>
                                    <h2 className="text-xl font-bold text-white">
                                        Duyệt đề xuất phim
                                    </h2>
                                    <p className="mt-2 text-sm text-[#978B96]">
                                        Xác nhận thông tin trước khi thêm phim
                                        vào hệ thống.
                                    </p>
                                </div>

                                <div className="mb-6 flex justify-end">
                                    <Button
                                        danger
                                        onClick={() => router.push(`/review/${id}/reject`)}
                                        className="!h-11 !rounded-xl !border-red-400 !px-6 !font-semibold !text-red-400 hover:!border-red-500 hover:!text-red-500"
                                    >
                                        Từ chối bổ sung
                                    </Button>
                                </div>

                                <ApproveMovieForm
                                    id={id}
                                    onSuccess={handleApproveSuccess}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}