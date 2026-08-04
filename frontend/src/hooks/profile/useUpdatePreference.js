import { useEffect, useState } from "react";
import { notification } from "antd";

import { useAuth } from "../useAuth";
import { getCountries, getGenres } from "@/services/movieService";
import { updatePreferences } from "@/services/preferenceService";



export default function useUpdatePreference() {
    const { fetchUser } = useAuth();

    const [loading, setLoading] = useState(false);
    const [loadingOptions, setLoadingOptions] = useState(true);

    const [genres, setGenres] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const loadOptions = async () => {
            try {
                setLoadingOptions(true);

                const [genreData, countryData] =
                    await Promise.all([
                        getGenres(),
                        getCountries(),
                    ]);

                setGenres(genreData);
                setCountries(countryData);
            } catch (err) {
                console.log(err);
            } finally {
                setLoadingOptions(false);
            }
        };

        loadOptions();
    }, []);

    const handleUpdate = async (values) => {
        try {
            setLoading(true);

            await updatePreferences(values);

            await fetchUser();

            notification.success({
                message: "Cập nhật thành công.",
            });
            window.location.reload()

            return true;
        } catch (error) {
            console.log(error);

            notification.error({
                message: "Không thể cập nhật.",
                description:
                    error.response?.data?.detail ??
                    JSON.stringify(error.response?.data),
            });

            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        loadingOptions,
        genres,
        countries,
        handleUpdate,
    };
}