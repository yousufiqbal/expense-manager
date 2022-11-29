<script>
  import { page } from "$app/stores";
  import Menu from "$lib/components/Menu.svelte";
  import Title from "$lib/components/Title.svelte";

  $: items = [
    { name: 'Activities', href: '/settings/activities', icon: 'ri:fingerprint-line' },
    { name: 'Categories', href: '/settings/categories/expense', icon: 'bx:category' },
    { name: `Currency (${$page.data.locals.currency})`, href: '/settings/currency', icon: 'ri:currency-line' },
    { name: 'Profile', href: '/settings/profile', icon: 'ri:profile-line' },
    { name: 'About', href: '/settings/about', icon: 'ri:information-line' }
  ]
</script>

<Title title="Settings" icon="ri:settings-4-line" />

<Menu {items} />