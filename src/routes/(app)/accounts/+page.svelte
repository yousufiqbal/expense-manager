<script>
  import Equal from "$lib/components/Equal.svelte";
  import IconButton from "$lib/components/IconButton.svelte";
  import Summary from "$lib/components/Summary.svelte";
  import Title from "$lib/components/Title.svelte";
  import Accounts from "./Accounts.svelte";
</script>

<Equal>
  <Title title="Accounts" icon="ri:folders-line" --mb="0" />
  <IconButton icon="ri:add-line" />
</Equal>

<Summary />

<Accounts />
