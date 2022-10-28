import { getEnvSettings } from '$lib/env-settings';
import type { PageServerLoad } from './$types';

const settings = getEnvSettings();

export const load: PageServerLoad = async () => {
  return {
    isDebug: settings.debug,
  };
};
