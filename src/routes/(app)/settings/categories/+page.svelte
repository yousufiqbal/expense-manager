<script>
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import Title from "$lib/components/Title.svelte";

  const crumbs = [
    { name: 'Settings', href: '/settings' },
    { name: 'Categories', href: '/settings/categories' },
  ]
</script>

<Breadcrumbs {crumbs} icon="ri:settings-4-line" />

<Title title="Categories" back href="/settings" />