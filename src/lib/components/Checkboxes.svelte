<script>

  export let title = null
  
  export let items = []
  export let result = []

  export let n, v
</script>

{#if items.length != 0}
<div class="checkboxes">
  
  {#if title}
  <div class="title">{title}</div>
  {/if}

  {#each items as item}
  <div class="checkbox">
    <input on:change type="checkbox" bind:group={result} id="{item[v]}" name="{item[v]}" value={item[v]}>
    <label for="{item[v]}">{item[n]}</label>
  </div>
  {/each}

</div>
{/if}

<style>
  .checkboxes {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    grid-column: span 4;
    /* border: 1px dashed blue; */
    margin-bottom: var(--mb, 30px);
  }
  .title {
    /* border: 1px dashed green; */
    font-weight: bold;
  }
  .checkbox {
    /* border: 1px dashed orange; */
    display: flex;
    gap: 10px;
    align-items: center;
  }
  label:hover {
    cursor: pointer;
  }
</style>