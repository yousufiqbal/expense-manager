<script>
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte'

  const items = [
    { name: 'Home', href: '/', icon: 'ri:home-3-line', filledIcon: 'ri:home-3-fill' },
    { name: 'Stats', href: '/stats', icon: 'ri:line-chart-line', filledIcon: 'ri:line-chart-fill' },
    { name: 'Search', href: '/search', icon: 'ri:search-2-line', filledIcon: 'ri:search-2-fill' },
    { name: 'Accounts', href: '/accounts', icon: 'ri:folders-line', filledIcon: 'ri:folders-fill' },
    { name: 'Settings', href: '/settings', icon: 'ri:settings-4-line', filledIcon: 'ri:settings-4-fill' },
  ]
</script>

<div class="bar">
  {#each items as item}
  <a class:active={$page.url.pathname == item.href} href="{item.href}">
    <i><Icon icon={($page.url.pathname != item.href) ? item.icon : item.filledIcon} /></i>
    <span>{item.name}</span>
  </a>
  {/each}
</div>

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
    padding: 10px 0;
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
  
</style>