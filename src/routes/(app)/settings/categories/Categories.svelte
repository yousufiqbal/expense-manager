<script>
    import { page } from "$app/stores";
  import Icon from "@iconify/svelte";

  /** @type {(import('./$types').PageServerData} */
  export let data
</script>

{#if data.categories?.length != 0}
<div class="categories">
  
  {#each data.categories as category}
  <div class="category">

    <div class="name">{category.name}</div>
    <a href="{$page.url.pathname}/edit-category?id={category.expenseCategoryId || category.incomeCategoryId}" class="edit">
      <Icon icon="ri:edit-line" />
    </a>

  </div>
  {/each}
  
</div>
{/if}

<style>
  .categories {
    display: grid;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }
  .category {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px 0 15px;
    border-bottom: 1px solid var(--border);
  }
  .name {
    padding: 12px 0;
  }
  .category:last-child {
    border-bottom: none;
  }
  a {
    color: var(--primary);
    font-size: 20px;
    padding: 12px;
    display: flex;
    /* border: 1px dashed red; */
  }
</style>