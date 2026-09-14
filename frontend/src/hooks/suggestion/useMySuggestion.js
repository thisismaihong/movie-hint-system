"use client";

import { getMySuggestion } from "@/services/suggestionService";
import { useEffect, useState } from "react";

export default function useMySuggestion() {
    const [suggestions, setSuggestions] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMySuggestions = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getMySuggestion();

            setSuggestions(data.results || []);
            setTotal(data.count || 0);
        } catch (error) {
            setError(error);
            console.log("Lỗi dữ liệu phim đã đề xuất: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMySuggestions();
    }, []);

    return {
        suggestions,
        total,
        loading,
        error,
        fetchMySuggestions,
    };
}