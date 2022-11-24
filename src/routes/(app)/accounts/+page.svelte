<script>
    import { page } from "$app/stores";
  import Equal from "$lib/components/Equal.svelte";
  import IconButton from "$lib/components/IconButton.svelte";
  import Summary from "$lib/components/Summary.svelte";
  import Title from "$lib/components/Title.svelte";
  import Accounts from "./Accounts.svelte";

  /** @type {import('./$types').PageServerData} */
  export let data
</script>

<Equal>
  <Title title="Accounts" icon="ri:folders-line" --mb="0" />
  <IconButton icon="ri:add-line" href="/accounts/add-account" />
</Equal>

<Summary />

<Accounts {data} />
