import { getCountries, getGenres } from "@/services/movieService";
import { getRecommendations } from "@/services/recommendationService";
import { useEffect, useState } from "react";

export default function useRecommendations() {
    const [recommendation, setRecommendation] = useState([]);
    const [genres, setGenres] = useState([]);
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [pagination, setPagination] = useState({
        current: 1,
        total: 0,
        pageSize: 20,
    });

    const [filters, setFilters] = useState({
        q: "",
        genre: "",
        country: "",
        release_year: "",
    });

    const handleChange = (field, value) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const fetchRecommendations = async (page = pagination.current, customFilters = filters) => {
        setLoading(true);
        try {
            setError(null);
            const data = await getRecommendations({
                page,
                ...customFilters,
            });
            setRecommendation(data.results);
            setPagination({
                current: page,
                total: data.count,
                pageSize: 20,
            });
        } catch (error) {
            console.error("Lỗi xem danh sách đề xuất: ", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchRecommendations(1, filters);
    };

    const resetFilters = () => {
        const emptyFilters = {
            q: "",
            genre: "",
            country: "",
            release_year: "",
        };
        setFilters(emptyFilters);
        fetchRecommendations(1, emptyFilters);
    };

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const [genreData, countryData] = await Promise.all([
                    getGenres(),
                    getCountries(),
                ]);

                setGenres(genreData);
                setCountries(countryData);
            } catch (error) {
                console.error("Lỗi lấy bộ lọc:", error);
            }
        };
        fetchFilters();
        fetchRecommendations(1, filters);
    }, []);

    return {recommendation,genres,countries,loading, error, filters,pagination,
        handleChange,handleSearch, resetFilters,fetchRecommendations};
}