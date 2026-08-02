"use client";

import { BulbOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

export default function MovieSummary() {
    return (
        <section className="rounded-3xl border border-purple-400/20 bg-gradient-to-br from-[#3b3656] via-[#34304b] to-[#2d2943] p-8 shadow-xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div>
                        <Title level={4} className="!mb-0 !text-white" >
                            Tóm tắt nội dung phim
                        </Title>
                    </div>
                </div>

                <Button
                    type="primary"
                    size="large"
                    icon={<BulbOutlined />}
                    className="!rounded-xl !border-0 !font-medium"
                    style={{
                        background:
                            "linear-gradient(90deg,#8B5CF6,#A855F7)",
                    }}
                >
                    Tạo tóm tắt
                </Button>

            </div>

            <div className="my-6 h-px bg-white/10" />

            <Paragraph className="!mb-0 !leading-8 !text-gray-300">
                Sau này AI sẽ tạo một bản tóm tắt ở đây
            </Paragraph>

        </section>
    );
}