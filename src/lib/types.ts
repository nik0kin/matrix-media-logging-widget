export interface TvShow {
  id: number; // or string?
  provider: string;
  name: string;
  releaseYear: number;
}

export interface TvShowSeason {
  id: number; // or string?
  provider: string;
  name: string;
  seasonNumber: number;
  releaseYear: number;
}
