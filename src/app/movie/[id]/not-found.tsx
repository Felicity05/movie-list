import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex w-full flex-col items-center gap-4 py-20 text-center">
            <h2 className="text-2xl font-bold">Movie not found</h2>
            <p>We couldn&apos;t find a movie with that id.</p>
            <Link href="/" className="rounded-md bg-bright-green px-4 py-3 font-semibold">
                Back to the movie list
            </Link>
        </div>
    )
}
