<script>
  import Search from "$lib/components/Search.svelte";
  import Title from "$lib/components/Title.svelte";
    import { title } from "$lib/others/stores";

  $title = 'Search'
</script>

<!-- <Title title="Search" icon="ri:search-line" /> -->

<Search />