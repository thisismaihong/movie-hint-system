"use client";

import MainLayout from "@/components/layout/MainLayout";
import CreateSuggestion from "@/components/suggestion/CreateSuggestion";
import useCreateSuggestion from "@/hooks/suggestion/useCreateSuggestion";

export default function AddMoviePage() {
    const {countries, loadingCountries, loading, error, handleSubmit,
         MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH} = useCreateSuggestion();

    return (
        <MainLayout>
            <CreateSuggestion
                countries={countries}
                loadingCountries={loadingCountries}
                loading={loading}
                handleSubmit={handleSubmit}
                MAX_TITLE_LENGTH={MAX_TITLE_LENGTH}
                MAX_DESCRIPTION_LENGTH={MAX_DESCRIPTION_LENGTH}
            />
        </MainLayout>
    );
}