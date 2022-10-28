<script lang="ts">
  import tmdbLogo from '$lib/assets/tmdb-short-logo.svg';
</script>

<slot />

<footer>
  <p>
    <img class="tmdb-logo" alt="TheMobieDatabase logo" src={tmdbLogo} />
    matrix-media-logging-widget uses the TMDB API but is not endorsed or certified by TMDB.
  </p>
</footer>

<style>
  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  footer p {
    line-height: 2;
  }

  .tmdb-logo {
    display: inline-block;
    width: 80px;
  }

  @media (min-width: 480px) {
    footer {
      padding: 20px 0;
    }
  }
</style>
