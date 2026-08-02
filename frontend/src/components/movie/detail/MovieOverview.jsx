"use client";

import { BookOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function MovieOverview({ movie }) {
    return (
        <section className="rounded-3xl border border-white/10 bg-[#34304b] p-8 shadow-lg">
            <div className="mb-3 flex items-center">
                <div>
                    <Title level={4} className="!mb-0 !text-white">
                        Nội dung phim
                    </Title>
                </div>
            </div>

            <div className="mb-6 h-px bg-white/10" />

            <Paragraph className="!mb-0 !text-[16px] !leading-8 !text-gray-300">
                {movie?.description_vn || movie?.description_en || "Hiện chưa có nội dung cho bộ phim này."}
            </Paragraph>
        </section>
    );
}