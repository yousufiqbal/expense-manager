<script>
  import Checkboxes from "$lib/components/Checkboxes.svelte";
  import DateNavigator from "$lib/components/DateNavigator.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import { title } from "$lib/others/stores";
  import PieChart from "./PieChart.svelte";
  import Categories from "./Categories.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { setQuery } from "$lib/others/utils";

  /** @type {import('./$types').PageServerData} */
  export let data

  let choosenAccounts = [+$page.url.searchParams.get('account-id') || '']

  const fire = () => {
    setTimeout(() => {
      goto(setQuery({ accounts: choosenAccounts.join('-')}, $page))
    }, 0);
  }

  $title = 'Stats'
</script>

<!-- <Title title="Stats" icon="ri:line-chart-line" /> -->
<DateNavigator type="secondary" />
<Tabs transfer={false} />
<!-- <Subtitle subtitle="Accounts" icon="ri:folders-line" /> -->
<Checkboxes on:change={fire} items={data.accounts} n="name" v="accountId" bind:result={choosenAccounts}  />
<PieChart />
<Categories {data} />