<script lang="ts">
  import tmdbLogo from '$lib/assets/tmdb-short-logo.svg';
</script>

<slot />

<footer class="footer footer-center p-2 bg-base-200">
  <img class="tmdb-logo" alt="TheMobieDatabase logo" src={tmdbLogo} />
  <p>matrix-media-logging-widget uses the TMDB API but is not endorsed or certified by TMDB.</p>
</footer>

<style>
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.25em;
    flex-shrink: 0;
  }

  .tmdb-logo {
    display: inline-block;
    width: 80px;
  }

  @media (min-width: 480px) {
    footer {
      padding: 1.25em 0.5em;
    }
  }
</style>
