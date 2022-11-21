<script>
  import Icon from '@iconify/svelte'

  let items = [
    { name: 'Categories', href: '/settings/profile', icon: 'bx:category' },
    { name: 'Account Groups', href: '/settings/profile', icon: 'clarity:blocks-group-line' },
    { name: 'Backups', href: '/settings/profile', icon: 'ri:database-2-line' },
    { name: 'Currency', href: '/settings/profile', icon: 'ri:currency-line' },
    { name: 'Profile', href: '/settings/profile', icon: 'ri:profile-line' },
    { name: 'Theme', href: '/settings/profile', icon: 'ri:sun-foggy-line' },
    { name: 'About', href: '/settings/profile', icon: 'ri:information-line' }
  ]
</script>

<div class="menu">

  {#each items as item}
  <a href="/">
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