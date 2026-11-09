import { Check, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useIsInMyList, useMyList, useToggleMyList } from '../hooks/useMyList';
import type { MyListInput } from '../types/my-list.types';

interface Props {
    item: MyListInput;
    className?: string;
    showLabel?: boolean;
    tabIndex?: number;
  
}

export function MyListButton({ item, className, showLabel = false, tabIndex  }: Props) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { isLoading } = useMyList();
  const isInList = useIsInMyList(item.media_id, item.media_type);
  const { mutate, isPending } = useToggleMyList();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return navigate('/login');
    mutate({ item, isInList });
  };

  return (
    <Button
      type="button"
      size={showLabel ? 'lg' : 'icon'}
      variant="secondary"
      className={className}
      tabIndex={tabIndex}
      onClick={handleClick}
      disabled={isPending || isLoading}
      aria-pressed={isInList}
      aria-label={
        showLabel
          ? undefined
          : isInList
            ? 'Remove from My List'
            : 'Add to My List'
      }
    >
      {isInList ? <Check className="size-4" /> : <Plus className="size-4" />}
      {showLabel && <span>{isInList ? 'In My List' : 'Add to My List'}</span>}
    </Button>
  );
}
