import { createFeedback } from "@/services/feedbackService";
import { notification } from "antd";
import { useState } from "react";

export default function useCreateFeedback() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreate = async (payload) => {
        try {
            setLoading(true);
            setError(null);

            const data = await createFeedback(payload);
            console.log("Dữ liệu feedback vừa tạo: ", data);

            notification.success({
                title: "Đánh giá",
                description: "Cảm ơn bạn đã gửi đánh giá.",
            });

            return data;
        } catch (error) {
            console.error(error);
            setError(error);

            notification.error({
                title: "Lỗi đánh giá!",
                description:
                    error.response?.data?.detail ??
                    "Không thể gửi đánh giá của bạn.",
            });

            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, handleCreate };
}