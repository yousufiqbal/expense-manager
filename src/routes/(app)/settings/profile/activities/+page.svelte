<script>
    import DateNavigator from "$lib/components/DateNavigator.svelte";
  import Activities from "./Activities.svelte";

  /** @type {import('./\$types').PageServerData} */
  export let data
</script>

<DateNavigator />

<Activities {data} />