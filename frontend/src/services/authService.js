import api, { endpoints } from "@/configs/api";

export const register = async(payload)=>{
    const response= await api.post(endpoints.register, payload);
    return response.data;
}


export const login= async(payload)=>{
    const response=await api.post(endpoints.login, payload);
    return response.data;
}