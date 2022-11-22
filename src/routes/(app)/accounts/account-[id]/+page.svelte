<script>
  import DateNavigator from "$lib/components/DateNavigator.svelte";
  import Equal from "$lib/components/Equal.svelte";
  import Option from "$lib/components/Option.svelte";
  import Options from "$lib/components/Options.svelte";
  import Plus from "$lib/components/Plus.svelte";
  import Summary from "$lib/components/Summary.svelte";
  import Title from "$lib/components/Title.svelte";
  import TransactionGroups from "$lib/components/TransactionGroups.svelte";
</script>

<Equal>
  <Title title="Papa Account" back --mb="0" />
  <Options>
    <Option icon="ri:edit-line" name="Edit Account" />
    <Option icon="ri:line-chart-line" name="Show Stats" />
  </Options>
</Equal>

<DateNavigator />
<Summary />
<TransactionGroups />
<Plus href="/add-transaction?tab=expense" />