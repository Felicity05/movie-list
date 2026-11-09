import {MovieCard} from "@/components/MovieCard";
import {getMovies, searchMovies} from "@/api/api";
import {MovieFilters} from "@/api/types";
import {Pagination} from "@/components/Pagination";
import Link from "next/link";

const tmdbMaxPage = 500; // TMDB rejects page numbers above 500

export async function MovieGrid({genreId, sortByRating, page = 1, searchQuery}: MovieFilters) {
    const movieList = searchQuery
        ? await searchMovies(searchQuery, page)
        : await getMovies({genreId, sortByRating, page});

    if (movieList.results.length === 0) {
        // keep the filters and search, drop the page
        const firstPageParams = new URLSearchParams();
        if (genreId) firstPageParams.set("genre", genreId);
        if (sortByRating) firstPageParams.set("sort", "rating");
        if (searchQuery) firstPageParams.set("query", searchQuery);
        const firstPageQuery = firstPageParams.toString();

        return (
            <div className="flex flex-col items-center gap-5 py-20 text-center">
                <h2 className="text-3xl font-bold">No movies found</h2>
                {searchQuery ?
                    <p className="text-xl">No movies match <span className="font-semibold">{searchQuery}</span>. Try a different title.</p> :
                    <p className="text-xl">Try another genre{page > 1 ? ", or go back to page 1" : ""}.</p> }
                {page > 1 && (
                    <Link href={firstPageQuery ? `/?${firstPageQuery}` : "/"}
                          className="rounded-md bg-bright-green px-4 py-3 font-semibold">
                        Back to page 1
                    </Link>
                )}
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {movieList.results.map((movie, index) =>
                    <MovieCard key={movie.id} movie={movie} loadImageEagerly={index < 10}/>)}
            </div>
            <Pagination currentPage={page} lastPage={Math.min(movieList.total_pages, tmdbMaxPage)}/>
        </>
    )
}
