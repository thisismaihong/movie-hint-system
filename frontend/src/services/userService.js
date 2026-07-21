import api, { endpoints } from "@/configs/api";

export const getProfile=async()=>{
    const response=await api.get(endpoints.profile);
    return response.data;
}

export const updateProfile=async(payload)=>{
    const response =await api.patch(endpoints.profile, payload);
    return response.data; 
}

export const changePassword=async(payload)=>{
    const response=await api.patch(endpoints.changePassword, payload);
    return response.data;
}

