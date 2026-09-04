import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const endpoints = {
    "register": "/oauth/register/",
    "login": "/oauth/login/",
    "profile": "/oauth/profile/",
    "changePassword": "/oauth/profile/change-password/",
    "checkAvailability": "/oauth/check-availability/",

    "genres": "/movies/genres/",
    "countries": "/movies/countries/",
    "movies":"/movies/",
    "movieDetail": (id)=>`/movies/${id}/`,
    "translate_description":(id)=>`/movies/${id}/translate/`,
    "summarize_description":(id)=>`/movies/${id}/summary/`,

    "preferences": "/user/preferences/",
    "favorite":"/favorites/",
    "deleteFavorite":(id)=>`/favorites/${id}/`,
    "deleteFavoriteByMovieId":"/favorites/movie/",
    "recommendations":"/recommendation/movies/",

    "search":"/search/",

    "feedbacks":"/feedbacks/",
    "deleteFeedback":(id)=>`/feedbacks/${id}/`
    
};

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 0,
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const access_token = localStorage.getItem("access_token");
            if (access_token) {
                config.headers.Authorization = `Bearer ${access_token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);


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
                const refresh = localStorage.getItem("refresh_token");

                if (!refresh) {
                    throw error;
                }

                const response = await axios.post(
                    `${BASE_URL}/oauth/refresh/`,
                    {
                        refresh,
                    }
                );
                const newAccess = response.data.access_token;
                localStorage.setItem("access", newAccess);
                originalRequest.headers.Authorization =
                    `Bearer ${newAccess}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {

                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");

                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);



export default axiosInstance;