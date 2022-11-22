<script>
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import Title from "$lib/components/Title.svelte";

  const crumbs = [
    { name: 'Settings', href: '/settings' },
    { name: 'Theme', href: '/settings/theme' },
  ]
</script>

<Breadcrumbs {crumbs} icon="ri:settings-4-line" />

<Title title="Theme" back href="/settings" />