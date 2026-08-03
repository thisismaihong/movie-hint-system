import { useState } from "react";
import { updateProfile } from "@/services/userService";
import { notification } from "antd";
import { useAuth } from "../useAuth";


export default function useUpdateProfile(){
    const{fetchUser}=useAuth();
    const[loading, setLoading]=useState(false);

    const handleUpdate=async(values)=>{
        try{
            setLoading(true);
            const res=await updateProfile(values);
            console.log(res);
            await fetchUser();
            notification.success({
                message:"Cập nhật thành công."
            });
            window.location.reload()
        }
        catch(error){
            console.log(error);
            notification.error({
                message:"Không thể cập nhật.",
                description: JSON.stringify(error.response?.data),
            })
        }
        finally{
            setLoading(false);
        }
    }

    return{loading, handleUpdate};
}