"use client";

import {useTransition} from "react";
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
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        const query = params.toString();
        startTransition(() => router.push(query ? `${pathname}?${query}` : pathname));
    }

    return (
        <div className="flex justify-center gap-4 mb-5">
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
        </div>
    )
}
