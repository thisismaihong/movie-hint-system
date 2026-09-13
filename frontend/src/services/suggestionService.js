import api, { endpoints } from "@/configs/api"


export const createSuggestion=async(payload)=>{
    const response=await api.post(endpoints.createSuggestion, payload);
    return response.data;
}

export const getSuggestions=async()=>{
    const response=await api.get(endpoints.listSuggestions);
    return response.data;
}
 
export const getDetailSuggestion=async(id)=>{
    const response=await api.get(endpoints.detailSuggestion(id));
    return response.data;
}

export const approveSuggestion=async(id, payload)=>{
    const response=await api.post(endpoints.approveSuggestion(id), payload);
    return response.data;
}
