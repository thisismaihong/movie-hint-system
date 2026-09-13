"use client";

import { useEffect, useState } from "react";
import { getSuggestions } from "@/services/suggestionService";

export default function useSuggestions() {
    const [suggestions, setSuggestions] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSuggestions = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getSuggestions();

            console.log("Dữ liệu phim cần duyệt: ", data);

            setSuggestions(data.results || []);
            setTotal(data.count || 0);
        } catch (error) {
            setError(error);
            console.log("Lỗi dữ liệu phim cần duyệt: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSuggestions();
    }, []);

    return {
        suggestions,
        total,
        loading,
        error,
        fetchSuggestions,
    };
}