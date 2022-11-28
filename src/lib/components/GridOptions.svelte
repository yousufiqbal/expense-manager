<script>
  import { createEventDispatcher } from "svelte";

  export let n, v

  const dispatch = createEventDispatcher()

  /**
   * 
   * @param {MouseEvent} e
   */
  const dispatchSelect = e => {
    dispatch('select', { result: e.target.dataset.result })
  }

  export let options = []
</script>

{#if options.length != 0}
<div class="grid-options">
  
  {#each options as option}
  <button data-result="{option[v]}" on:click={dispatchSelect} class="option">
    {option[n]}
  </button>
  {/each}
  
</div>
{/if}

<style>
  .grid-options {
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    /* border: 1px dashed red; */
  }
  .option {
    border-radius: var(--radius);
    padding: 10px;
    text-align: center;
    border: 1px solid var(--secondary);
    /* box-shadow: var(--shadow); */
  }
</style>