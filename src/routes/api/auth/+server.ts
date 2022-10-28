import { json } from '@sveltejs/kit';
import { authUser, isUserAuthed } from '$lib/auth';
import { getEnvSettings } from '$lib/env-settings';

import type { RequestHandler } from './$types';
import type { PostAuthRequest } from './auth-request-types';
import { authWithMatrix } from './matrix-auth';

const settings = getEnvSettings();

// Auth
export const POST: RequestHandler = async ({ locals, request }) => {
  if (isUserAuthed(locals.userid)) {
    return json({});
  }

  const body: PostAuthRequest = await request.json();
  const mxId = await authWithMatrix(!!settings.debug, body.accessToken, body.matrixServerName);
  authUser(settings, locals.userid, mxId);
  return json({});
};
