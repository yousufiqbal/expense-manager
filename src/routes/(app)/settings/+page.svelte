<script>
  import Menu from "$lib/components/Menu.svelte";
    import Title from "$lib/components/Title.svelte";

  let items = [
    { name: 'Categories', href: '/settings/categories?tab=expense', icon: 'bx:category' },
    // { name: 'Account Groups', href: '/settings/account-groups', icon: 'clarity:blocks-group-line' },
    // { name: 'Backups', href: '/settings/backups', icon: 'ri:database-2-line' },
    { name: 'Currency', href: '/settings/currency', icon: 'ri:currency-line' },
    { name: 'Profile', href: '/settings/profile', icon: 'ri:profile-line' },
    { name: 'Theme', href: '/settings/theme', icon: 'ri:sun-foggy-line' },
    { name: 'About', href: '/settings/about', icon: 'ri:information-line' }
  ]
</script>

<Title title="Settings" icon="ri:settings-4-line" />

<Menu {items} />