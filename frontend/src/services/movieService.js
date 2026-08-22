import api, { endpoints } from "@/configs/api"

export const getGenres=async ()=>{
    const response=await api.get(endpoints.genres);
    return response.data;
}

export const getCountries=async()=>{
    const response=await api.get(endpoints.countries);
    return response.data;
}

export const getMovies=async(params={})=>{
    const response=await api.get(endpoints.movies,{params});
    return response.data;
}

export const getMovieDetail=async(id)=>{
    const response=await api.get(endpoints.movieDetail(id));
    return response.data;
}

export const translateDescription=async(id)=>{
    const response=await api.post(endpoints.translate_description(id));
    return response.data;
}