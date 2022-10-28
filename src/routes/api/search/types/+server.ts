import type { TvShow } from '$lib/types';

export interface SearchRequest {
  query: string;
}

export interface SearchResponse {
  results: TvShow[];
}
