# Movie List

A movie browser built with Next.js that lists movies from the [TMDB](https://www.themoviedb.org/) `/discover/movie` endpoint, with filtering by genre and sorting by rating.

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

- **Fetching movies:** the first page of results from `/discover/movie`.
- **Filter applied to the API request:** choosing a genre from the dropdown sends `with_genres=<genre id>` to TMDB, so the filtering happens on the API side. The genre list itself is loaded from `/genre/movie/list`.
- **Sorting:** the "Sort by Rating" button sends `sort_by=vote_average.desc` to TMDB. Clicking it again removes the sort and returns to TMDB's default order (popularity).
- **Movie grid:** each card shows:
  - the poster image, or a "No Poster Available" placeholder of the same size when TMDB has none
  - the title
  - the rating, the release date and a short overview
- **Interactive elements:**
  - hovering over a card enlarges it slightly and deepens its shadow
  - hovering over a shortened overview shows the full text in a tooltip

### Extras

- **Responsive grid:** 1 column on phones, increasing to 2, 3 and 5 columns as the screen gets wider.
- **UI for filtering and sorting:** a dropdown for genres and a toggle button for sorting. Both are disabled while the new results load.
- **CSS transitions:** the card hover effect is animated.
- **Loading skeleton:** pulsing placeholder cards are shown while movies load, both on the first visit and whenever the genre or sort changes.
- **Error page:** if a TMDB request fails, a friendly message with a "Try again" button is shown instead of Next.js's default error page.

## How it works

The current filter and sort are stored in the URL, for example `/?genre=28&sort=rating`:

1. `MovieControls` (a client component) updates the URL when the button is clicked or a genre is selected.
2. `page.tsx` reads the URL's `searchParams` on the server and passes the values to `MoviePage`, which passes them to `MovieGrid`.
3. `MovieGrid` calls `getMovies()`, which adds the matching TMDB query parameters to the request.

Storing the state in the URL means a filtered or sorted view can be bookmarked or shared, and the browser's back and forward buttons work as expected.

### Loading and error states

- `layout.tsx` holds the page frame and heading, so they stay on screen while the page loads or after an error.
- `loading.tsx` is shown on the first visit, with placeholders for the controls and the grid.
- When the genre or sort changes, only the grid is replaced by the skeleton. `MovieGrid` is wrapped in a `<Suspense>` whose `key` is built from the filter and sort, so each change starts a fresh loading state while the heading and controls stay in place.
- `error.tsx` catches errors from the page, such as a failed TMDB request or a missing API key, and offers a retry.

## Decisions

- **Sorting through the API instead of in the browser:** TMDB sorts across all matching movies, not just the 20 on the first page. Sorting in the browser would only reorder the movies already loaded.
- **Minimum vote count when sorting by rating:** with `sort_by=vote_average.desc` alone, the top results are obscure movies with a single 10/10 vote. The request also sends `vote_count.gte=300`, so the list shows well-rated movies that enough people have voted on.
- **Server components by default:** data is fetched on the server, and only the controls run in the browser, since they need click and change handlers.
- **One shared fetch helper:** `fetchFromTmdb()` in `src/api/api.ts` builds the URL, adds the API key, checks the response and returns typed data. Both API functions use it, and errors are thrown rather than hidden, so `error.tsx` can show them.
- **Image loading:** the first 10 posters load immediately because they're the ones visible first. The rest load as you scroll. Each poster also has a `sizes` hint, so the browser downloads an image no bigger than the column it's shown in.
- **Same poster shape for every card:** a few TMDB posters aren't exactly 2:3, which made some cards shorter than others. Every poster is shown in a 2:3 frame and fills it, trimming a thin strip if needed, so all cards in a row line up.
- **Dates shown in UTC:** TMDB release dates are plain dates (`2025-07-16`). Formatting them in the local timezone would show the previous day in the Americas.

## Project structure

```
src/
├── api/
│   ├── api.ts                 # TMDB requests (fetchFromTmdb, getMovies, getMovieGenres)
│   └── types.ts               # TypeScript types for TMDB responses and the filters
├── app/
│   ├── layout.tsx             # Page frame and heading, shared by the page, loading and error states
│   ├── page.tsx               # Reads searchParams and renders MoviePage
│   ├── loading.tsx            # Skeleton shown on the first load
│   ├── error.tsx              # Error message with a retry button
│   └── globals.css            # Tailwind setup and theme colors
└── components/
    ├── MoviePage.tsx          # Fetches genres, renders the controls and the grid
    ├── MovieControls.tsx      # Sort button and genre dropdown (client component)
    ├── MovieGrid.tsx          # Fetches movies and renders the grid
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
