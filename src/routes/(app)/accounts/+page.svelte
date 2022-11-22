<script>
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Summary from "$lib/components/Summary.svelte";
  import Title from "$lib/components/Title.svelte";
    import AccountGroups from "./AccountGroups.svelte";
    import Accounts from "./Accounts.svelte";
</script>

<Title title="Accounts" icon="ri:folders-line" />

<Buttons>
  <Button name="New Account" href="/accounts/add-account" icon="ri:add-line" />
</Buttons>

<Summary />

<Accounts />