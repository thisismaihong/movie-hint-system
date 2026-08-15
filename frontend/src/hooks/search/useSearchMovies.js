import { searchMovies } from "@/services/searchService";
import { useEffect, useState } from "react";
import { notification } from "antd";


export default function useSearchMovies(){
    const[movies, setMovies]=useState([]);
    const[description, setDescription]= useState("");
    const[loading, setLoading]=useState(false);
    const[error, setError]=useState(null);
    const [searched, setSearched] = useState(false);
    
    useEffect(()=>{
        const savedMovies=sessionStorage.getItem("search_movies");
        const savedDescription=sessionStorage.getItem("search_description");

        if(savedMovies){
            setMovies(JSON.parse(savedMovies));
            setSearched(true);
        }
        if(savedDescription){
            setDescription(savedDescription);
        }
    },[])

    const handleSearch = async (description) => {
        const query=description.trim();
        if (!query) return;

        try {
            setLoading(true);
            setError(null);
            setSearched(true);

            const data = await searchMovies({
                description: query
            });

            console.log("Description of user:", description);
            console.log("The results of searching:", data);

            setMovies(data);
            setDescription(query);
            sessionStorage.setItem("search_movies", JSON.stringify(data));
            sessionStorage.setItem("search_description", query);

        } catch (error) {
            console.error("Lỗi tìm kiếm phim bằng mô tả nội dung:", error);
            setError(error);
            setMovies([]);
            notification.error({
                title: "Lỗi tìm kiếm phim!",
                description:
                    error.response?.data?.detail ??
                    JSON.stringify(error.response?.data),
            });
        } finally {
            setLoading(false);
        }
    };

    console.log("The results of searching: ", movies);

    return {movies, description,setDescription, searched, handleSearch, loading, error};
}