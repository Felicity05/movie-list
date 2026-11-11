import {BackButton} from "@/components/BackButton";

// shaped like MovieDetails, so the root loading.tsx (a movie grid) isn't shown for this page
export default function Loading() {
    return (
        <>
            <BackButton/>
            <div className="p-5 grid grid-cols-1 gap-5 md:grid-cols-[1fr_2fr] md:gap-10 items-end animate-pulse">
                <div className="aspect-2/3 max-w-md w-full rounded-md bg-medium-green"/>
                <div className="flex flex-col gap-3">
                    <div className="h-8 w-2/3 rounded bg-medium-green"/>
                    <div className="h-4 w-full rounded bg-medium-green"/>
                    <div className="h-4 w-full rounded bg-medium-green"/>
                    <div className="h-4 w-1/2 rounded bg-medium-green"/>
                </div>
            </div>
        </>
    )
}
