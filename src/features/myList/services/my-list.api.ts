import { supabase } from '@/lib/supabaseClient';
import type {
  MyListItem,
  MyListInput,
  MediaType,
} from '../types/my-list.types';

export const myListService = {
  // Get all items in the my-list table
  async getAll(): Promise<MyListItem[]> {
    const { data, error } = await supabase
      .from('my_list')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  // Add a new item to the my-list table
  async add({
    media_id,
    media_type,
    title,
    poster_path,
    vote_average,
  }: MyListInput) {
    const { data, error } = await supabase
      .from('my_list') //my_list
      .insert([{ media_id, media_type, title, poster_path, vote_average }]);
    if (error) throw error;
    return data;
  },
  // Remove an item from the my-list table
  async remove(mediaId: number, mediaType: MediaType) {
    const { data, error } = await supabase
      .from('my_list')
      .delete()
      .eq('media_id', mediaId)
      .eq('media_type', mediaType);
    if (error) throw error;
    return data;
  },
};
