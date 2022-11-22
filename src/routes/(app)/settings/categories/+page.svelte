<script>
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
    import Equal from "$lib/components/Equal.svelte";
    import IconButton from "$lib/components/IconButton.svelte";
    import Option from "$lib/components/Option.svelte";
    import Options from "$lib/components/Options.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import Title from "$lib/components/Title.svelte";
    import Categories from "./Categories.svelte";

  const crumbs = [
    { name: 'Settings', href: '/settings' },
    { name: 'Categories', href: '/settings/categories' },
  ]
</script>

<Breadcrumbs {crumbs} icon="ri:settings-4-line" />

<Equal>
  <Title title="Categories" back href="/settings" --mb="0" />
  <IconButton icon="ri:add-line" />
  <!-- <Options>
    <Option icon="ri:add-line" name="Add Category" href="/settings/categories/add-category" />
  </Options> -->
</Equal>

<Tabs transfer={false} />

<Categories />