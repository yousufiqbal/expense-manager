<script>
  import DateNavigator from "$lib/components/DateNavigator.svelte";
  import Plus from "$lib/components/Plus.svelte";
  import TransactionGroups from "$lib/components/TransactionGroups.svelte";
  import { title } from "$lib/others/stores";
  import Summary from "$lib/components/Summary.svelte";

  $title = 'Home'

  /** @type {import('./$types').PageServerData} */
  export let data

  $: summary = [
    { title: 'Income', amount: totalIncome, color: 'red' },
    { title: 'Expense', amount: totalExpense, color: 'blue' },
    { title: 'Total', amount: totalIncome - totalExpense, color: 'black' },
  ]

  $: totalIncome = data.transactionGroups.map(t => t.totalIncome).reduce((a, b) => a + b, 0)
  $: totalExpense = data.transactionGroups.map(t => t.totalExpense).reduce((a, b) => a + b, 0)
</script>

<DateNavigator />

<Summary {summary} />

<TransactionGroups {data} />

<Plus href="/add-transaction?tab=expense" />