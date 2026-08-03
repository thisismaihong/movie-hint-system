import { useState } from "react";
import { changePassword } from "@/services/userService";
import { notification } from "antd";


export default function useChangePassword(){
    const[loading, setLoading]=useState(false);

    const handleChange=async(values)=>{
        try{
            setLoading(true);
            const res=await changePassword(values);
            console.log(res);
            notification.success({
                message:"Thay đổi mật khẩu thành công."
            });
            window.location.reload()
        }
        catch(error){
            const data = error.response?.data;

            const message =
                data?.non_field_errors?.[0] ||
                data?.detail ||
                Object.values(data || {})?.[0]?.[0] ||
                "Không thể thay đổi mật khẩu.";

            notification.error({
                message: "Đổi mật khẩu thất bại",
                description: message,
            });
        }
        finally{
            setLoading(false);
        }
    }

    return{loading, handleChange};
}