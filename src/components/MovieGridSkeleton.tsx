export function MovieGridSkeleton() {
    return (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {Array.from({length: 10}, (_, index) => (
                <div key={index} className="animate-pulse rounded-md bg-light-green p-2">
                    <div className="aspect-2/3 w-full rounded-md bg-medium-green"/>
                    <div className="mt-3 h-5 w-3/4 rounded bg-medium-green"/>
                    <div className="mt-2 h-4 w-1/2 rounded bg-medium-green"/>
                </div>
            ))}
        </div>
    )
}