<script>
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import Title from "$lib/components/Title.svelte";
    import Tabs from "./Tabs.svelte";

  const crumbs = [
    { name: 'Settings', href: '/settings' },
    { name: 'Profile', href: '/settings/profile' },
  ]
</script>

<Breadcrumbs {crumbs} icon="ri:settings-4-line" />

<Title title="Profile" back href="/settings" />

<Tabs />