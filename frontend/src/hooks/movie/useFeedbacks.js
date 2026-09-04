import { getFeedbacks } from "@/services/feedbackService";
import { notification } from "antd";
import { useEffect, useState } from "react";


export default function useFeedbacks(movieId){
    const[feedbacks, setFeedbacks]=useState([]);
    const[loading, setLoading]=useState(false);
    const[error, setError]=useState(null);

    const fetchFeedbacks=async()=>{
        if(!movieId) return;
        try{
            setLoading(true);
            setError(null);
            const data=await getFeedbacks(movieId);
            console.log("Dữ liệu feedbacks:", data);
            setFeedbacks(data);
        }
        catch(error){
            console.log("Lỗi nạp danh sách đánh giá: ",error);
            setError(error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchFeedbacks();
    },[movieId]);

    return {feedbacks, setFeedbacks, loading, error, fetchFeedbacks};
}