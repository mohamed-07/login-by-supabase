export type MediaType = "movie" | "tv";

export interface MyListItem { 
    id: string;
    user_id: string;
    media_id: number;
    media_type: MediaType;
    title: string;
    poster_path: string | null;
    vote_average: number | null;
    created_at: string;

}

export type MyListInput = Omit<MyListItem, "id" | "user_id" | "created_at">;

// The important concept to remember:
// - MyListItem represents a complete record in your database.
// - MyListInput represents the data required to create a new record.
// - Omit helps you avoid repeating the same properties in multiple TypeScript types.