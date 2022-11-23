<script>
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import { title } from "$lib/others/stores";

  $title = 'Login'
</script>

<Form --gap="30px">
  <Field label="Email" --cols={2} type="email" />
  <Field label="Password" --cols={2} type="password" />
</Form>

<Buttons --gap="25px">
  <Button name="Login" icon="ri:login-box-line" type="secondary" href="/" />
  <Button name="Forgot Password?" type="ghost" href="/forgot-password" />
</Buttons>