import api, { endpoints } from "@/configs/api"


export const searchMovies=async(payload)=>{
    const response=await api.post(endpoints.search, payload);
    return response.data;
}

