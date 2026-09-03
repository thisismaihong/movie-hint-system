import { deleteFavorite } from "@/services/favoriteService";
import { notification } from "antd";
import { useState } from "react";


export default function useDeleteFavorite(){
    const[loading, setLoading]=useState(false);
    const [deletingId, setDeletingId] = useState(null);
    
    const handleDelete=async(favoriteId)=>{
        try{ 
            setLoading(true);
            setDeletingId(favoriteId);
            const res=await deleteFavorite(favoriteId);
            console.log(res);
            notification.success({
                message: "Đã hủy yêu thích"
            });
            window.location.reload();
        }
        catch(error){
            console.log(error);

            notification.error({
                message: "Lỗi hủy yêu thích!",
                description:
                    error.response?.data?.detail ??
                    JSON.stringify(error.response?.data),
            });
        }
        finally{
            setLoading(false);
        }

    }

    return{loading,deletingId, handleDelete};
}