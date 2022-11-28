<script>
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte'

  const items = [
    { name: 'Home', href: '/', icon: 'ri:wallet-3-line' },
    { name: 'Stats', href: '/stats?tab=expense', icon: 'ri:line-chart-line' },
    { name: 'Search', href: '/search', icon: 'ri:search-2-line' },
    { name: 'Accounts', href: '/accounts', icon: 'ri:folders-line'},
    { name: 'Settings', href: '/settings', icon: 'ri:settings-4-line' },
  ]
</script>

{#if items.length != 0}
<div class="bar">
  {#each items as item}
  <a class:active={$page.url.pathname == item.href} href="{item.href}">
    <i><Icon icon={item.icon} /></i>
    <span>{item.name}</span>
  </a>
  {/each}
</div>
{/if}

<style>
  .bar {
    background-color: #fff;
    position: fixed;
    bottom: 0; left: 0; right: 0;
    display: flex;
    border-top: 1px solid var(--border);
    box-shadow: var(--shadow);
  }
  a {
    display: grid;
    justify-items: center;
    gap: 5px;
    flex: 1;
    padding: 12px 0;
    /* border: 1px dashed blue; */
  }
  span {
    font-size: 14px;
  }
  i {
    font-size: 20px;
    /* border: 1px dashed green; */
  }
  .active {
    color: var(--primary);
  }
  @media (max-height: 600px) {
    .bar {
      display: none;
    }
  }
</style>