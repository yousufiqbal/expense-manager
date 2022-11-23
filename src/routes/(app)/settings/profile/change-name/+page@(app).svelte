<script>
  import { page } from "$app/stores";
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import Title from "$lib/components/Title.svelte";

  const crumbs = [
    { name: 'Settings', href: '/settings' },
    { name: 'Profile', href: '/settings/profile' },
    { name: 'Change Name', href: $page.url.pathname },
  ]
</script>

<Breadcrumbs {crumbs} icon="ri:settings-4-line" />

<Title back href="/settings/profile" title="Change Name" />

<Form --gap="30px">
  <Field label="Name" --cols={2} />
</Form>

<Buttons --gap="25px">
  <Button name="Save" icon="ri:save-line" />
  <Button name="Discard" type="secondary" on:click={()=>history.back()} icon="ri:close-line" />
</Buttons>