import { translateDescription } from "@/services/movieService";
import { useState } from "react";
import { notification } from "antd";

export default function useTranslateDescription(){
    const[loading, setLoading]=useState(false);
    const [content, setContent]=useState("");

    const handleTranslate = async (id) => {
        if (!id) return;

        setLoading(true);

        try {
            const data = await translateDescription(id);
            setContent(data);

            return data;
        } catch (error) {
            console.error(error);

            notification.error({
                title: "Lỗi dịch nội dung phim!",
                description:
                    error.response?.data?.detail ??
                    JSON.stringify(error.response?.data),
            });
        } finally {
            setLoading(false);
        }
    };

    return{content, loading, handleTranslate};

}