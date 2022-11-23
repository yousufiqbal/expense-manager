<script>
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Profile from "./Profile.svelte";
</script>

<Profile />

<Buttons>
  <Button name="Logout" icon="ri:logout-box-line" type="secondary" href="/login" />
</Buttons>