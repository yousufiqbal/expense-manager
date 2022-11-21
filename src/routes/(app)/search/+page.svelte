<script>
  import Button from "$lib/components/Button.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import Search from "$lib/components/Search.svelte";
  import Title from "$lib/components/Title.svelte";
  import { title } from "$lib/others/stores";
  import Icon from "@iconify/svelte";

  $title = 'Search'
  let filters = false
</script>

<Title title="Search" icon="ri:search-line" />

<Search />

{#if filters}
<Form>
  <Field label="Account" />
  <Field label="Category" />
  <Field label="Amount Min" />
  <Field label="Amount Max" />
</Form>
{/if}

<button on:click={()=>filters=!filters}>
  <span>
    {filters ? 'Hide' : 'Show'} Filters
  </span>
  <i><Icon icon="{filters ? 'ri:arrow-up-s-line' : 'ri:arrow-down-s-line'}" /></i>
</button>

<style>
  button {
    display: flex;
    gap: 10px;
    align-items: center;
    color: var(--primary);
    margin-bottom: 20px;
  }
  i {
    font-size: 20px;
  }
</style>