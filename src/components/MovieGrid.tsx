import {MovieCard} from "@/components/MovieCard";
import {getMovies} from "@/api/api";
import {MovieFilters} from "@/api/types";

export async function MovieGrid({genreId, sortByRating}: MovieFilters) {
    const movieList = await getMovies({genreId, sortByRating});

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {movieList.results.map((movie, index) =>
                <MovieCard key={movie.id} movie={movie} loadImageEagerly={index < 10}/>)}
        </div>
    )
}
