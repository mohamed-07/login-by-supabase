import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/features/auth/store/authStore'; // for getting the user data from the store
import { myListService } from '../services/my-list.api';
import type {
  MediaType,
  MyListItem,
  MyListInput,
} from '../types/my-list.types';
import { toast } from '@/components/ui/toast';

const myListKey = (userId?: string) => ['my-list', userId] as const;

const isSame = (
  a: { media_id: number; media_type: MediaType },
  b: { media_id: number; media_type: MediaType }
) => a.media_id === b.media_id && a.media_type === b.media_type;

// Getting the list (only once and then from Caching)
export const useMyList = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: myListKey(user?.id),
    queryFn: myListService.getAll,
    enabled: !!user,
  });
};

// (serching in cache without fetching) is this item inside list?
export const useIsInMyList = (mediaId: number, mediaType: MediaType) => {
  const { data } = useMyList();

  return (
    data?.some((i) =>
      isSame(i, { media_id: mediaId, media_type: mediaType })
    ) ?? false
  );
};

// Add or Remove item from list
export const useToggleMyList = () => {
  const { user } = useAuthStore();
  // for invalidating the cache after adding or removing an item
  const queryClient = useQueryClient();
  const key = myListKey(user?.id);

  return useMutation({
    mutationFn: ({ item, isInList,}: {item: MyListInput;isInList: boolean }) =>
      isInList
        ? myListService.remove(item.media_id, item.media_type)
        : myListService.add(item),
    // Optimistic Update: Update the cache before the mutation is completed
    onMutate: async ({ item, isInList }) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<MyListItem[]>(key);

      queryClient.setQueryData<MyListItem[]>(key, (old = []) =>
        isInList
          ? old.filter((i) => !isSame(i, item))
          : [
              {
                ...item,
                id: crypto.randomUUID(),
                user_id: user?.id ?? '',
                created_at: new Date().toISOString(),
              },
              ...old,
            ]
      );

      return { previous };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(key, context?.previous);
      toast.add({
        type: 'error',
        title: 'My List',
        description: "Couldn't update My List. Please try again.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};
