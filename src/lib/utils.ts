export const formatReleaseDate = (movieReleaseDate: string) => {
    return movieReleaseDate ? new Date(movieReleaseDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC"
    }) : "Unknown";
}

export const formatRuntime = (runtime: number | null) => {
    if (!runtime) return "Unknown"; // TMDB sends 0 or null when the runtime isn't known

    return `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
}
