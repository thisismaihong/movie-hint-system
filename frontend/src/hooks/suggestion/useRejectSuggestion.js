"use client";

import { rejectSuggestion } from "@/services/suggestionService";
import { notification } from "antd";
import { useState } from "react";


export default function useRejectSuggestion(id) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleReject = async (payload) => {
        try {
            setLoading(true);
            setError(null);

            const data = await rejectSuggestion(id, payload);

            notification.success({
                "title":"Phim yêu cầu bổ sung.",
                "description":"Đã từ chối bổ sung phim."
            })

            return data;
        } catch (error) {
            setError(error);
            console.log("Lỗi từ chối phim đề xuất: ", error);

            notification.error({
                "title":"Phim yêu cầu bổ sung.",
                "description":"Từ chối thất bại!"
            })

            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        handleReject,
    };
}