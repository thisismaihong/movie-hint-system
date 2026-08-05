import { getFavorite } from "@/services/favoriteService";
import { getCountries, getGenres, getMovies } from "@/services/movieService";
import { useEffect, useState } from "react";


export default function useFavorite(){
    const[movies, setMovies]=useState([]);
    const [genres, setGenres] = useState([]);
    const [countries, setCountries] = useState([]);
    const[loading, setLoading]=useState(true);
    const[pagination, setPagination]=useState({
        current:1,
        total:0,
        pageSize:20
    });
    const[filters, setFilters]=useState({
        q: "",
        genre: "",
        country: "",
        release_year: "",
    });

    const handleChange=(field, value)=>{
        setFilters((prev)=>({
            ...prev, [field]: value
        }))
    };

    const handleSearch=()=>{
        fetchFovarites(1, filters)
    };

    const resetFilters=()=>{
        const empty={
            q: "",
            genre: "",
            country: "",
            release_year: "",
        };
        setFilters(empty);
        fetchFovarites(1, empty);
    };

    const fetchFovarites = async(page=pagination.current, customFilters=filters)=>{
        setLoading(true);
        try{
            const data=await getFavorite({page, ...customFilters});
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
        fetchFovarites();
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

    return {movies, loading, filters, setFilters, pagination, fetchFovarites,
        genres, countries, handleChange, handleSearch, resetFilters
    };
}