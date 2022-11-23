<script>
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import Equal from "$lib/components/Equal.svelte";
  import IconButton from "$lib/components/IconButton.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import Title from "$lib/components/Title.svelte";
  import Categories from "./Categories.svelte";

  const crumbs = [
    { name: 'Settings', href: '/settings' },
    { name: 'Categories', href: '/settings/categories' },
  ]

  /** @type {import('./$types').PageServerData} */
  export let data
</script>

<Breadcrumbs {crumbs} icon="ri:settings-4-line" />

<Equal>
  <Title title="Categories" back href="/settings" --mb="0" />
  <IconButton icon="ri:add-line" href="/settings/categories/add-category" />
</Equal>

<Tabs transfer={false} />

<Categories {data} />