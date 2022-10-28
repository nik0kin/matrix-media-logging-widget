import type { Settings } from '$lib/settings';

// auth to this widget application backend, not matrix

const authCache: Record<string, string> = {};

export function authUser({ allowlistHomeserver }: Settings, userId: string, mxId: string) {
  if (allowlistHomeserver && !mxId.match(new RegExp(`:${allowlistHomeserver}$`))) {
    // Silenting don't auth, maybe we should show an error screen?
    console.log(`Matrix User ${mxId} not allowed by allowlistHomeserver=${allowlistHomeserver}`);
    return;
  }

  authCache[userId] = mxId;
}

export function isUserAuthed(userId: string) {
  return !!authCache[userId];
}
