import {MovieGridSkeleton} from "@/components/MovieGridSkeleton";

export default function Loading() {
    return (
        <div className="w-full">
            {/* Placeholders the same size as the sort button and genre dropdown, so nothing shifts when they load */}
            <div className="flex justify-center gap-4 mb-5">
                <div className="h-12 w-36 animate-pulse rounded-md bg-medium-green"/>
                <div className="h-12 w-40 animate-pulse rounded-md bg-medium-green"/>
            </div>
            <MovieGridSkeleton/>
        </div>
    )
}
