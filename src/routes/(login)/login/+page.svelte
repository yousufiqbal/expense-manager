<script>
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import { extractYupErrors, loginSchema } from "$lib/others/schema";
  import { title } from "$lib/others/stores";
    import { addToast } from "$lib/others/toasts";
    import { isEmpty } from "$lib/others/utils";

  $title = 'Login'

  let data = {
    email: '', password: ''
  }

  let touched = false, errors = {}

  const validate = async () => {
    try {
      await loginSchema.validate(data, { abortEarly: false })
      errors = {}
    } catch (error) {
      errors = extractYupErrors(error)
    }
  }

  const login = async () => {
    addToast({ message: 'Everything is valid', type: 'success' })
  }

  const submit = async () => {
    if (isEmpty(errors)) {
      await login()
    } else {
      touched = true
    }
  }

  $: data && validate()
</script>

<Form --gap="30px">
  <Field error={errors.email} {touched} label="Email" --cols={2} type="email" bind:value={data.email} />
  <Field error={errors.password} {touched} label="Password" --cols={2} type="password" bind:value={data.password} />
</Form>

<Buttons --gap="25px">
  <Button name="Login" icon="ri:login-box-line" type="secondary" on:click={submit} />
  <Button name="Forgot Password?" type="ghost" href="/forgot-password" />
</Buttons>