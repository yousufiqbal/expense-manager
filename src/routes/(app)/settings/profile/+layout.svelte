<script>
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import Equal from "$lib/components/Equal.svelte";
  import IconButton from "$lib/components/IconButton.svelte";
  import Title from "$lib/components/Title.svelte";
  import Tabs from "./Tabs.svelte";

  const crumbs = [
    { name: 'Settings', href: '/settings' },
    { name: 'Profile', href: '/settings/profile' },
  ]
</script>

<Breadcrumbs {crumbs} icon="ri:settings-4-line" />

<Equal>
  <Title title="Profile" back href="/settings" --mb="0" />
  <IconButton icon="ri:edit-line" href="/settings/profile/change-name" />
</Equal>

<Tabs />

<slot></slot>