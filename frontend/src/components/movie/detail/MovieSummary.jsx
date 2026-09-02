"use client";

import { useAuth } from "@/hooks/useAuth";
import { RobotOutlined } from "@ant-design/icons";
import { Button, Tooltip, Typography } from "antd";
import { useRouter } from "next/navigation";
import useSummarizeDescription from "@/hooks/movie/useSummarizeDescription";

const { Title, Paragraph } = Typography;

export default function MovieSummary({ movie }) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const { content, loading, handleSummarize } = useSummarizeDescription();

    const handleClick = () => {
        if (!isAuthenticated) {
            router.push("/login");
            return;
        }

        handleSummarize(movie?.id);
    };

    return (
        <section className="rounded-3xl border border-purple-400/20 bg-gradient-to-br from-[#3b3656] via-[#34304b] to-[#2d2943] p-8 shadow-xl">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/20">
                        <RobotOutlined className="text-xl !text-purple-300" />
                    </div>

                    <Title level={4} className="!mb-0 !text-white">
                        Tóm tắt nội dung phim
                    </Title>
                </div>

                <Tooltip
                    title={
                        !isAuthenticated
                            ? "Vui lòng đăng nhập để tạo tóm tắt"
                            : "Tạo tóm tắt bằng AI"
                    }
                >
                    <Button
                        type="primary"
                        size="large"
                        icon={<RobotOutlined />}
                        loading={loading}
                        onClick={handleClick}
                        disabled={!movie?.id}
                        className="!rounded-xl !border-0 !font-medium"
                        style={{
                            background: "linear-gradient(90deg,#8B5CF6,#A855F7)",
                        }}
                    >
                        {loading ? "Đang tóm tắt..." : "Tạo tóm tắt"}
                    </Button>
                </Tooltip>
            </div>

            <div className="my-6 h-px bg-white/10" />

            {content ? (
                <Paragraph className="!mb-0 !leading-8 !text-gray-300">
                    {content.description_summary}
                </Paragraph>
            ) : (
                <Paragraph className="!mb-0 !leading-8 !text-gray-400">
                    Chưa có tóm tắt. Nhấn{" "}
                    <span className="font-medium text-purple-300">
                        "Tạo tóm tắt"
                    </span>{" "}
                    để MH tóm tắt nội dung phim.
                </Paragraph>
            )}
        </section>
    );
}