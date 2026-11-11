import {SortOption} from "@/lib/sortOptions";

export type MovieList = {
    page: number,
    results: Movie[];
    total_pages: number,
    total_results: number,
}

export interface Movie {
    adult: boolean,
    backdrop_path: string | null,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string | null,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
}

// /movie/{id} returns full genre objects (genres) instead of genre_ids
export interface MovieDetails extends Omit<Movie, "genre_ids"> {
    belongs_to_collection: {
        id: number,
        name: string,
        poster_path: string | null,
        backdrop_path: string | null,
    } | null,
    budget: number,
    genres: Genre[],
    homepage: string,
    imdb_id: string | null,
    origin_country: string[],
    production_companies: ProdCompany[],
    production_countries: ProdCountry[],
    revenue: number,
    runtime: number | null,
    spoken_languages: SpokenLanguage[],
    status: string,
    tagline: string,
}

export type GenreList = {
    genres: Genre[];
}

export type Genre = {
    id: number,
    name: string,
}

export type MovieFilters = {
    genreId?: string,
    sortBy?: SortOption,
    page?: number,
    searchQuery?: string,
}

type SpokenLanguage = {
    english_name: string,
    iso_639_1: string,
    name: string,
}

type ProdCompany = {
    id: number,
    logo_path: string | null,
    name: string,
    origin_country: string
}

type ProdCountry = {
    iso_3166_1: string,
    name: string
}
