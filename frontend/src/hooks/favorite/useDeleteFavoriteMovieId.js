import { useState } from "react";
import { notification } from "antd";
import { deleteFavoriteByMovieId } from "@/services/favoriteService";


export default function useDeleteFavoriteMovieId(){
    const [loading, setLoading]=useState(false);

    const handleDelete=async(movieId)=>{
        if(!movieId){
            return false;
        }
        setLoading(true);
        try{
            const res= await deleteFavoriteByMovieId(movieId);
            console.log(res);

            notification.success({
                title: "Đã xóa khỏi danh sách yêu thích",
            });

            return true;
        }
        catch(error){
            console.error(error);

            notification.error({
                title: "Lỗi xóa phim yêu thích!",
                description:
                    error.response?.data?.detail ??
                    "Không thể xóa phim khỏi danh sách yêu thích.",
            });
            return false;
        }
        finally{
            setLoading(false);
        }
    }

    return{loading, handleDelete};
}