import { json } from '@sveltejs/kit';
import { isUserAuthed } from '$lib/auth';
import { getEnvSettings } from '$lib/env-settings';
import { searchTvShows } from '$lib/providers/tmdb';
import type { SearchResponse } from './types/+server';
import type { RequestHandler } from './$types';

export * from './types/+server';

const settings = getEnvSettings();

export const GET: RequestHandler = async ({ locals, url }) => {
  if (!settings.debug && !isUserAuthed(locals.userid)) {
    throw new Error('Unauthed');
  }
  console.log(`${locals.userid} authorized to use search api`);

  const response: SearchResponse = {
    results: await searchTvShows(settings.tmdbApiKey, url.searchParams.get('query') || ''),
  };

  return json(response);
};
