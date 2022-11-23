<script>
  import { page } from "$app/stores";
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import Title from "$lib/components/Title.svelte";

  const crumbs = [
    { name: 'Forgot Password', href: '/forgot-password' },
    { name: 'Reset Password', href: $page.url.pathname },
  ]
</script>

<Breadcrumbs {crumbs} icon="ri:settings-4-line" />

<Title back href="/forgot-password" title="Reset Password" />

<Form --gap="30px">
  <Field label="Email" readonly --cols={2} type="email" value="yousufiqbal@gmail.com" />
  <Field label="Enter 4 Digit OTP" --cols={2} type="numeric" />
  <Field label="New Password" --cols={2} />
</Form>


<Buttons --gap="25px">
  <Button name="Reset Password" icon="ri:save-line" href="/forgot-password/reset-password" />
  <!-- <Button name="Forgot Password?" type="ghost" href="/forgot-password" /> -->
</Buttons>