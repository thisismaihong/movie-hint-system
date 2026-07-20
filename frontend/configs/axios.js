import axios from "axios"
import endpoints from "./endpoints";

const axiosInstance=axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type":"application/json"
    }
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const access_token=localStorage.getItem("access_token")
        if(access_token){
            config.headers.Authorization=`Bearer ${access_token}`;
        }
        return config;
    },
    (error)=> Promise.reject(error)
)


axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refresh_token");
                if (!refreshToken) {
                    throw error;
                }
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}${endpoints.refresh}`,
                    {
                        refresh: refreshToken,
                    }
                );
                const newAccessToken = response.data.access;
                localStorage.setItem(
                    "access_token",
                    newAccessToken
                );
                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                // window.location.href="/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;