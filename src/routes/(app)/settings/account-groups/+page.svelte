<script>
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import Title from "$lib/components/Title.svelte";

  const crumbs = [
    { name: 'Settings', href: '/settings' },
    { name: 'Account Groups', href: '/settings/account-groups' },
  ]
</script>

<Breadcrumbs {crumbs} icon="ri:settings-4-line" />

<Title title="Account Groups" back href="/settings" />