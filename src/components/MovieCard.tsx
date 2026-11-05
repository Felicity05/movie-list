import Image from "next/image";
import {Movie} from "@/api/types";

export function MovieCard({movie, loadImageEagerly}: { movie: Movie, loadImageEagerly?: boolean }) {
    const overviewWords = movie.overview.split(" ");
    const shortOverview = overviewWords.slice(0, 10).join(" ");
    const isLongOverview = overviewWords.length > 10;
    const baseImgURL = "https://image.tmdb.org/t/p/w500"

    return (
        <article className="flex flex-col items-start p-2 rounded-md shadow-md
                            bg-light-green transition hover:scale-105 hover:shadow-xl">
            {movie.poster_path ?
                <Image src={baseImgURL + movie.poster_path}
                    alt={`${movie.title} poster`} width={400} height={600}
                    loading={loadImageEagerly ? "eager" : "lazy"}
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                    className="rounded-md shadow-md w-full aspect-2/3 object-cover"
                /> : <div className="flex aspect-2/3 w-full items-center justify-center rounded-md bg-ink/20 text-ink">
                    <p className="text-xl font-bold">No Poster Available</p>
                </div>}
            <div className="flex flex-col gap-2 p-2">
                <p className="text-xl font-bold">{movie.title}</p>
                <p><span className="font-semibold">Rating: </span> {movie.vote_average.toFixed(1)}</p>
                <div className="relative group">
                    <p className="flex flex-wrap overflow-hidden">
                        {shortOverview} {isLongOverview ? " ..." : ""}
                    </p>
                    {isLongOverview && (
                        <div className="pointer-events-none absolute bottom-full left-0 z-10 mb-2 hidden w-64 rounded bg-black p-2 text-sm text-white shadow-lg group-hover:block">
                            {movie.overview}
                        </div>
                    )}
                </div>
                <p><span className="font-semibold">Release date: </span>
                    {movie.release_date ? new Date(movie.release_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "UTC"
                }) : "Unknown"}
                </p>
            </div>
        </article>
    )
}