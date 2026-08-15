import SearchMovieCard from "./SearchMovieCard";

export default function SearchMovieGrid({ movies }) {
    if (!movies || movies.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {movies.map((movie) => (
                <SearchMovieCard
                    key={movie.movie_id}
                    movie={movie}
                />
            ))}
        </div>
    );
}