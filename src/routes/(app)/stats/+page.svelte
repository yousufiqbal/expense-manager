<script>
  import Checkboxes from "$lib/components/Checkboxes.svelte";
import DateNavigator from "$lib/components/DateNavigator.svelte";
  import Subtitle from "$lib/components/Subtitle.svelte";
  import Title from "$lib/components/Title.svelte";
    import Tabs from "$lib/components/Tabs.svelte";

  let accounts = [
    { name: 'Papa', urlName: 'papa' },
    { name: 'Yousuf', urlName: 'yousuf' },
    { name: 'Office', urlName: 'office' },
  ]
</script>

<Title title="Stats" icon="ri:line-chart-line" />
<DateNavigator />
<Subtitle subtitle="Accounts" icon="ri:folders-line" />
<Checkboxes items={accounts}  />
<Tabs transfer={false} />