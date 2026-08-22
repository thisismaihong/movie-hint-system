import { getCountries, getGenres, getMovies } from "@/services/movieService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const emptyFilters = {
    q: "",
    genre: "",
    country: "",
    release_year: "",
};

export default function useMovies(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const[movies, setMovies]=useState([]);
    const [genres, setGenres] = useState([]);
    const [countries, setCountries] = useState([]);
    const[loading, setLoading]=useState(true);
    const[pagination, setPagination]=useState({
        current:1,
        total:0,
        pageSize:20
    });
    const[filters, setFilters]=useState(emptyFilters);

    const fetchMovies = async(page=pagination.current, customFilters=filters)=>{
        setLoading(true);
        try{
            const data=await getMovies({page, ...customFilters});
            setMovies(data.results);
            setPagination({
                current:page,
                total: data.count,
                pageSize: 20
            });
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        const urlFilters={
            q: searchParams.get("q") || "",
            genre: searchParams.get("genre") || "",
            country: searchParams.get("country") || "",
            release_year: searchParams.get("release_year") || "",
        };
        const page=Number(searchParams.get("page")) || 1;
        setFilters(urlFilters);
        fetchMovies(page, urlFilters);
    },[searchParams]);
    
    useEffect(()=>{
        const fetchFilters=async()=>{
            try{
                const[genreData, countryData]=await Promise.all([getGenres(), getCountries()]);
                setGenres(genreData);
                setCountries(countryData);
            }
            catch(error){
                console.log(error);
            }
            finally{
                setLoading(false);
            }
        }
        fetchFilters();
    },[]);

    const handleChange=(field, value)=>{
        setFilters((prev)=>({
            ...prev, [field]: value
        }))
    };

    const handleSearch=()=>{
        const params=new URLSearchParams();
        Object.entries(filters).forEach(([key, value])=>{
            if(value){
                params.set(key, value);
            }
        });
        params.set("page","1");
        router.push(`/movies?${params.toString()}`);
    };

    const resetFilters = () => {
        setFilters(emptyFilters);
        router.push("/movies");
    };
    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`/movies?${params.toString()}`);
    };

    return {movies, loading, filters, setFilters, pagination, fetchMovies,
        genres, countries, handleChange, handleSearch, resetFilters, handlePageChange
    };
}