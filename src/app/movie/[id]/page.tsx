import {MovieDetails} from "@/components/MovieDetails";
import {BackButton} from "@/components/BackButton";

export default async function MovieDetailsPage({params}: PageProps<"/movie/[id]">) {
    const {id} = await params;

    return (
        <>
            <BackButton/>
            <MovieDetails id={id}/>
        </>
    )
}
