<script>
  import Checkboxes from "$lib/components/Checkboxes.svelte";
  import DateNavigator from "$lib/components/DateNavigator.svelte";
  import Subtitle from "$lib/components/Subtitle.svelte";
  import Title from "$lib/components/Title.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
    import { title } from "$lib/others/stores";

  let accounts = [
    { name: 'All', urlName: 'all' },
    { name: 'Papa', urlName: 'papa' },
    { name: 'Yousuf', urlName: 'yousuf' },
    { name: 'Office', urlName: 'office' },
  ]

  $title = 'Stats'
</script>

<!-- <Title title="Stats" icon="ri:line-chart-line" /> -->
<DateNavigator />
<Tabs transfer={false} />
<Subtitle subtitle="Accounts" icon="ri:folders-line" />
<Checkboxes items={accounts}  />