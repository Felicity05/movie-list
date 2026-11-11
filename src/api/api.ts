import {GenreList, MovieDetails, MovieFilters, MovieList} from "@/api/types";
import {sortOptions} from "@/lib/sortOptions";

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = process.env.TMDB_API_KEY;

async function fetchFromTmdb<T>(path: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${baseUrl}${path}`);

    if (!apiKey) {
        throw new Error("TMDB_API_KEY is missing. Add it to .env.local (see README).");
    }

    url.searchParams.set('api_key', apiKey);
    for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
    }

    const response = await fetch(url, {
        headers: {
            accept: 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Request to ${path} failed: ${response.status}`);
    }

    return response.json();
}

export function getMovies({genreId, sortBy, page}: MovieFilters = {}) {
    const params: Record<string, string> = sortBy ? {...sortOptions[sortBy].params} : {};

    if (genreId) {
        params.with_genres = genreId;
    }

    if (page) {
        params.page = page.toString();
    }

    return fetchFromTmdb<MovieList>('/discover/movie', params);
}

export function getMovieGenres() {
    return fetchFromTmdb<GenreList>('/genre/movie/list');
}

export function searchMovies(query: string, page?: number) {
    const params: Record<string, string> = {query};

    if (page) {
        params.page = page.toString();
    }

    return fetchFromTmdb<MovieList>('/search/movie', params);
}

export function getMovie(id: string) {
    return fetchFromTmdb<MovieDetails>(`/movie/${id}`);
}
