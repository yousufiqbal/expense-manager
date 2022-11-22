<script>
  import Equal from "$lib/components/Equal.svelte";
  import Option from "$lib/components/Option.svelte";
  import Options from "$lib/components/Options.svelte";
  import Summary from "$lib/components/Summary.svelte";
  import Title from "$lib/components/Title.svelte";
  import Accounts from "./Accounts.svelte";
</script>

<Equal>
  <Title title="Accounts" icon="ri:folders-line" --mb="0" />
  <Options>
    <Option icon="ri:add-line" name="Add Account" />
  </Options>
</Equal>

<Summary />

<Accounts />
