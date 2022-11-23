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
    { name: 'Change Password', href: $page.url.pathname },
  ]
</script>

<Breadcrumbs {crumbs} icon="ri:settings-4-line" />

<Title back href="/settings/profile" title="Change Password" />

<Form --gap="30px">
  <Field label="Current Password" --cols={2} />
  <Field label="New Password" --cols={2} />
</Form>

<Buttons --gap="25px">
  <Button name="Change" icon="ri:edit-line" />
  <Button name="Discard" type="secondary" on:click={()=>history.back()} icon="ri:close-line" />
</Buttons>