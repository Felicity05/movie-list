import {MoviePage} from "@/components/MoviePage";

export default async function Home({ searchParams }: PageProps<"/">) {
  const { genre, sort, page, query } = await searchParams;
  const pageNumber = Number(page);

  return (
    <MoviePage
      genreId={typeof genre === "string" ? genre : undefined}
      sortByRating={sort === "rating"}
      page={Number.isInteger(pageNumber) && pageNumber > 0 ? Math.min(pageNumber, 500) : 1}
      searchQuery={typeof query === "string" && query.trim() ? query.trim() : undefined}
    />
  );
}
