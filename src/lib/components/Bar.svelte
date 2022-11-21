<script>
    import { page } from '$app/stores';
  import Icon from '@iconify/svelte'
</script>

<div class="bar">
  <a class:active={$page.url.pathname == '/'} href="/">
    <i><Icon icon="ri:home-3-line" /></i>
    <span>Home</span>
  </a>
  <a class:active={$page.url.pathname == '/stats'} href="/stats">
    <i><Icon icon="ri:line-chart-line" /></i>
    <span>Stats</span>
  </a>
  <a class:active={$page.url.pathname == '/search'} href="/search">
    <i><Icon icon="ri:search-line" /></i>
    <span>Search</span>
  </a>
  <a class:active={$page.url.pathname == '/accounts'} href="/accounts">
    <i><Icon icon="ri:folders-line" /></i>
    <span>Accounts</span>
  </a>
  <a class:active={$page.url.pathname == '/settings'} href="/settings">
    <i><Icon icon="ri:settings-4-line" /></i>
    <span>Settings</span>
  </a>
</div>

<style>
  .bar {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    display: flex;
    border-top: 1px solid var(--border);
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