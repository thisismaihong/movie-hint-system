import { addFavorite } from "@/services/favoriteService";
import { notification } from "antd";
import { useState } from "react";


export default function useAddFavorite(){
    const[loading, setLoading]=useState(false);
    
    const handleAdd=async(movieId)=>{
        setLoading(true);
        try{
            const res=await addFavorite({
                movie_id: movieId
            });
            console.log(res);
            notification.success({
                "title":"Thêm yêu thích",
                "description":"Đã thêm phim vào danh sách yêu thích"
            })
            window.location.reload()
        }
        catch(error){
            console.log(error);

            notification.error({
                title: "Lỗi thêm yêu thích!",
                description:
                    error.response?.data?.detail ??
                    JSON.stringify(error.response?.data),
            });
        }
        finally{
            setLoading(false);
        }
    }

    return{loading, handleAdd};
}