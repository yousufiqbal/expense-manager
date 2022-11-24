<script>
  import { page } from "$app/stores";
  import DateNavigator from "$lib/components/DateNavigator.svelte";
  import Equal from "$lib/components/Equal.svelte";
  import IconButton from "$lib/components/IconButton.svelte";
  import Plus from "$lib/components/Plus.svelte";
  import Summary from "$lib/components/Summary.svelte";
  import Title from "$lib/components/Title.svelte";
  import TransactionGroups from "$lib/components/TransactionGroups.svelte";

  /** @type {import('./\types').PageServerData} */
  export let data
</script>

<Equal>
  <Title title="{data.account.name}" back --mb="0" />
  <IconButton icon="ri:edit-line" href="/accounts/edit-account?account-id={$page.params.id}" />
</Equal>

<DateNavigator />
<Summary />
<TransactionGroups />
<Plus href="/add-transaction?tab=expense" />