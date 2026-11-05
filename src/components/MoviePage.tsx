import {MovieGrid} from "@/components/MovieGrid";
import {MovieControls} from "@/components/MovieControls";
import {getMovieGenres} from "@/api/api";
import {MovieFilters} from "@/api/types";
import {MovieGridSkeleton} from "@/components/MovieGridSkeleton";
import {Suspense} from "react";

export async function MoviePage({genreId, sortByRating}: MovieFilters) {
    const movieGenres = await getMovieGenres();

    return (
        <div className="w-full">
            <MovieControls genres={movieGenres.genres} />
            <Suspense key={`${genreId}-${sortByRating}`} fallback={<MovieGridSkeleton/>}>
                <MovieGrid genreId={genreId} sortByRating={sortByRating}/>
            </Suspense>
        </div>
    )
}
