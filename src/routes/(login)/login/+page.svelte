<script>
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import ServerError from "$lib/components/ServerError.svelte";
  import { extractYupErrors, loginSchema } from "$lib/others/schema";
  import { title } from "$lib/others/stores";
  import { addToast } from "$lib/others/toasts";
  import { isEmpty, post } from "$lib/others/utils";

  $title = 'Login'

  let credentials = {
    email: '', password: ''
  }

  let touched = false, errors = {}

  const validate = async () => {
    try {
      await loginSchema.validate(credentials, { abortEarly: false })
      errors = {}
    } catch (error) {
      errors = extractYupErrors(error)
    }
  }

  const login = async () => {
    const response = await post('/login', credentials)
    const body = await response.json()
    if (response.ok) {
      addToast({ message: body.message })
      goto('/')
    }
    if (response.status == 400) {
      errors.server = body.message
    }
  }

  const submit = async () => {
    if (isEmpty(errors)) {
      await login()
    } else {
      touched = true
    }
  }

  $: credentials && validate()
</script>

<Form --gap="30px">
  <Field error={errors.email} {touched} label="Email" --cols={2} type="email" bind:value={credentials.email} />
  <Field error={errors.password} {touched} label="Password" --cols={2} type="password" bind:value={credentials.password} />
</Form>

<ServerError {errors} />

<Buttons --gap="25px">
  <Button name="Login" icon="ri:login-box-line" type="secondary" on:click={submit} />
  <Button name="Forgot Password?" type="ghost" href="/forgot-password" />
</Buttons>