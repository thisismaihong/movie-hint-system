"use client";

import { useState } from "react";
import { Button, Input, message } from "antd";
import useCreateFeedback from "@/hooks/movie/useCreateFeedback";

const { TextArea } = Input;

export default function CreateFeedback({ movieId, username, onSuccess }) {
    const [content, setContent] = useState("");
    const { loading, handleCreate } = useCreateFeedback();

    const wordCount = content.length;

    const handleSubmit = async () => {
        if (!content.trim()) {
            message.warning("Vui lòng nhập đánh giá.");
            return;
        }

        if (wordCount > 100) {
            message.warning("Đánh giá không được vượt quá 100 chữ.");
            return;
        }

        try {
            const data = await handleCreate({
                movie_id: movieId,
                content: content.trim()
            });

            setContent("");

            if (onSuccess) {
                onSuccess(data);
            }
        } catch (error) {
            
        }
    };

    return (
        <div className="rounded-xl border border-white/5 bg-[#36314F] p-4">
            <p className="mb-2 text-sm font-semibold text-white">
                {username}
            </p>

            <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                    <TextArea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Hãy chia sẻ cảm nhận của bạn về bộ phim..."
                        maxLength={100}
                        autoSize={{ minRows: 2, maxRows: 4 }}
                        className="!rounded-lg !border-[#4A4563] !bg-[#211d38] !text-sm !text-white placeholder:!text-gray-500"
                    />

                    <div className="mt-1 text-right text-[10px] text-gray-400">
                        {wordCount}/100 chữ.
                    </div>
                </div>

                <Button
                    type="primary"
                    loading={loading}
                    disabled={!content.trim() || wordCount > 100}
                    onClick={handleSubmit}
                    className="!h-10 !shrink-0 !rounded-lg !border-0 !bg-gradient-to-r !from-[#7C3AED] !to-[#A855F7] !px-5 !font-semibold !text-white !shadow-lg !shadow-purple-500/20 hover:!from-[#8B5CF6] hover:!to-[#C084FC]"
                >
                    Đánh giá
                </Button>
            </div>
        </div>
    );
}