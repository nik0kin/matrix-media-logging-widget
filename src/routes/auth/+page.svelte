<!-- From a users perspective:
  - it starts up,
  - shows loading indicator,
  - gets a matrix openIdConnect accessToken,
  - then auths,
  - then redirects to status page -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { getOpenIDConnectToken } from '$lib/matrix-widget-client';
  import type { PostAuthRequest } from '../api/auth/auth-request-types';
  import type { PageData } from './$types';

  export let data: PageData;

  let showUnsupportedClientMessage: boolean = false;

  const postAuthRoute = '/home';

  onMount(async () => {
    // Matrix widget api startup done in app.html

    if (data.isDebug) return goto(postAuthRoute);

    // Show unsupported client message after 15s
    const clearUnsupportedTimeout = setTimeout(() => {
      showUnsupportedClientMessage = true;
    }, 15 * 1000);

    const widgetApi = await (window as any).__getWidgetApi;
    const [accessToken, matrixServerName] = await getOpenIDConnectToken(widgetApi);

    console.log('openIDConnectToken acquired', accessToken, matrixServerName);
    clearTimeout(clearUnsupportedTimeout);
    const request: PostAuthRequest = {
      accessToken,
      matrixServerName,
    };
    await fetch('/api/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    await goto(postAuthRoute);
  });
</script>

<svelte:head>
  <title>Loading</title>
  <meta name="description" content="Authing with matrix" />
</svelte:head>

<div class="loading">
  <div class="prose">
    <h1>Loading</h1>
  </div>
  {#if showUnsupportedClientMessage}
    <p>Your matrix client does not support authenticated widgets.</p>
    <p>
      Please use Element-Web or open an issue for your favorite client to add support for <a
        href="https://github.com/matrix-org/matrix-spec-proposals/blob/old_master/proposals/1960-integrations-openid.md"
        target="_blank"
        rel="noreferrer">MSC1690</a
      >.
    </p>
    <p>
      Give a 👍 on this <a
        href="https://github.com/vector-im/element-android/issues/2115"
        target="_blank"
        rel="noreferrer">element-android issue</a
      > if it'd help you.
    </p>
  {/if}
</div>

<style>
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
