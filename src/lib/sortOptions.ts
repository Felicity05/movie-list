// shared by the API (TMDB params) and the dropdown (labels), so it must never read the API key
export const sortOptions = {
    rating: {label: "Highest rated", params: {sort_by: "vote_average.desc", "vote_count.gte": "300"}},
    newest: {label: "Newest", params: {sort_by: "primary_release_date.desc", "vote_count.gte": "50"}},
    oldest: {label: "Oldest", params: {sort_by: "primary_release_date.asc", "vote_count.gte": "50"}},
    titleAsc: {label: "Title A–Z", params: {sort_by: "title.asc", "vote_count.gte": "50"}},
    votes: {label: "Most voted", params: {sort_by: "vote_count.desc"}}
} satisfies Record<string, {label: string, params: Record<string, string>}>;

export type SortOption = keyof typeof sortOptions;

export function isSortOption(value: unknown): value is SortOption {
    return typeof value === "string" && Object.hasOwn(sortOptions, value);
}