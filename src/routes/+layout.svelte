<script lang="ts">
  import '../app.css';
</script>

<main class="bg-base-300">
  <slot />
</main>

<!-- Hide footer in auth/load screen -->
<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.25rem;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
