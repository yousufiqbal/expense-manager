<script>
  import Categories from "../Categories.svelte";

  /** @type {import('./\types').PageServerData} */
  export let data
</script>

<Categories {data} />