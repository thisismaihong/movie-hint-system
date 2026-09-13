import { getCountries } from "@/services/movieService";
import { createSuggestion } from "@/services/suggestionService";
import { notification } from "antd";
import { useEffect, useState } from "react";




export default function useCreateSuggestion(){
    const[countries, setCountries]=useState([]);
    const[loadingCountries, setLoadingCountries]=useState(false);
    const[loading, setLoading]=useState(false);
    const[error, setError]=useState(null);

    const MAX_TITLE_LENGTH = 200;
    const MAX_DESCRIPTION_LENGTH = 1000;

    const fetchCountries=async()=>{
        try{
            setLoadingCountries(true);
            const data=await getCountries();
            setCountries(data);
        }
        catch(error){
            setError(error);
            console.log("Lỗi dữ liệu country: ", error);
        }
        finally{
            setLoadingCountries(false);
        }
    };

    useEffect(()=>{
        fetchCountries();
    },[]);

    const handleSubmit=async(payload)=>{
        try{
            setLoading(true);
            setError(null);
            const res=await createSuggestion(payload);
            console.log("Dữ liệu phim bổ sung: ", res);
            notification.success({
                "title":"Đề nghị bổ sung phim.",
                "description":"Đề nghị của bạn đang chờ phê duyệt."
            });
            return true;
        }
        catch(error){
            console.log("Lỗi dữ liệu phim bổ sung: ", error);
            notification.error({
                "title":"Đề nghị bổ sung phim.",
                "description":"Lỗi đề xuất!"
            })
            return false;
        }
        finally{
            setLoading(false);
        }

    }
    return{countries, loadingCountries, loading, error, handleSubmit, MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH}
}