import api, { endpoints } from "@/configs/api"

export const getFavorite=async(params={})=>{
    const response=await api.get(endpoints.favorite, {params});
    return response.data;
}

export const addFavorite=async(payload)=>{ //movie_id
    const response= await api.post(endpoints.favorite, payload);
    return response.data;
}

export const deleteFavorite=async(id)=>{
    const response=await api.delete(endpoints.deleteFavorite(id));
    return response.data;
}

export const deleteFavoriteByMovieId=async(movieId)=>{
    const response=await api.delete(endpoints.deleteFavoriteByMovieId, {params:{movie_id:movieId}});
    return response.data;
}
