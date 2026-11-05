'use client'
import {useEffect} from "react";

export default function ErrorPage({error, retry}: { error: unknown, retry: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex w-full flex-col items-center gap-4 py-20 text-center m-auto">
            <h2 className="text-2xl font-bold">Couldn&apos;t load movies</h2>
            <p>Something went wrong while contacting TMDB. Please try again.</p>
            <button onClick={() => retry()} className="rounded-md bg-bright-green px-4 py-3 font-semibold cursor-pointer">
                Try again
            </button>
        </div>
    )
}
