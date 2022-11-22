<script>
    import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher()

  const dispatchSelect = () => {

  }

  export let options = []
</script>

<div class="grid-options">
  {#each options as option}
  <button on:click={dispatchSelect} class="option">
    {option}
  </button>
  {/each}
</div>

<style>
  .grid-options {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    /* border: 1px dashed red; */
  }
  .option {
    border-radius: var(--radius);
    padding: 10px;
    text-align: center;
    border: 1px solid var(--border);
  }
</style>