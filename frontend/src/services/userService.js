import api, { endpoints } from "@/configs/api";

export const getProfile=async()=>{
    const response=await api.get(endpoints.profile);
    return response.data;
}

export const updateProfile=async(payload)=>{
    const formData=new FormData();
    if(payload.first_name!==undefined){
        formData.append("first_name", payload.first_name);
    }
    if(payload.last_name!==undefined){
        formData.append("last_name", payload.last_name);
    }
    if (payload.avatar) {
        formData.append("avatar", payload.avatar);
    }

    const response = await api.patch(
        endpoints.profile,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return response.data; 
}

export const changePassword=async(payload)=>{
    const response=await api.patch(endpoints.changePassword, payload);
    return response.data;
}

