import api, { endpoints } from "@/configs/api"

export const getRecommendations=async()=>{
    console.log("recommendations:", endpoints.recommendations);
    const response=await api.get(endpoints.recommendations);
    return response.data;
};


