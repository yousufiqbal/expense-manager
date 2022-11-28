<script>
  import Equal from "$lib/components/Equal.svelte";
  import IconButton from "$lib/components/IconButton.svelte";
  import Summary from "$lib/components/Summary.svelte";
  import Title from "$lib/components/Title.svelte";
  import Accounts from "./Accounts.svelte";

  /** @type {import('./$types').PageServerData} */
  export let data

  $: summary = [
    { title: 'Assets', amount: assets, color: 'red' },
    { title: 'Liabilities', amount: liabilities, color: 'blue' },
    { title: 'Total', amount: total, color: 'black' },
  ]

  $: assets = data.accounts.filter(a => a.balance > 0).map(a => a.balance).reduce((a, b) => +a + +b, 0)
  $: liabilities = data.accounts.filter(a => a.balance < 0).map(a => a.balance).reduce((a, b) => +a + +b, 0)
  $: total = assets - liabilities
</script>

<Equal>
  <Title title="Accounts" icon="ri:folders-line" --mb="0" />
  <IconButton icon="ri:add-line" href="/accounts/add-account" />
</Equal>

<Summary {summary} />

<Accounts {data} />
