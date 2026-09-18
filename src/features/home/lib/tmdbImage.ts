const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export type BackdropSize = 'w780' | 'w1280' | 'original';

/** Single backdrop URL at a given TMDB width. */
export function backdropUrl(
  path: string,
  size: BackdropSize = 'w1280'
): string {
  return `${IMAGE_BASE}/${size}${path}`;
}

/** Responsive srcSet so phones don't download a 1920px still. */
export function backdropSrcSet(path: string): string {
  return [
    `${IMAGE_BASE}/w780${path} 780w`,
    `${IMAGE_BASE}/w1280${path} 1280w`,
    `${IMAGE_BASE}/original${path} 1920w`,
  ].join(', ');
}
