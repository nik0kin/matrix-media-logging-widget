<script lang="ts">
  import type { TvShow, TvShowSeason } from '$lib/types';

  // import { onMount } from 'svelte';
  import Svelecte from 'svelecte';
  import type { SearchResponse } from '../api/search/+server';
  import type { GetTvShowSeasonsResponse } from '../api/tv-show-seasons/+server';

  let saving = false;

  let selectedTvShow: TvShow | undefined;
  let selectedTvShowSeasons: TvShowSeason[] | undefined;
  let selectedTvShowSeasonId: TvShowSeason['id'] | 'default' = 'default';

  const resetSelection = () => {
    selectedTvShow = undefined;
    selectedTvShowSeasonId = 'default';
    selectedTvShowSeasons = undefined;
  };

  $: selectedTvShow,
    !selectedTvShow
      ? resetSelection()
      : fetch(`/api/tv-show-seasons?id=${selectedTvShow.id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }).then(async (response) => {
          const data: GetTvShowSeasonsResponse = await response.json();
          selectedTvShowSeasons = data.seasons;
        });

  const searchResponseTransform = (json: SearchResponse) =>
    json.results.map((t) => ({
      ...t,
      original_name: t.name,
      name: `${t.name} (${t.releaseYear})`,
    }));

  const saveTvShowViewing = async (tvShow: TvShow, tvShowSeason?: TvShowSeason) => {
    const message = tvShowSeason
      ? `${tvShow.name} - ${tvShowSeason?.name} (${tvShowSeason?.releaseYear})`
      : `${tvShow.name} (${tvShow.releaseYear})`;

    const event = {
      type: 'm.room.message',
      content: {
        'in.nikok.matrix-media-logging-widget.data': {
          tvShow: [tvShow.provider, tvShow.id],
          tvShowSeason: tvShowSeason && [tvShowSeason.provider, tvShowSeason.id],
        },
        body: 'I watched ' + message,
        msgtype: 'm.notice',
      },
    };

    console.log('saving ' + message);
    (await (window as any).__getWidgetApi).transport.send('send_event', event);
  };
</script>

<svelte:head>
  <title>Media Logging</title>
  <meta name="description" content="A way to log media" />
</svelte:head>

<div class="media-logging-page">
  <div class="prose">
    <h1 class="mb-4">Media Logging</h1>
  </div>

  <div class="form-control w-full max-w-xs mb-4">
    <label class="label sr-only" for="tv-show">
      <span class="label-text">What TV show did you complete?</span>
    </label>
    <!-- TODO daisy-ify Svelecte input -->
    <!-- <input
      name="tv-show"
      type="text"
      placeholder="What TV show did you complete?"
      class="input input-bordered w-full max-w-xs"
    /> -->
    <Svelecte
      name="tv-show"
      bind:value={selectedTvShow}
      valueAsObject
      minQuery={2}
      placeholder="What TV show did you complete?"
      fetch="/api/search?query=[query]"
      fetchCallback={searchResponseTransform}
    />
  </div>

  <div class="form-control w-full max-w-xs mb-4">
    <label class="label sr-only" for="season">
      <span class="label-text">Which season?</span>
    </label>
    <select
      name="season"
      class="select w-full max-w-xs"
      disabled={!selectedTvShowSeasons}
      bind:value={selectedTvShowSeasonId}
    >
      <option disabled selected value="default">Which season?</option>
      {#if selectedTvShowSeasons}
        {#each selectedTvShowSeasons.filter((s) => s.name !== 'Specials') as season}
          <option value={season.id}>{season.name} ({season.releaseYear})</option>
        {/each}
      {/if}
    </select>
  </div>

  <button
    class="btn btn-wide w-full max-w-xs mb-4"
    class:loading={saving}
    disabled={saving || !selectedTvShow || !selectedTvShowSeasonId}
    on:click={() => {
      saving = true;
      const season = selectedTvShowSeasons?.find((s) => s.id === selectedTvShowSeasonId);

      if (!selectedTvShow)
        throw new Error('Save tv show viewing button clicked without a selectedTvShow');

      const tvShow = { ...selectedTvShow, name: selectedTvShow.original_name };
      saveTvShowViewing(tvShow, season);
      resetSelection();
      saving = false;
    }}
  >
    Submit
  </button>
</div>

<style>
  .media-logging-page {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 480px) {
    h1.mb-4 {
      margin-bottom: 2rem;
    }

    button.mb-4 {
      margin-bottom: 2rem;
    }
  }
</style>
