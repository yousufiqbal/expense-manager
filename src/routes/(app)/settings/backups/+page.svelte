<script>
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import Title from "$lib/components/Title.svelte";

  const crumbs = [
    { name: 'Settings', href: '/settings' },
    { name: 'Backups', href: '/settings/backups' },
  ]
</script>

<Breadcrumbs {crumbs} icon="ri:settings-4-line" />

<Title title="Backups" back href="/settings" />