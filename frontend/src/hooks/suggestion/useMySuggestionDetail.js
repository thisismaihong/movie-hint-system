"use client";

import { getMySuggestionDetail } from "@/services/suggestionService";
import { useEffect, useState } from "react";


export default function useMySuggestionDetail(id) {
    const [suggestion, setSuggestion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDetails = async () => {
        if (!id) return;

        try {
            setLoading(true);
            setError(null);

            const data = await getMySuggestionDetail(id);
            
            setSuggestion(data);
        } catch (error) {
            setError(error);
            console.log(
                "Lỗi dữ liệu chi tiết phim đã đề xuất: ",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);

    return {
        suggestion,
        loading,
        error,
        fetchDetails,
    };
}