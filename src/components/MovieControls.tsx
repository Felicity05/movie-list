"use client";

import {SubmitEvent, useTransition} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Genre} from "@/api/types";
import {sortOptions} from "@/lib/sortOptions";

const buttonClass = "rounded-md bg-bright-green px-4 py-3 font-semibold disabled:opacity-50 cursor-pointer";

export function MovieControls({genres}: { genres: Genre[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const selectedGenre = searchParams.get("genre") ?? "";
    const selectedSort = searchParams.get("sort") ?? "";

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

    return (
        <div className="flex justify-center gap-4 mb-5 flex-wrap">
            {/* key remounts each select when the URL changes (e.g. back button), so defaultValue re-applies.
                The prefixes keep the two keys different, since both are "" when nothing is selected */}
            <select key={`sort-${selectedSort}`} className={buttonClass} disabled={isPending} defaultValue={selectedSort}
                    aria-label="Sort by" onChange={(event) => updateSearchParam("sort", event.target.value)}>
                <option value="">Most popular</option>
                {Object.entries(sortOptions).map(([value, option]) =>
                    <option key={value} value={value}>{option.label}</option>)}
            </select>

            <select key={`genre-${selectedGenre}`} className={buttonClass} disabled={isPending} defaultValue={selectedGenre}
                    aria-label="Genre" onChange={(event) => updateSearchParam("genre", event.target.value)}>
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
