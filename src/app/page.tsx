import {MoviePage} from "@/components/MoviePage";

export default async function Home({ searchParams }: PageProps<"/">) {
  const { genre, sort } = await searchParams;

  return (
    <MoviePage
      genreId={typeof genre === "string" ? genre : undefined}
      sortByRating={sort === "rating"}
    />
  );
}
