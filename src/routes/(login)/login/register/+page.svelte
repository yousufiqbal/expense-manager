<script>
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import { title } from "$lib/others/stores";

  $title = 'Register'
</script>

<Form --gap="30px">
  <Field label="Name" --cols={2} />
  <Field label="Email" --cols={2} type="email" />
  <Field label="Password" --cols={2} type="password" />
</Form>

<Buttons --gap="25px">
  <Button name="Register" icon="ri:login-box-line" type="secondary" />
  <Button name="Already a user?" type="ghost" href="/login" />
</Buttons>