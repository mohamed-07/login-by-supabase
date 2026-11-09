// Convert the TMDB Object(Movies & TV Shows ) object to MyListInput Object
//  that well save it in the my-list table in supabase
import type { MediaType, MyListInput } from '../types/my-list.types';

interface TmdbMedia {
  id: number;
  title?: string; // Moves
  name?: string; // Tv shows
  poster_path: string | null;
  vote_average?: number;
}

export function toMyListItem(
  media: TmdbMedia,
  mediaType: MediaType
): MyListInput {
  return {
    media_id: media.id,
    media_type: mediaType,
    title: media.title ?? media.name ?? '',
    poster_path: media.poster_path,
    vote_average: media.vote_average ?? null,
  };
}
