import { getMovieDetail } from "@/services/movieService";
import { useEffect, useState } from "react";


export default function useMovieDetail(id){
    const[movie, setMovie]=useState(null);
    const[loading, setLoading]=useState(true);

    useEffect(()=>{
        if(!id) return;
        const fetchMovie=async()=>{
            setLoading(true);
            try{
                const data= await getMovieDetail(id);
                setMovie(data);
            }
            catch(error){
                console.log(error);
            }
            finally{
                setLoading(false);
            }
        };
        if (id) {
            fetchMovie();
        }
    },[id]);

    return{movie, loading};

}