<script>
  import DateNavigator from "$lib/components/DateNavigator.svelte";
  import Plus from "$lib/components/Plus.svelte";
  import TransactionGroups from "$lib/components/TransactionGroups.svelte";
  import { title } from "$lib/others/stores";
  import Summary from "$lib/components/Summary.svelte";

  $title = 'Home'
</script>

<DateNavigator />

<Summary />

<TransactionGroups />

<Plus href="/add-transaction?tab=expense" />