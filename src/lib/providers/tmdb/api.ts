const baseUrl = 'https://api.themoviedb.org/3';

interface TmdbSearchTvShow {
  backdrop_path: string;
  first_air_date: string; // "2022-08-21"
  genre_ids: number[]; // enum?
  id: number;
  name: string;
  origin_country: string[]; // enum?
  original_language: string; // enum?
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export const searchTvShows = async (apiKey: string, query: string) => {
  const response = await fetch(
    baseUrl + `/search/tv?api_key=${apiKey}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();

  if (data.success === false) {
    throw new Error(data.status_message);
  }

  return data.results as TmdbSearchTvShow[];
};

interface TmdbTvShow {
  // Incomplete Typing
  first_air_date: string; // "2022-08-21"
  id: number;
  name: string;
  seasons: Array<{
    air_date: string; // "2022-08-21"
    id: number;
    name: string;
    season_number: number;
    episode_count: number;
  }>;
}

export const fetchTvShow = async (apiKey: string, id: number) => {
  const response = await fetch(baseUrl + `/tv/${id}?api_key=${apiKey}`);
  const data = await response.json();

  if (data.success === false) {
    throw new Error(data.status_message);
  }

  return data as TmdbTvShow;
};
