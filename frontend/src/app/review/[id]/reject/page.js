"use client";

import { useParams, useRouter } from "next/navigation";
import { Button, Form, Input } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import MainLayout from "@/components/layout/MainLayout";
import useRejectSuggestion from "@/hooks/suggestion/useRejectSuggestion";

const { TextArea } = Input;

export default function RejectSuggestionPage() {
    const { id } = useParams();
    const router = useRouter();

    const [form] = Form.useForm();

    const { loading, error, handleReject } = useRejectSuggestion(id);

    const handleSubmit = async (values) => {
        const result = await handleReject({
            admin_note: values.admin_note,
        });

        if (result) {
            router.push("/review");
        }
    };

    return (
        <MainLayout>
            <section className="relative mx-auto max-w-3xl pb-16">
                <div className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-[#E9A9C4]/10 blur-3xl" />
                <div className="pointer-events-none absolute -right-32 top-40 h-72 w-72 rounded-full bg-[#BFA7E8]/10 blur-3xl" />

                <div className="relative">
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
                                Review phim
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                            Từ chối phim đề xuất
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-[#A99DA6]">
                            Hãy cho người đề xuất biết lý do phim chưa được
                            thông qua.
                        </p>
                    </div>

                    <div className="relative overflow-hidden rounded-[26px] border border-[#DDB5C5]/20 bg-gradient-to-br from-[#241C30] via-[#1E1929] to-[#211C2B] p-[1px] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                        <div className="relative overflow-hidden rounded-[25px] bg-[#17131F]/95 p-7 md:p-9">
                            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#E9A9C4]/10 blur-3xl" />
                            <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#F3C66D]/5 blur-3xl" />

                            <div className="relative">
                                <div className="mb-7">
                                    <h2 className="text-xl font-bold text-white">
                                        Lý do từ chối
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-[#958995]">
                                        Nội dung này sẽ giúp quản trị viên
                                        giải thích rõ hơn về quyết định từ
                                        chối.
                                    </p>
                                </div>

                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={handleSubmit}
                                    requiredMark={false}
                                >
                                    <Form.Item
                                        label={
                                            <span className="!font-semibold !text-[#E8DDE2]">
                                                Nội dung lý do
                                            </span>
                                        }
                                        name="admin_note"
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message:
                                                    "Vui lòng nhập lý do từ chối.",
                                            },
                                            {
                                                max: 500,
                                                message:
                                                    "Lý do từ chối không được vượt quá 500 ký tự.",
                                            },
                                        ]}
                                    >
                                        <TextArea
                                            rows={7}
                                            maxLength={500}
                                            showCount
                                            placeholder="Nhập lý do từ chối phim..."
                                            className="!rounded-xl !border-[#4A3D4D] !bg-[#FFF9F7] !px-4 !py-3 !text-[#51434A] !shadow-none placeholder:!text-[#B49AA3] [&_.ant-input-data-count]:!text-white hover:!border-[#D99AAA] focus:!border-[#E9A9C4] focus:!shadow-[0_0_0_3px_rgba(233,169,196,0.12)]"
                                        />
                                    </Form.Item>

                                    {error && (
                                        <div className="mb-5 rounded-xl border border-[#E9A9C4]/20 bg-[#E9A9C4]/10 px-4 py-3 text-sm text-[#F0AFC1]">
                                            Không thể từ chối phim. Vui lòng thử
                                            lại.
                                        </div>
                                    )}

                                    <div className="mt-8 flex justify-end gap-3 border-t border-[#3A3040] pt-6">
                                        <Button
                                            onClick={() => router.back()}
                                            className="!h-11 !rounded-xl !border-[#4A3D4D] !bg-transparent !px-5 !font-medium !text-[#C4B8BF] hover:!border-[#D99AAA] hover:!text-white"
                                        >
                                            Hủy
                                        </Button>

                                        <Button
                                            htmlType="submit"
                                            danger
                                            loading={loading}
                                            className="!h-11 !rounded-xl !border-none !bg-gradient-to-r !from-[#E58FA8] !to-[#D97892] !px-6 !font-semibold !text-white !shadow-[0_8px_24px_rgba(229,143,168,0.2)] hover:!brightness-110"
                                        >
                                            Từ chối phim
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}