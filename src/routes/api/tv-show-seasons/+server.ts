import { json } from '@sveltejs/kit';
import { isUserAuthed } from '$lib/auth';
import { getEnvSettings } from '$lib/env-settings';
import { getTvShowSeasons } from '$lib/providers/tmdb';
import type { GetTvShowSeasonsResponse } from './types/+server';
import type { RequestHandler } from './$types';

export * from './types/+server';

const settings = getEnvSettings();

export const GET: RequestHandler = async ({ locals, url }) => {
  if (!settings.debug && !isUserAuthed(locals.userid)) {
    throw new Error('Unauthed');
  }
  console.log(`${locals.userid} authorized to use tv-show-seasons api`);

  const idString = url.searchParams.get('id');
  let id: number;

  try {
    id = Number(idString);
  } catch (e) {
    throw new Error('Missing id parameter or wrong type (expected number)');
  }

  const response: GetTvShowSeasonsResponse = {
    seasons: await getTvShowSeasons(settings.tmdbApiKey, id),
  };

  return json(response);
};
