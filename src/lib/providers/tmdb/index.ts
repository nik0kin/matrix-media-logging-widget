import type { TvShow, TvShowSeason } from '$lib/types';
import { fetchTvShow, searchTvShows as apiSearchTvShows } from './api';

export const searchTvShows = async (apiKey: string, query: string) => {
  const data = await apiSearchTvShows(apiKey, query);
  return data.map(
    (t): TvShow => ({
      id: t.id,
      provider: 'tmdb',
      name: t.name,
      releaseYear: new Date(t.first_air_date).getFullYear(),
    })
  );
};

export const getTvShowSeasons = async (apiKey: string, id: number) => {
  const data = await fetchTvShow(apiKey, id);
  return data.seasons.map(
    (s): TvShowSeason => ({
      id: s.id,
      name: s.name,
      seasonNumber: s.season_number,
      provider: 'tmdb',
      releaseYear: new Date(s.air_date).getFullYear(),
    })
  );
};
