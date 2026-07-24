import { getCountries, getGenres } from "@/services/movieService";
import { notification } from "antd";
import { useEffect, useState } from "react";



export default function useMovieData(){
    const [genres, setGenres]=useState([]);
    const [countries, setContries]=useState([]);
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        const fetchMovieData=async()=>{
            try{
                setLoading(true);
                const [genresData, countriesData]=await Promise.all([
                    getGenres(),
                    getCountries
                ]);
                setGenres(genresData);
                setContries(countriesData);
            }
            catch(error){
                console.error("Lỗi lấy dữ liệu phim: ", error);
                notification.error({
                    title:"Lỗi dữ liệu.",
                    description: "Không thể tải danh sách thể loại hoặc quốc gia.",
                    placement: "topRight"
                });
            }
            finally{
                setLoading(false);
            }
        };
        fetchMovieData();
    },[]);



    return{genres, countries, loading};
}