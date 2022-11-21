<script>
  import Menu from "$lib/components/Menu.svelte";
    import Title from "$lib/components/Title.svelte";

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

<Title title="Settings" icon="ri:settings-4-line" />

<Menu {items} />