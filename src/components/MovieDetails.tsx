import {getMovie} from "@/api/api";
import Image from "next/image";
import {formatReleaseDate, formatRuntime} from "@/lib/utils";
import {notFound} from "next/navigation";

export async function MovieDetails({id}: { id: string }) {
    // any failed request (usually a 404 for an unknown id) shows the not-found page
    const movie = await getMovie(id).catch(() => notFound());
    const imageUrl = "https://image.tmdb.org/t/p/w500";

    return (
        <div className="p-5 grid grid-cols-1 gap-5 md:grid-cols-[1fr_2fr] md:gap-10 items-end">
            {movie.poster_path ?
                <Image src={imageUrl + movie.poster_path}
                       alt={`${movie.title} poster`} width={400} height={600}
                       loading="eager"
                       sizes="(min-width: 768px) 33vw, 100vw"
                       className="rounded-md shadow-md max-w-md w-full aspect-2/3 object-cover"/>
                : <div className="flex aspect-2/3 max-w-md w-full items-center justify-center rounded-md bg-ink/20 text-ink">
                    <p className="text-xl font-bold">No Poster Available</p>
                </div>}
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold">{movie.title}</h2>
                <p>{movie.overview}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                    <p><span className="font-semibold">Genres:</span> {movie.genres.map((genre) => genre.name).join(', ') || "Unknown"}</p>
                    <p><span className="font-semibold">Release Date:</span> {formatReleaseDate(movie.release_date)}</p>
                    <p><span className="font-semibold">Vote Average:</span> {movie.vote_average.toFixed(1)}</p>
                    <p><span className="font-semibold">Runtime:</span> {formatRuntime(movie.runtime)}</p>
                    <p><span className="font-semibold">Status:</span> {movie.status}</p>
                    <p><span className="font-semibold">Languages:</span> {movie.spoken_languages.map((language) => language.english_name).join(', ') || "Unknown"}</p>
                </div>
            </div>
        </div>
    )
}
