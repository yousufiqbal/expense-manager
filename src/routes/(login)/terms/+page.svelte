<script>
  import Content from "$lib/components/Content.svelte";
  import Title from "$lib/components/Title.svelte";
  import { title } from "$lib/others/stores";

  $title = 'Terms'
</script>

<Title title="Terms & Conditions" back href="/login/register" />

<Content>
  <p>All your activity relating to three actions: CREATE, UPDATE & DELETE are recorded.</p>
  <p>Other acitivites are also recorded including but not limited to: login, registratio, logout, name change, password change, etc.</p>
  <p>All of the activites are only visible to you. They are not removable at all</p>
  <p>By registering, you agree to all policies. Policies are subject to change</p>
</Content>