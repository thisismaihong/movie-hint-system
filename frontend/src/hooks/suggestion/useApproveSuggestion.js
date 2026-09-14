"use client";

import { approveSuggestion } from "@/services/suggestionService";
import { useState } from "react";

export default function useApproveSuggestion(id) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = async (payload) => {
        try {
            setLoading(true);
            setError(null);

            const data = await approveSuggestion(id, payload);

            return data;
        } catch (error) {
            setError(error);
            console.log("Lỗi duyệt phim đề xuất: ", error);

            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        handleApprove,
    };
}