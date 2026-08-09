import { getRecommendations } from "@/services/recommendationService";
import { useEffect, useState } from "react";


export default function useRecommendations(){
    const[recommendation, setRecommendation]=useState([]);
    const[loading, setLoading]=useState(true);
    const[error, setError]=useState(null);
    
    useEffect(()=>{
        const fetchRecommendations=async()=>{
            try{
                setLoading(true);
                setError(null);
                const data=await getRecommendations();
                setRecommendation(data);
            }
            catch(error){
                console.error("Lỗi xem danh sách đề xuất: ", error);
                setError(error);
            }
            finally{
                setLoading(false);
            }
        }
        fetchRecommendations();
    },[]);

    console.log("Danh sách phim đề xuất:", recommendation);
    return {recommendation, loading, error};
}