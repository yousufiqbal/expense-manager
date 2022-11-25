<script>
  import Equal from "$lib/components/Equal.svelte";
  import IconButton from "$lib/components/IconButton.svelte";
  import Summary from "$lib/components/Summary.svelte";
  import Title from "$lib/components/Title.svelte";
  import Accounts from "./Accounts.svelte";

  /** @type {import('./$types').PageServerData} */
  export let data

  $: summary = [
    { title: 'Assets', amount: 0, color: 'red' },
    { title: 'Liabilities', amount: 0, color: 'blue' },
    { title: 'Total', amount: 0, color: 'black' },
  ]
</script>

<Equal>
  <Title title="Accounts" icon="ri:folders-line" --mb="0" />
  <IconButton icon="ri:add-line" href="/accounts/add-account" />
</Equal>

<Summary {summary} />

<Accounts {data} />
