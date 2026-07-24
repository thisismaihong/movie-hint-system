import api, { endpoints } from "@/configs/api"

export const getGenres=async ()=>{
    const response=await api.get(endpoints.genres);
    return response.data;
}

export const getCountries=async()=>{
    const response=await api.get(endpoints.countries);
    return response.data;
}