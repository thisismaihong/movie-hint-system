import { deleteFeedback } from "@/services/feedbackService";
import { notification } from "antd";
import { useState } from "react";


export default function useDeleteFeedback(){
    const[loading, setLoading]=useState(false);
    const[error, setError]=useState(null);

    const handleDelete=async(feedbackId, onSuccess)=>{
        try{
            setLoading(true);
            setError(null);
            const data=await deleteFeedback(feedbackId);

            notification.success({
                title:"Xóa đánh giá.",
                description:"Đã xóa đánh giá thành công."
            })

            if (onSuccess) {
                onSuccess();
            }
            
            return data;
        }
        catch(error){
            console.error(error);
            setError(error);

            notification.error({
                title: "Lỗi xóa đánh giá!",
                description:
                    error.response?.data?.detail ??
                    "Không thể xóa đánh giá của bạn.",
            });

            throw error;
        }
        finally{
            setLoading(false);
        }
    };
    return{loading, error, handleDelete};
}