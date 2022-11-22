<script>
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import Search from "$lib/components/Search.svelte";
  import Summary from "$lib/components/Summary.svelte";
  import { title } from "$lib/others/stores";
  import FiltersToggle from "./FiltersToggle.svelte";
    import Results from "./Results.svelte";

  $title = 'Search'
  let filters = true
</script>

<Search />

{#if filters}
<Form --mb="30px">
  <Field label="Account" />
  <Field label="Category" />
  <Field label="Amount Min" />
  <Field label="Amount Max" />
</Form>
{/if}

<FiltersToggle bind:filters />

<Summary />

<Results />