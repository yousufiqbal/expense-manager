<script>
  import DateNavigator from "$lib/components/DateNavigator.svelte";
  import Title from "$lib/components/Title.svelte";
  import Activities from "./Activities.svelte";

  /** @type {import('./\$types').PageServerData} */
  export let data
</script>


<Title back href="/settings" title="Activities" />

<DateNavigator />

<Activities {data} />