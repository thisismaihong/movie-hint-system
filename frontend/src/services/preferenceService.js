import api, { endpoints } from "@/configs/api"

export const getPreferences=async ()=>{
    const response=await api.get(endpoints.preferences);
    return response.data;
}


export const updatePreferences = async (payload) => {
    const response = await api.put(endpoints.preferences, payload);
    return response.data;
};

