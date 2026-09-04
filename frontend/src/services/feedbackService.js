import api, { endpoints } from "@/configs/api"

// "feedbacks":"/feedbacks/",
// "delete_feedback":(id)=>`/feedbacks/${id}/`

export const getFeedbacks=async(movieId)=>{
    const response=await api.get(endpoints.feedbacks, {params:{movie_id:movieId}});
    return response.data;
};

export const createFeedback=async(payload)=>{
    const response=await api.post(endpoints.feedbacks, payload);
    return response.data;
};

export const deleteFeedback=async(id)=>{
    const response=await api.delete(endpoints.deleteFeedback(id));
    return response.data;
}