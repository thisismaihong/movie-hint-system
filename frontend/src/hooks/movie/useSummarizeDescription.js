import { summarizeDescription } from "@/services/movieService";
import { useState } from "react";
import { notification } from "antd";

export default function useSummarizeDescription(){
    const[loading, setLoading]=useState(false);
    const [content, setContent]=useState("");

    const handleSummarize = async (id) => {
        if (!id) return;

        setLoading(true);

        try {
            const data = await summarizeDescription(id);
            setContent(data);

            return data;
        } catch (error) {
            console.error(error);

            notification.error({
                title: "Lỗi tóm tắt nội dung phim!",
                description:
                    error.response?.data?.detail ??
                    JSON.stringify(error.response?.data),
            });
        } finally {
            setLoading(false);
        }
    };

    return{content, loading, handleSummarize};

}