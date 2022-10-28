<script lang="ts">
  import '../app.css';
</script>

<main>
  <slot />
</main>

<!-- Hide footer in auth/load screen -->
<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0.25rem;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  @media (min-width: 480px) {
    main {
      padding-top: 1rem;
    }
  }
</style>
