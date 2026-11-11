import {MovieListPage} from "@/components/MovieListPage";
import {isSortOption} from "@/lib/sortOptions";

export default async function Home({ searchParams }: PageProps<"/">) {
  const { genre, sort, page, query } = await searchParams;
  const pageNumber = Number(page);

  return (
    <MovieListPage
      genreId={typeof genre === "string" ? genre : undefined}
      sortBy={isSortOption(sort) ? sort : undefined}
      page={Number.isInteger(pageNumber) && pageNumber > 0 ? Math.min(pageNumber, 500) : 1}
      searchQuery={typeof query === "string" && query.trim() ? query.trim() : undefined}
    />
  );
}
