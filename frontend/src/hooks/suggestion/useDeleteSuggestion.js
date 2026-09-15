"use client";

import { deleteSuggestion } from "@/services/suggestionService";
import { notification } from "antd";
import { useState } from "react";


export default function useDeleteSuggestion(id) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await deleteSuggestion(id);

            notification.success({
                "title":"Xóa phim bổ sung",
                "description":"Đã xóa phim bổ sung thành công!"
            })

            return data;
        } catch (error) {
            setError(error);
            console.log("Lỗi xóa phim đề xuất: ", error);

            notification.error({
                "title":"Xóa phim bổ sung",
                "description":"Xóa phim bổ sung thất bại!"
            })

            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        handleDelete,
    };
}