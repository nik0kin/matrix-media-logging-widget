import { error } from '@sveltejs/kit';
import { isUserAuthed } from '$lib/auth';
import { getEnvSettings } from '$lib/env-settings';
import type { PageServerLoad } from './$types';

const settings = getEnvSettings();

export const load: PageServerLoad = async ({ locals }) => {
  if (!settings.debug && !isUserAuthed(locals.userid)) {
    throw error(401, 'Unauthed');
  }
  console.log(`${locals.userid} authorized to view submit page`);
};
