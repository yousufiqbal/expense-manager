<script>
  import Icon from '@iconify/svelte'

  export let items = []
</script>

{#if items.length != 0}
<div class="menu">
  
  {#each items as item}
  <a href={item.href}>
    <i class="first">
      <Icon icon={item.icon} />
    </i>
    <span>{item.name}</span>
    <i class="last">
      <Icon icon="ri:arrow-right-s-line" />
    </i>
  </a>
  {/each}
  
</div>
{/if}

<style>
  .menu {
    display: grid;
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }
  a {
    display: flex;
    align-items: center;
    /* gap: 10px; */
    border-bottom: 1px solid var(--border);
  }
  a:last-child {
    border-bottom: none;
  }
  span {
    padding: 15px 10px;
    flex: 1;
  }
  i {
    font-size: 20px;
    padding: 15px;
  }
  .first {
    color: var(--primary);
  }
</style>