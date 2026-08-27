import api, { endpoints } from "@/configs/api"

export const getRecommendations=async(params={})=>{
    const response=await api.get(endpoints.recommendations, {params});
    return response.data;
};




