<script>
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import Equal from "$lib/components/Equal.svelte";
  import IconButton from "$lib/components/IconButton.svelte";
  import Tabs from "./Tabs.svelte";
  import Title from "$lib/components/Title.svelte";
  import { page } from "$app/stores";

  const crumbs = [
    { name: 'Settings', href: '/settings' },
    { name: 'Categories', href: '/settings/categories' },
  ]
</script>

<Breadcrumbs {crumbs} icon="ri:settings-4-line" />

<Equal --mb="25px">
  <Title title="Categories" back href="/settings" --mb="0" />
  <IconButton icon="ri:add-line" href="{$page.url.pathname}/add-category" />
</Equal>

<Tabs />

<slot></slot>