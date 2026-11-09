"use client";

import {SubmitEvent, useTransition} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Genre} from "@/api/types";

const buttonClass = "rounded-md bg-bright-green px-4 py-3 font-semibold disabled:opacity-50 cursor-pointer";

export function MovieControls({genres}: { genres: Genre[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const selectedGenre = searchParams.get("genre") ?? "";
    const isSortedByRating = searchParams.get("sort") === "rating";

    function updateSearchParam(key: string, value: string | null) {
        const params = new URLSearchParams(searchParams);
        params.delete("page"); // a new filter or search starts at page 1

        // TMDB search can't filter by genre or sort, so search and the other controls replace each other
        if (key === "query") {
            params.delete("genre");
            params.delete("sort");
        } else {
            params.delete("query");
        }

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        const query = params.toString();
        startTransition(() => router.push(query ? `${pathname}?${query}` : pathname));
    }

    const currentQuery = searchParams.get("query") ?? "";

    function handleSearch(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault(); // stop the browser from reloading the page
        const formData = new FormData(event.currentTarget);
        const text = String(formData.get("query") ?? "").trim();
        updateSearchParam("query", text || null);
    }

    //popularity, rating, release date and title, plus ascending or descending.

    return (
        <div className="flex justify-center gap-4 mb-5 flex-wrap">
            <button className={buttonClass} disabled={isPending} aria-pressed={isSortedByRating}
                    onClick={() => updateSearchParam("sort", isSortedByRating ? null : "rating")}>
                {isSortedByRating ? "Clear Rating Sort" : "Sort by Rating"}
            </button>
            {/* key remounts the select when the URL changes (e.g. back button), so defaultValue re-applies */}
            <select key={selectedGenre} className={buttonClass} disabled={isPending} defaultValue={selectedGenre}
                    onChange={(event) => updateSearchParam("genre", event.target.value)}>
                <option value="">All Genres</option>
                {genres.map((genre) => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
            </select>
            <form onSubmit={handleSearch} className="flex gap-2">
                <input key={currentQuery} name="query" type="search" defaultValue={currentQuery}
                       placeholder="Search by title" aria-label="Search by title"
                       className="rounded-md border-2 border-ink px-3 py-2 w-50"/>
                <button type="submit" className={buttonClass} disabled={isPending}>Search</button>
            </form>
        </div>
    )
}
