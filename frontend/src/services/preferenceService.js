import api, { endpoints } from "@/configs/api"

export const getPreference=async ()=>{
    const response=await api.get(endpoints.preferences);
    return response.data;
}


export const updatePreferences = async (payload) => {
    const response = await api.put(endpoints.preferences, payload);
    return response.data;
};

export const getGenres = async () => {
    const response = await api.get(endpoints.genres);
    return response.data;
};

export const getCountries = async () => {
    const response = await api.get(endpoints.countries);
    return response.data;
};