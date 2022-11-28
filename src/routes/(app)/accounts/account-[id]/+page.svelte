<script>
  import { page } from "$app/stores";
  import DateNavigator from "$lib/components/DateNavigator.svelte";
  import Equal from "$lib/components/Equal.svelte";
  import IconButton from "$lib/components/IconButton.svelte";
  import Plus from "$lib/components/Plus.svelte";
  import Summary from "$lib/components/Summary.svelte";
  import Title from "$lib/components/Title.svelte";
  import TransactionGroups from "$lib/components/TransactionGroups.svelte";

  /** @type {import('./$types').PageServerData} */
  export let data

  $: summary = [
    { title: 'Income', amount: totalIncome, color: 'red' },
    { title: 'Expense', amount: totalExpense, color: 'blue' },
    { title: 'Total', amount: totalIncome - totalExpense, color: 'black' },
    { title: 'Balance', amount: '?', color: 'black' },
  ]

  $: totalIncome = data.transactionGroups.map(t => t.totalIncome).reduce((a, b) => a + b, 0)
  $: totalExpense = data.transactionGroups.map(t => t.totalExpense).reduce((a, b) => a + b, 0)
</script>

<Equal>
  <Title title="{data.account.name}" back --mb="0" />
  <IconButton icon="ri:edit-line" href="/accounts/edit-account?account-id={$page.params.id}" />
</Equal>

<DateNavigator />
<Summary {summary} />
<TransactionGroups {data} />
<Plus href="/add-transaction?tab=expense&account-id={$page.params.id}" />