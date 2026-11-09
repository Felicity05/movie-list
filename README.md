# Movie List

A movie browser built with Next.js that lists movies from the [TMDB](https://www.themoviedb.org/) `/discover/movie` endpoint, with filtering by genre, several sort options, search by title and pagination.

## Getting started

1. Install the dependencies and start the app:

   ```bash
   npm i && npm start
   ```

   `npm start` first creates a production build (the `prestart` script runs `next build`), then starts the server.


2. Open [http://localhost:3000](http://localhost:3000).

No extra setup is needed: a TMDB API key is included in the `.env.local` file so the project runs as soon as it's cloned. In a real project, this file would be kept out of the repository. The key is only read on the server and is never sent to the browser. To use your own key, replace the value of `TMDB_API_KEY` in `.env.local`.


For development with automatic reloading on code changes, run `npm run dev` instead of `npm start`.

## Features

### Requirements

- **Fetching movies:** results from `/discover/movie`, 20 per page.
- **Filter applied to the API request:** choosing a genre from the dropdown sends `with_genres=<genre id>` to TMDB, so the filtering happens on the API side. The genre list itself is loaded from `/genre/movie/list`.
- **Sorting:** a "Sort by" dropdown with Most popular (TMDB's default), Highest rated, Newest, Oldest, Title A–Z and Most voted. Each choice sends the matching `sort_by` value to TMDB, for example `vote_average.desc` for Highest rated.
- **Movie grid:** each card shows:
  - the poster image, or a "No Poster Available" placeholder of the same size when TMDB has none
  - the title
  - the rating, the release date and a short overview
- **Interactive elements:**
  - hovering over a card enlarges it slightly and deepens its shadow
  - hovering over a shortened overview shows the full text in a tooltip

### Extras

- **Responsive grid:** 1 column on phones, increasing to 2, 3 and 5 columns as the screen gets wider.
- **UI for filtering and sorting:** dropdowns for the genre and the sort order. Both are disabled while the new results load.
- **CSS transitions:** the card hover effect is animated.
- **Loading skeleton:** pulsing placeholder cards are shown while movies load, both on the first visit and whenever the genre or sort changes.
- **Error page:** if a TMDB request fails, a friendly message with a "Try again" button is shown instead of Next.js's default error page.
- **Pagination:** Prev and Next buttons, plus up to 5 page numbers around the current page. The current page is highlighted, and the controls are hidden when there's only one page.
- **Search by title:** a search box that uses TMDB's `/search/movie` endpoint. Results are paginated the same way.
- **Empty state:** when there are no results (for example, a search with no matches or a page past the end), a "No movies found" message is shown, with a link back to page 1 when needed.

## How it works

The current filter, sort, search and page are stored in the URL, for example `/?genre=28&sort=rating&page=2` or `/?query=batman`:

1. `MovieControls` and `Pagination` (client components) update the URL when the user sorts, picks a genre, searches or changes page.
2. `page.tsx` reads the URL's `searchParams` on the server, checks them (an invalid page becomes 1, and the page is capped at 500), and passes the values to `MoviePage`, which passes them to `MovieGrid`.
3. `MovieGrid` calls `searchMovies()` when there's a search term, or `getMovies()` otherwise, and renders the grid and the pagination controls.

Storing the state in the URL means a filtered or sorted view can be bookmarked or shared, and the browser's back and forward buttons work as expected.

### Loading and error states

- `layout.tsx` holds the page frame and heading, so they stay on screen while the page loads or after an error.
- `loading.tsx` is shown on the first visit, with placeholders for the controls and the grid.
- When the genre, sort, search or page changes, only the grid is replaced by the skeleton. `MovieGrid` is wrapped in a `<Suspense>` whose `key` is built from all four values, so each change starts a fresh loading state while the heading and controls stay in place.
- `error.tsx` catches errors from the page, such as a failed TMDB request or a missing API key, and offers a retry.

## Decisions

- **Sorting through the API instead of in the browser:** TMDB sorts across all matching movies, not just the 20 on the first page. Sorting in the browser would only reorder the movies already loaded.
- **Minimum vote counts for some sorts:** with `sort_by=vote_average.desc` alone, the top results are obscure movies with a single 10/10 vote, so Highest rated also sends `vote_count.gte=300`. Newest, Oldest and Title A–Z require at least 50 votes, which keeps unreleased and very obscure movies off the top of the list.
- **One shared list of sort options:** `src/lib/sortOptions.ts` holds each option's label and its TMDB parameters. The dropdown reads the labels in the browser and `getMovies()` reads the parameters on the server, so adding a sort is a one-line change. The file never reads the API key, so it's safe to use in the browser.
- **Short sort names in the URL:** the URL uses the app's own names (`?sort=newest`) rather than TMDB's (`primary_release_date.desc`). Unknown values are ignored, and old `?sort=rating` links still work.
- **No "Title Z–A" option:** TMDB's descending title sort puts titles in non-Latin alphabets after Z, so the list didn't start where users would expect.
- **Server components by default:** data is fetched on the server, and only the controls run in the browser, since they need click and change handlers.
- **One shared fetch helper:** `fetchFromTmdb()` in `src/api/api.ts` builds the URL, adds the API key, checks the response and returns typed data. Both API functions use it, and errors are thrown rather than hidden, so `error.tsx` can show them.
- **Image loading:** the first 10 posters load immediately because they're the ones visible first. The rest load as you scroll. Each poster also has a `sizes` hint, so the browser downloads an image no bigger than the column it's shown in.
- **Same poster shape for every card:** a few TMDB posters aren't exactly 2:3, which made some cards shorter than others. Every poster is shown in a 2:3 frame and fills it, trimming a thin strip if needed, so all cards in a row line up.
- **Search and filters take turns:** TMDB's `/search/movie` endpoint doesn't support genre filtering or sorting. Filtering the results in the app would only cover the 20 movies on the current page, so the page count would be wrong. Instead, searching clears the genre and sort, and choosing a genre or sort clears the search.
- **Search on submit, not on every keystroke:** the search runs when the user presses Enter or clicks Search. Updating the URL on every keystroke would send a TMDB request per letter and add a browser history entry per letter.
- **Changing the filter, sort or search goes back to page 1:** different results have different numbers of pages, so keeping the old page could land on an empty one.
- **Pages capped at 500:** TMDB rejects page numbers above 500, so the pagination never goes past it and larger values in the URL are reduced to 500.
- **Dates shown in UTC:** TMDB release dates are plain dates (`2025-07-16`). Formatting them in the local timezone would show the previous day in the Americas.

## Project structure

```
src/
├── api/
│   ├── api.ts                 # TMDB requests (fetchFromTmdb, getMovies, searchMovies, getMovieGenres)
│   └── types.ts               # TypeScript types for TMDB responses and the filters
├── lib/
│   └── sortOptions.ts         # Sort options: dropdown labels and TMDB parameters
├── app/
│   ├── layout.tsx             # Page frame and heading, shared by the page, loading and error states
│   ├── page.tsx               # Reads and checks searchParams, renders MoviePage
│   ├── loading.tsx            # Skeleton shown on the first load
│   ├── error.tsx              # Error message with a retry button
│   └── globals.css            # Tailwind setup and theme colors
└── components/
    ├── MoviePage.tsx          # Fetches genres, renders the controls and the grid
    ├── MovieControls.tsx      # Sort and genre dropdowns and search box (client component)
    ├── MovieGrid.tsx          # Fetches movies, renders the grid, pagination or empty state
    ├── Pagination.tsx         # Prev, Next and page-number buttons (client component)
    ├── MovieGridSkeleton.tsx  # Placeholder grid shown while movies load
    └── MovieCard.tsx          # A single movie card
```

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

### AI assistance

I used an AI assistant to help with code review and debugging during the project.
