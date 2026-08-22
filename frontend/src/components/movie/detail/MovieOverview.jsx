"use client";

import { BookOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useState } from "react";
import LanguageSwitch from "./LanguageSwitch";
import useTranslateDescription from "@/hooks/movie/useTranslateDescription";

const { Title, Paragraph } = Typography;

export default function MovieOverview({ movie }) {
    const hasVietnamese = Boolean(movie?.description_vn);
    const hasEnglish = Boolean(movie?.description_en);
    const hasDescription = hasVietnamese || hasEnglish;

    const [isVietnamese, setIsVietnamese] = useState(hasVietnamese);

    const { content, loading, handleTranslate } = useTranslateDescription();

    const description = isVietnamese
        ? movie?.description_vn || content?.description_vn 
        : movie?.description_en;

    const handleLanguageChange = async (checked) => {
        if (checked) {
            const data = await handleTranslate(movie.id);
            if (data?.description_vn) {
                setIsVietnamese(true);
            }
            return;
        }
        setIsVietnamese(false);
    };

    return (
        <section className="rounded-3xl border border-white/10 bg-[#34304b] p-8 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BookOutlined className="!text-lg !text-purple-300" />

                    <Title level={4} className="!mb-0 !text-white">
                        Nội dung phim
                    </Title>
                </div>

                <LanguageSwitch
                    isVietnamese={isVietnamese}
                    loading={loading}
                    disabled={!hasDescription || loading}
                    onChange={handleLanguageChange}
                />
            </div>

            <div className="mb-6 h-px bg-white/10" />

            <Paragraph className="!mb-0 !text-[16px] !leading-8 !text-gray-300">
                {description || "Hiện chưa có nội dung cho bộ phim này."}
            </Paragraph>
        </section>
    );
}