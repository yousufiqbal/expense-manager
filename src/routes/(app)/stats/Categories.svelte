<script>
  import { page } from "$app/stores";
    import Nothing from "$lib/components/Nothing.svelte";

  /** @type {import('./$types').PageServerData} */
  export let data

  $: current = $page.url.searchParams.get('tab')
</script>

{#if data?.stats?.length != 0}
<div class="stats">
  
  {#each data?.stats as category}
  <div class="category">
    <div class="{current} percentage">{category.percentage}%</div>
    <div class="name">{category.name}</div>
    <div class="amount">{$page.data.locals.currency} {category.total}</div>
  </div>
  {/each}
  
</div>
{:else}

<Nothing>
  No stats
</Nothing>
{/if}

<style>
  .stats {
    display: grid;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    margin-bottom: var(--mb, 30px);
  }
  .category {
    display: flex;
    gap: 15px;
    padding: 15px;
    border-bottom: 1px solid var(--border);
    align-items: center;
  }
  .percentage {
    text-align: center;
    width: 40px;
    padding: 4px 0;
    font-size: 12px;
    border-radius: var(--radius);
    color: white;
  }
  .expense {
    background-color: var(--red);
  }
  .income {
    background-color: var(--primary);
  }
  .category:last-child {
    border-bottom: none;
  }
  .name {
    flex: 1;
  }
</style>