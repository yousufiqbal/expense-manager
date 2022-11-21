<script>
  import { page } from "$app/stores";
  import Icon from "@iconify/svelte";

  export let crumbs = []
  export let icon
</script>

{#if crumbs.length != 0}
<div class="breadcrumbs">

  <i>
    <Icon {icon} width="18" />
  </i>
  
  <div class="crumbs">

  {#each crumbs as crumb, index}
  <div class="crumb">

    <!-- Right Arrow -->
    {#if index != 0}
    <i>
      <Icon icon="ri:arrow-right-s-line" />
    </i>
    {/if}

    {#if $page.url.pathname != crumb.href}
    <a href={crumb.href}>{crumb.name}</a>
    {:else}
    <div>{crumb.name}</div>
    {/if}
    
    
  </div>
  {/each}
  </div>

</div>
{/if}

<style>
  a {
    color: var(--primary);
  }
  a:hover {
    text-decoration: underline;
  }
  .crumbs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .crumb {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .breadcrumbs {
    display: flex;
    /* border: 1px dashed red; */
    font-size: 14px;
    gap: 10px;
    margin-bottom: var(--mb, 20px);
  }
  i {
    /* border: 1px dashed blue; */
    font-size: 18px;
  }
</style>