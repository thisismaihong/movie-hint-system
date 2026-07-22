import api, { endpoints } from "@/configs/api";

export const register = async(payload)=>{
    const response= await api.post(endpoints.register, payload);
    return response.data;
}


export const login= async(payload)=>{
    console.log("BASE URL:", process.env.NEXT_PUBLIC_API_URL);
    console.log("LOGIN ENDPOINT:", endpoints.login);
    
    const response=await api.post(endpoints.login, payload);
    return response.data;
}